/*
These algorithm processes needed to be developed b/c initial process idea 
doesnt wor and we basically have to work with what spotify gives us and cant
really run our own designs 
*/

/*
algorithm functions
basic play
basic shuffle
ranked shuffle -- different because cant add "more songs" 
		this new algorithm will play all higher ranked songs first--randomized
		this algorithm will pick out all 5* songs, then all 4*,..etc. and randomize the songs within that paramter
alphabetical order
		--sort by alphabetical order (name,artist??) and play

*/

/*queue playlist is an arbitrarily picked name/format for the playlist for this roughed out algorithm design*/

int i = 0;
__??__ basic_play(queue playlist){ //void??
	while(playlist != is_empty){
		p_len = sizeof(playlist);
		for(int i = 0,i < p_len, i++ ){
 			//play song
		}
	}
}


__??___ basic_shuffle(queue playlist){
	//get full length of playlist
	//RNG a song from the list
		//check artist against artist above it where it would go in list
			//if matches
				//check other not chosen songs
					//if a different artist is available
						//calculate a new RN
					//if no diff. artist available
						//add song to next available spot in playlist
			//if it doesnt match
				//add song to the next spot in the playlist


	int rngnum = 0;
	int p_len = sizeof(playlist);
	int running_p_len = p_len;
	int offset = 0;
	int songadd = 0;
	while(plyalist != empty){
		while(songadd != p_len){
			rngnum = random(running_p_length);
			song = rngnum + offset; //the row in 'data storage' to move
			//move song
			offset++;
			songadd++;
			running_p_length--;
			rngnum = -1; //so if it keeps this number we know something is wrong b/c nothing would be added
		}
	}	
//play playlist
}


__??__ ranked_shuffle(queue playlist){
	//get full length of playlist
	//organize the playlist based on ranking
		//find all 5 star songs in the playlist
			//move them to the top
				//rng through those songs
					//order randomly
		//find all 4 star songs in the playlist
			//move them to the top
				//rng through those songs
					//order randomly
		//find all 3 star songs in the playlist
			//move them to the top
				//rng through those songs
					//order randomly
		//find all 2 star songs in the playlist
			//move them to the top
				//rng through those songs
					//order randomly
		//randomize all that's left
	int rngnum = 0;
	int p_len = sizeof(playlist);
	int running_p_len = p_len;
	int offset = 0;
	int songadd = 0;
	int 5count = 0;
	int 4count = 0;
	int 3count = 0;
	int 2count = 0;
	int rsadd = 0;

	while(plyalist != empty){
		//1st time though -- for 5* songs
		for(int i = 0;i < p_len; i++){
			if(song.rank = 5){
				//move to top of list
				5count++;
			}
			else{
				i++;
			}
		}
		//now randomize 5* songs
		while(rsadd != 5count){
			while(songadd != p_len){
				rngnum = random(5count);
				song = rngnum + offset; //the row in 'data storage' to move
				//move song
				offset++;
				songadd++;
				running_p_length--;
				rsadd++;
				rngnum = -1; //so if it keeps this number we know something is wrong b/c nothing would be added
			}
		}		
	}
	rsadd = 0;
	//now do same process for 4*
	while(plyalist != empty){
		//1st time though -- for 4* songs
		for(int i = 0;i < p_len; i++){
			if(song.rank = 4){
				//move to top of unsorted list -- based on number of 5* songs there were
				4count++;
			}
			else{
				i++;
			}
		}
		//now randomize 3* songs
		while(rsadd != 4count){
			while(songadd != p_len){
				rngnum = random(4count);
				song = rngnum + offset; //the row in 'data storage' to move
				//move song
				offset++;
				songadd++;
				running_p_length--;
				rsadd++;
				rngnum = -1; //so if it keeps this number we know something is wrong b/c nothing would be added
			}
		}		
	}
	//3*
	rsadd = 0;
	//now do same process for 4*
	while(plyalist != empty){
		//1st time though -- for 4* songs
		for(int i = 0;i < p_len; i++){
			if(song.rank = 3){
				//move to top of unsorted list -- based on number of 5* songs there were
				2count++;
			}
			else{
				i++;
			}
		}
		//now randomize 3* songs
		while(rsadd != 3count){
			while(songadd != p_len){
				rngnum = random(3count);
				song = rngnum + offset; //the row in 'data storage' to move
				//move song
				offset++;
				songadd++;
				running_p_length--;
				rsadd++;
				rngnum = -1; //so if it keeps this number we know something is wrong b/c nothing would be added
			}
		}		
	}
	//2*
	rsadd = 0;
	//now do same process for 2*
	while(plyalist != empty){
		//1st time though -- for 2* songs
		for(int i = 0;i < p_len; i++){
			if(song.rank = 2){
				//move to top of unsorted list -- based on number of 5* songs there were
				2count++;
			}
			else{
				i++;
			}
		}
		//now randomize value* songs
		while(rsadd != 2count){
			while(songadd != p_len){
				rngnum = random(2count);
				song = rngnum + offset; //the row in 'data storage' to move
				//move song
				offset++;
				songadd++;
				running_p_length--;
				rsadd++;
				rngnum = -1; //so if it keeps this number we know something is wrong b/c nothing would be added
			}
		}		
	}
	//for the last set can just use generic shuffle for what's left
	while(plyalist != empty){
		while(songadd != p_len){
			running_p_length = p_len - 5count - 4count - 3count - 2count			
			offset = running_p_length			
			rngnum = random(running_p_length);
			song = rngnum + offset; //the row in 'data storage' to move
			//move song
			offset++;
			songadd++;
			running_p_length--;
			rngnum = -1; //so if it keeps this number we know something is wrong b/c nothing would be added
		}
	}
	//play the shuffle
}




