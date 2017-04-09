Who:
David White
Patrick Amato
Eric Speaker
Tsun Hin Lai

Project:
Shuffle+

Vision:
Shuffle, plus options

++++++++++++++++++++++++++++++++++++++
User acceptance testing
++++++++++++++++++++++++++++++++++++++

Spotify Authentication Test
  Verify that app can authenticate users
Description
  Tests all functions involved in authenticating users
Precondition
  N/A
Test Steps
  1. Verify that generateRandomString() function works
  2. Verify that the Shuffle+ login page renders
  3. Verify that the Spotify API returns access and refresh tokens
Expected Result
  API should return access and refresh tokens
Actual Result
  User is taken to main page of site
Status
  pass
Notes
  N/A
Postcondition
  User has authenticated access to Spotify account
  
  
  
Playlist update test
  
Description
  Verify that the app can pull playlist and track data from spotify
Precondition
  User is authenticated with spotify account
Test Steps
  1. Navigate to shuffle+ main page
  2. Verify that the playlist options appear in left column
  3. Select several playlists and verify that the associated tracks appear in the center column
  4. Verify that playlist preview images appear in the player widget
Expected Result
  Playlists should display when selected with included tracks and preview image.
Actual Result
  Does not display tracks for premade playlists
Status
  effective pass
Notes
  Look into premade playlists access.
Postcondition
  User has selected a playlist for shuffling
  
  
  
Shuffle function test
  
Description
  Verify that the app correctly randomizes playlists in spotify
Precondition
  User is authenticated with spotify account
Test Steps
  1. Navigate to shuffle+ main page
  2. Select a playlist from the playlist options column
  3. Click the player widget to open the playlist in spotify, check track order
  4. Click the shuffle button
  5. Click the player widget to reopen the playlist, verify that track order has changed.
Expected Result
  Playlist track order should have changed
Actual Result
  Shuffle function works inconsistently
Status
  fail
Notes
  segfault in index.js
Postcondition
  User has successfully shuffled tracks
  
+++++++++++++++++++++++++++++++++++++
Automated testing
+++++++++++++++++++++++++++++++++++++

Test Screenshot:
  ![Test Output](./img.jpg?raw=true "Title")
