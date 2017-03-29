const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const app = express();

//Get views from views folder and render pages as embedded js
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Set port location. 5000 if working locally or automatically get location
//on Heroku server environment
app.set('port', (process.env.PORT || 5000));

//Render views in public directory
app.use(express.static(__dirname + '/public')).use(cookieParser());;

var client_id = '[insert client id here]'; // Your client id
var client_secret = '[insert client secret here]'; // Your secret
var redirect_uri = 'http://localhost:5000/callback'; // Your redirect uri
var stateKey = 'spotify_auth_state';

//Used for creating state strings
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//Routes
app.get('/', function(req, res){
  res.render('pages/login');
});

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
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

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

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
            });
          });
        });
      } else {
        console.log("Authorization error");
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
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

app.get('/get-tracks/:user_id/:playlist_id/:access_token', function(req, res){
  var playlist_id = req.params.playlist_id;
  var access_token = req.params.access_token;
  var user_id = req.params.user_id;

  var options = {
     url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists/' + playlist_id + '/tracks',
     headers: { 'Authorization': 'Bearer ' + access_token },
     json: true
   };

   request.get(options, function(error, response, body) {
     console.log(body);
     res.render('partials/tracklist', {
       songs: body.items
     });
   });
});

//Listen for requests
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
