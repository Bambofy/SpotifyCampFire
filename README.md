CampFire
========

## What is this?

CampFire is a project created by me to allow me and friends to listen to songs simultaneously on spotify, I originally created it as a spotify app however i don't expect them to accept it as an official app because of sounddrop.fm!
Because of this open sourcing the project and dragging it out of it's app boots into an external C# api was the best thing i could do with it.
Video of it in action: http://www.youtube.com/watch?v=knWlxuJVCaM

## About

This project started out as a spotify app, however it came to my attention after I created the bloody thing that someone had beat me to it! Sounddrop.fm, kudos!
So i decided to scrap the spotify app idea and convert it to a fully fleged, open-source standalone application.

## Pre-requisites

If you're planning on hosting rooms, then you WILL need a webserver to host the /web/ content on. Other than that nothing.
Only works on Windows, .NET framework. (Sorry!)

## Installation

1. Compile the C# application
2. Plonk the /web/ folder into your webserver somewhere.
3. Go to firebase, sign up and then create a new firebase.
4. Go to "/web/scripts/main.js" and on line 2, change that URL to the link to your firebase.

Done! run the webserver, run the application, navigate to the index.html and go nuts
