//Defines shuffle functions used in playlist shuffles

var exports = module.exports;

var shuffleArray = function(array){
  for (var i = array.length - 1; i > 0; i--) {
    var index = Math.floor(Math.random() * i);
    var tmp = array[index];
    array[index] = array[i];
    array[i] = tmp;
  }
}

var padArray = function(array, numPads){
  remainder = numPads;
  while (remainder > 0){
    array.push("dummy");
    remainder--;
  }
}

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

var findMaxLength = function(arrays){
  var max = 0;
  for (i = 0; i < arrays.length; i++){
    if (arrays[i].length > max){
      max = arrays[i].length;
    }
  }

  return max;
}

exports.randShuffle = function(songArray){
  var trackIndices = [];    //Holds original and new indices for each track
  var newi;
  var done = false;
  for (i = 0; i < songArray.length; i++){
    var indices = {
      originalIndex: i,
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

exports.spreadShuffle = function(songArray){
  var orig = [];
  var arrays = [];
  var indexHash = {};
  var numArtists = 0;
  for (i = 0; i < songArray.length; i++){
    var indices = {
      shuffleParam: songArray[i].artists[0].name,
      currentIndex: i,
      newIndex: null
    };
    orig.push(indices);
  }
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

exports.biasedShuffle = function(songArray){
  var arrays = [[], [], [], [], []];

  //Sort the tracks by rank
  for (i = 0; i < songArray.length; i++){
    for (j = 0; j < 5; j++){
      if (songArray[i].rank == (5 - j)){
        arrays[j].push(songArray[i]);
      }
    }
  }

  for (i = 0; i < 5; i++){
    shuffleArray(arrays[i]);
  }

  //Return the merged subarrays
  return [].concat.apply([], arrays);
}
