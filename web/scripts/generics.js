function isSpotifyTrack(text)
{
    if (text.indexOf("spotify:track:") !== -1 || text.indexOf("http://open.spotify.com/track/") !== -1)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function playSong(name, uri)
{
  ws.send(name + "^" + uri);
}

function CAlert(text, colour)
{
  $('#messagesDiv').append("<div><b style='color: " + colour + ";'>" + text + "</b></div>");
}

function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}