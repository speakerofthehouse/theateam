/**
 *This page defines the API routes for the app. It makes extensive use of
 *the Express and Request libraries for Node JS
 **/
const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const deasync = require('deasync');
const shuffles = require('./shuffles');
const now = require('performance-now');
const app = express();

//Get views from views folder and render pages as embedded js
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Set port location. 5000 if working locally or automatically get location
//on Heroku server environment
app.set('port', (process.env.PORT || 5000));

//Render views in public directory
app.use(express.static(__dirname + '/public')).use(cookieParser());;

var client_id = 'd739d37b250a4deb902355e3e4bbb32d';
var client_secret = '9d16385d5beb4eb9a5a65b5b27391b8a';
var redirect_uri = '';
var env = '';

if (app.get('port') !== 5000) {
  redirect_uri = 'http://shuffleplus.herokuapp.com/callback';
  env = 'Remote';
} else {
  redirect_uri = 'http://localhost:5000/callback';
  env = 'Local';
}

var stateKey = 'spotify_auth_state';

/** Generates a random string for use a state key when requesting authorization
codes from the Spotify API **/
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

module.exports.generateRandomString = generateRandomString;

//Routes
/** Routes users to the Spotify login prompt upon reaching the site **/
app.get('/', function(req, res){
  res.render('pages/login');
});

/** Requests authorization from the Spotify API **/
app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  var scope = 'playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

/** Requests authentication and refresh tokens from Spotify **/
app.get('/callback', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

       var access_token = body.access_token;
       var refresh_token = body.refresh_token;
       var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
       request.get(options, function(error, response, body) {
          var user_name = body.display_name;
          var user_id = body.id;
          options.url = 'https://api.spotify.com/v1/users/' + user_id + '/playlists';
          request.get(options, function(error, response, body) {
            res.render('pages/main', {
              name: user_name,
              playlists: body.items,
              user_id: user_id,
              access_token: access_token,
              refresh_token: refresh_token,
              env: env
            });
          });
        });
      } else {
        console.log("Authorization error");
      }
    });
  }
});

