CampFire
========

# About

This project started out as a spotify app, however it came to my attention after I created the bloody thing that someone had beat me to it! Sounddrop.fm, kudos!
So i decided to scrap the spotify app idea and convert it to a fully fleged, open-source standalone application.

# Pre-requisites

If you're planning on hosting rooms, then you WILL need a webserver to host the /web/ content on. Other than that nothing.
Only works on Windows, .NET framework. (Sorry!)

# Installation

1. Compile the C# application
2. Plonk the /web/ folder into your webserver somewhere.
3. Go to firebase, sign up and then create a new firebase.
4. Go to "/web/scripts/main.js" and on line 2, change that URL to the link to your firebase.

Done! run the webserver, run the application, navigate to the index.html and go nuts