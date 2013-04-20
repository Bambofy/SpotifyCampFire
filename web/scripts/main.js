// CHANGE THIS TO YOUR FIREBASE REFERENCE URL eg. https://mycampfire.firebaseio.com
firebaseRef = "https://spotifycampfire.firebaseio.com";




// when song is parsed on C#, make it message back the name. When the message is recieved on this page we can just print the name out as usual.
currentName = window.localStorage.getItem("username");
currentSongUri = "";   // used to make sure we don't play the same song twice.
messageCount = 0;

var wsImpl = window.WebSocket || window.MozWebSocket;

window.ws = new wsImpl("ws://localhost:8181/CampFire", "CampFireProto");

ws.onopen = function () {
    CAlert("Connection to SpotifyServer application opened.", "green");
}

ws.onclose = function () {
    CAlert("Cannot connect to SpotifyServer application.", "red");
}

ws.onmessage = function(evt) {
    // the only thing sent to here will be the song name
    var msg = evt.data;
    messageCount = messageCount + 1;

    $('#messagesDiv').append("<div><b>" + strip(msg) + "<br /></div>");
}

// get the roomID we want to join/create
roomIDs = window.localStorage.getItem("roomID");

// reference to the room, if it doesn't exist we create it
dataRef = new Firebase(firebaseRef + "/rooms/" + roomIDs);

// get the current name of the user //
dataRef.push({name: currentName, uri: "has joined the room!"});

// make sure we add a message to our spotify whenever we recieve one on firebase
dataRef.limit(1).on('child_added', function(snapshot)
{
    var message = snapshot.val();
    displayChatMessage(message.name, message.uri);
});

// update our info
$("#tag").text(roomIDs);

// delete room on disconnect
dataRef.onDisconnect().remove();

// this is where we handle all our requests
function displayChatMessage(name, text)
{
    // default is a message, ie always assume messa
    var flag = "m";

    // Flag setting
    if (isSpotifyTrack(text))
    {
        flag = "t";
    }

    // Flag handling
    if (flag == "t")
    {
        playSong(name, text);
        currentSongUri = text;
    }
    else if (flag == "m")
    {
        messageCount = messageCount + 1;
        $('#messagesDiv').append("<div><b>" + name + "</b>: <em>" + text + "</em><br /></div>");
    }

    // removing older messages
    if (flag == "m" || flag == "t")
    {
        if (messageCount > 10)
        {
            // remove the first element inside the div.
            $("#messagesDiv > div").eq(0).remove();
        }
    }
}

// Parsing messages sent.
$("#messageInput").keypress(function(e)
{
    if (e.keyCode == 13)
    {
        var text = $('#messageInput').val();

        if(text.length <= 125)
        {
            if(isSpotifyTrack(text))    // if it's a track make sure it's not a duplicate
            {
                if(currentSongUri != text)  // make sure it's not the same song
                {
                    dataRef.push({name: currentName, uri: strip(text)});
                }
                else
                {
                    CAlert("That song is already playing!", "red");
                }
            }
            else if (text.indexOf("spotify:local:") !== -1)
            {
                CAlert("That is a local song and cannot be played to other people!", "red");
            }
            else                        // else it's just some text
            {
                dataRef.push({name: currentName, uri: strip(text)});
            }
        }
        else
        {
            CAlert("Message must be less than 125 characters!", "red")
        }

        $('#messageInput').val('');
    }
});