/** Defines shuffle functions which use various shuffling methods to be
used in playlist shuffle **/
var exports = module.exports;

/** Shuffles the elements to the array referenced in a uniformly random fashion
**/
var shuffleArray = function(array){
  for (var i = array.length - 1; i > 0; i--) {
    var index = Math.floor(Math.random() * i);
    var tmp = array[index];
    array[index] = array[i];
    array[i] = tmp;
  }
}

/** Pads the referenced array with numPads "dummy" elements **/
var padArray = function(array, numPads){
  remainder = numPads;
  while (remainder > 0){
    array.push("dummy");
    remainder--;
  }
}

/** Used in the spread shuffle algorithm to merge the separate track arrays
in a specific fashion **/
var mergeArrays = function(arrays){
  var fin_array = [];
  for (i = 0; i < arrays[0].length; i++){
    for(j = 0; j < arrays.length; j++){
      if (arrays[j][i] !== "dummy"){
        fin_array.push(arrays[j][i]);
      }
    }
  }

  return fin_array;
}

/** Returns the length of the largest array in the 2d array referenced **/
var findMaxLength = function(arrays){
  var max = 0;
  for (i = 0; i < arrays.length; i++){
    if (arrays[i].length > max){
      max = arrays[i].length;
    }
  }

  return max;
}

/** Creates an array of track index objects, shuffles them, and extracts a
pattern of indices for a uniformly random permutation of the tracks in the
playlist **/
exports.randShuffle = function(songArray){
  var trackIndices = [];    //Holds original and new indices for each track
  var newi;
  var done = false;
  for (i = 0; i < songArray.length; i++){
    var indices = {
      currentIndex: i,
      newIndex: null
    };
    trackIndices.push(indices);
  }

  for (var i = trackIndices.length; i > 0; i--){
    //Generate new index for track i that is between 0 and i-1 inclusive
    newi = Math.floor(Math.random() * i);
    trackIndices[i - 1].newIndex = newi;
  }

  return trackIndices
}

/** Creates an array of track index objects, shuffles them, and produces an
index arrangement for the tracks in the playlist such that tracks with the
same value for a given attribute are as separated from one another as possible
 **/
exports.spreadShuffle = function(songArray){
  var orig = songArray;
  var arrays = [];
  var indexHash = {};
  var numArtists = 0;

  for (i = 0; i < orig.length; i++){
      if (indexHash[orig[i].shuffleParam] !== undefined){
        arrays[indexHash[orig[i].shuffleParam]].push(orig[i]);
      } else {
        numArtists++;
        indexHash[orig[i].shuffleParam] = numArtists - 1;
        arrays.push([orig[i]]);
      }
  }

  var max = findMaxLength(arrays);
  for (i = 0; i < arrays.length; i++){
    if (arrays[i].length < max){
      padArray(arrays[i], (max - arrays[i].length));
    }
    shuffleArray(arrays[i]);
  }
  fin_array = mergeArrays(arrays);
  for (i = 0; i < fin_array.length; i++){
    fin_array[i].newIndex = i;
  }
  return fin_array;
}

/** Creates index objects for the tracks in the playlist, shuffles them, and
returns an arrangement of indices such that the tracks in the playlist are
shuffle uniformly randomly but certain tracks are given priority over others
**/
exports.biasedShuffle = function(songArray){
  var arrays = [[], [], [], [], []];

  //Sort the tracks by rank
  for (i = 0; i < songArray.length; i++){
    console.log(songArray[i].rank);
    for (j = 1; j < 6; j++){
      if (parseInt(songArray[i].rank) === j){
        arrays[5-j].push(songArray[i]);
      }
    }
  }
  console.log(arrays);
  for (i = 0; i < 5; i++){
    if (arrays[i].length > 1){
      shuffleArray(arrays[i]);
    }
    console.log(arrays);
  }

  fin_array = [].concat.apply([], arrays);
  for (i = 0; i < fin_array.length; i++){
    fin_array[i].newIndex = i;
  }

  return fin_array;
}