/** Requests a new auth token using the refresh token **/
app.get('/refresh_token/:refresh_token', function(req, res) {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

/** Gets track objects for the specified playlist from the Spotify API and
returns rendered HTML using the info returned **/
app.get('/get-tracks/:user_id/:playlist_id/:access_token', function(req, res){
  console.log("Called get-tracks");
  var playlist_id = req.params.playlist_id;
  var access_token = req.params.access_token;
  var user_id = req.params.user_id;

  var options = {
     url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists/' + playlist_id + '/tracks',
     headers: { 'Authorization': 'Bearer ' + access_token },
     json: true
   };

   //GET tracks
   request.get(options, function(error, response, body) {
     res.render('partials/tracklist', {
       songs: body.items,
       user_id: user_id,
       playlist_id: playlist_id
     });
   });
});

/** Returns all different entries from the specified playlist of the specified
category **/
app.get('/get-categories/:user_id/:playlist_id/:bias_category/:access_token', function(req, res){
  console.log("Called get-categories");
  var playlist_id = req.params.playlist_id;
  var access_token = req.params.access_token;
  var user_id = req.params.user_id;
  var biasCategory = req.params.bias_category;

  var options = {
     url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists/' + playlist_id + '/tracks',
     headers: { 'Authorization': 'Bearer ' + access_token },
     json: true
   };

   //GET tracks
   request.get(options, function(error, response, body) {
     var indexHash = {};
     var items = body.items;
     var categories = [];
     var hashParam;
     if (biasCategory === "title"){
       for (i = 0; i < items.length; i++){
         if (indexHash[items[i].track.name] === undefined){
           categories.push(items[i].track.name);
           indexHash[items[i].track.name] = 1;
         }
       }
     }
     else if (biasCategory === "artist") {
       for (i = 0; i < items.length; i++){
         if (indexHash[items[i].track.artists[0].name] === undefined){
           categories.push(items[i].track.artists[0].name);
           indexHash[items[i].track.artists[0].name] = 1;
         }
       }
     }

     console.log(categories);
     res.render("partials/categories", {
       categories: categories
     });
   });
});

/** Creates an array of objects containing the specified param for each song **/
var extractShuffleParams = function(songs, param){
  var songArray = [];
  if (param === "artist"){
    for (i = 0; i < songs.length; i++){
      var indices = {
        shuffleParam: songArray[i].artists[0].name,
        currentIndex: i,
        newIndex: null
      };
      songArray.push(indices);
    }
  }
  else if (param === "album"){
    for (i = 0; i < songs.length; i++){
      var indices = {
        shuffleParam: songArray[i].album.name,
        currentIndex: i,
        newIndex: null
      };
      songArray.push(indices);
    }
  }
  else if (param === "popularity"){
    for (i = 0; i < songs.length; i++){
      var pop = songArray[i].popularity;
      switch (pop) {
        case (pop > 90):
          pop = 9;
          break;
        case (pop < 90 && pop >= 80):
          pop = 8;
          break;
        case (pop < 80 && pop >= 70):
          pop = 7;
          break;
        case (pop < 70 && pop >= 60):
          pop = 6;
          break;
        case (pop < 60 && pop >= 50):
          pop = 5;
          break;
        case (pop < 50 && pop >= 40):
          pop = 4;
          break;
        case (pop < 40 && pop >= 30):
          pop = 3;
          break;
        case (pop < 30 && pop >= 20):
          pop = 2;
          break;
        case (pop < 20 && pop >= 10):
          pop = 10;
          break;
        case (pop < 10):
          pop = 0;
          break;
        default:
          console.log("Error in getting popularities");
          break;
      }
      var indices = {
        shuffleParam: pop,
        currentIndex: i,
        newIndex: null
      };
      songArray.push(indices);
    }
  }

  return songArray;
}

/** Shuffles the tracks of a specified playlist according to a specified
shuffling method via repeated calls to the Spotify API **/
app.get('/shuffle/:shuffleStyle/:shuffleParam/:user_id/:playlist_id/:access_token', function(req, res){
  var playlist_id = req.params.playlist_id;
  var access_token = req.params.access_token;
  var shuffle_style = req.params.shuffleStyle;
  var shuffle_param  = req.params.shuffleParam
  var user_id = req.params.user_id;
  var option = req.params.option;

  var options = {
     url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists/' + playlist_id + '/tracks',
     headers: { 'Authorization': 'Bearer ' + access_token },
     json: true
   };

   //GET tracks
   request.get(options, function(error, response, body) {
     var entries = body.items;  //Array of playlist entry objects
     var length = body.total;   //Length of playlist
     var tracks = [];           //Array of track objects in playlist
     for (i = 0; i < length; i++){
       tracks.push(entries[i].track);
     }
     console.log(tracks);
     /***Shuffle function(s) to go here***/
     var reorderOptions = {
       url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists/' + playlist_id + '/tracks',
       headers: {
         'Authorization': 'Bearer ' + access_token,
         'Content-Type' : 'application/json'
       },
       form: ""
     }

    var done = false;
    var newIndices;
    var startTime;
    var endTime;
    var runTime;
    startTime = now();

    if (shuffle_style === "random"){
      newIndices = shuffles.randShuffle(tracks);
      console.log(newIndices);
    }
    else if (shuffle_style === "spread"){
      var songArray = extractShuffleParams(tracks, shuffle_param);
      console.log(songArray);
      newIndices = shuffles.spreadShuffle(songArray);
      console.log(newIndices);
    }
    for (var i = 0; i < newIndices.length; i++) {
      if (newIndices[i].currentIndex !== newIndices[i].newIndex){
        reorderOptions.form = "{ \"range_start\" : " + newIndices[i].currentIndex + ", \"insert_before\" : " + newIndices[i].newIndex + " }";
        console.log(reorderOptions.form);
        request.put(reorderOptions, function(error, response, body){
             if (!error && response.statusCode === 200) {
               if (i === (newIndices.length - 1)){
                 console.log("Shuffle Complete");
                 endTime = now();
                 runTime = endTime - startTime;
                 console.log("Total Shuffle Time: " + runTime.toFixed(3).toString());
                 res.send("Shuffle Success");
               } else {
                 console.log("Reorder Success");
                 if (newIndices[i].newIndex < newIndices[i].currentIndex){
                   for (j = 0; j < newIndices.length; j++){
                     //If the current index of the track is between the old and new indices of the reordered track
                     if (newIndices[j].currentIndex >= newIndices[i].newIndex && newIndices[j].currentIndex < newIndices[i].currentIndex){
                       newIndices[j].currentIndex++;
                     }
                   }
                 } else {
                   for (j = 0; j < newIndices.length; j++){
                     //If the current index of the track is between the old and new indices of the reordered track
                     if (newIndices[j].currentIndex < newIndices[i].newIndex && newIndices[j].currentIndex >= newIndices[i].currentIndex){
                       newIndices[j].currentIndex--;
                     }
                   }
                 }
                 newIndices[i].currentIndex == newIndices[i].newIndex;
                 done = true;
               }
             }
             else{
               if (i === (newIndices.length - 1)){
                 console.log("Shuffle Complete");
                 endTime = now();
                 runTime = endTime - startTime;
                 console.log("Total Shuffle Time: " + string(runTime.toFixed(3)));
                 res.send("Shuffle Success");
               } else {
                 console.log(body);
                 done = true;
               }
             }
        });
        while(!done){
          deasync.sleep(10);
        }
        done = false;
      }
    }
   });
});

app.post('/recieve_message', function(req, res){
  console.log("Receiving messages");
  var messages = req.data;
  console.log(messages.message1);
  console.log(messages.message2);
})

/** Listens for endpoint requests **/
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
