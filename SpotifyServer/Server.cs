using System;
using System.Collections.Generic;
using System.Linq;
using JariZ;
using Fleck;

// Props to:
// https://github.com/statianzo/Fleck for the websockets.
// https://code.google.com/p/spotify-local-api/ for the spotify api.

namespace SpotifyServer
{
    class Server
    {
        // Spotify API
        private readonly SpotifyAPI _api;
        private Responses.CFID _cfid;
        private Responses.Status _currentStatus;

        public Server()
        {
            // Default message.
            Console.WriteLine(
                "This is the CampFire listener, if you keep this running in the background with Spotify open it will play tracks when they are recieved by the webpage.\r\n");

            _api = new SpotifyAPI(SpotifyAPI.GetOAuth(), "SpotifyServer.spotilocal.com");
            _currentStatus = _api.Status;
            _cfid = _api.CFID;
            
            FleckLog.Level = LogLevel.Debug;

            var allSockets = new List<IWebSocketConnection>();
            var server = new WebSocketServer("ws://localhost:8181/CampFire");

            server.Start(socket =>
                {
                    socket.OnOpen = () =>
                        {
                            Console.WriteLine("Open connection.");
                            // Add the new connection to our list so we can send messages back.
                            allSockets.Add(socket);
                        };

                    socket.OnClose = () =>
                        {
                            Console.WriteLine("Closed connection, the CampFire webpage has been closed.");

                            // Make sure we remove them from out list when we are not connected to em.
                            allSockets.Remove(socket);
                        };

                    socket.OnMessage = message =>
                        {
                            // When a message is recieved it comes in the from NAME^spotify:track:oiasdoijasd so we split the string with ^ to get the name and uri.
                            string[] details = message.Split('^');

                            // Don't ask why we have to do this, if we don't it borks. heh.
                            string username = Convert.ToString(details[0]);
                            string uri = Convert.ToString(details[1]);

                            // Set our spotify to look at the new uri and then play it
                            _api.URI = uri;
                            _currentStatus = _api.Play;

                            string trackName = _currentStatus.track.track_resource.name;
                            string artistName = _currentStatus.track.artist_resource.name;

                            // Message all users that X user has played X, we have to do this because there is no other way of telling the other people connecting WHO played what song
                            allSockets.ToList().ForEach(s => s.Send(username + " played " + trackName + " - " + artistName));
                            Console.WriteLine("Playing: " + _currentStatus.track.track_resource.name + " - " +
                                                _currentStatus.track.artist_resource.name);
                        };
                });

            var inpt = Console.ReadLine();
            if (inpt != "exit")
            {
                Console.ReadLine();
            }
         
        }
    }
}
