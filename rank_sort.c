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

	//create arrays for song data
	var working_playlist = [p_len];
	//take from initial list
	var fin_list = [p_len];


	while(playlist != empty){
		//1st time though -- for 5* songs
		for(int i = 0;i < p_len; i++){
			if(song_rank = 5){		//proper format for song_rank
				working_playlist[5count] = initiallist[i]; //move to top of list
				5count++;
			}
			else{
				i++;
			}
		}
		//now randomize 5* songs
		while(rsadd != 5count){ //rs add= random shuffle add
			while(songadd != p_len){				
				rngnum = random(5count);
				song = rngnum + offset; //the row in 'data storage' to move
				//move song
				fin_list[songadd] = working_playlist[rngnum];
				
				//then remove it from the working list
					//loop through remainder of list 
					//move next element into that element
				counter = rngnum;				
				for(counter;counter<p_len;p_len++){
					workingplaylist[counter] = workingplaylist[counter+1];
				}
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
				working_playlist[4count] = initiallist[i]; //move to top of unsorted list -- based on number of 5* songs there were
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
				fin_list[5count + songadd] = working_playlist[rngnum];
				//then remove it from the working list
					//loop through remainder of list 
					//move next element into that element
				counter = rngnum;				
				for(counter;counter<p_len;p_len++){
					workingplaylist[counter] = workingplaylist[counter+1];
				}
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
	//now do same process for 3*
	while(plyalist != empty){
		//1st time though -- for 4* songs
		for(int i = 0;i < p_len; i++){
			if(song.rank = 3){
				working_playlist[3count] = initiallist[i]; //move to top of unsorted list -- based on number of 5 & 4* songs there were				
				//move to top of unsorted list -- based on number of 3* songs there were
				3count++;
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
				fin_list[5count + 4count + songadd] = working_playlist[rngnum];
				//then remove it from the working list
					//loop through remainder of list 
					//move next element into that element
				counter = rngnum;				
				for(counter;counter<p_len;p_len++){
					workingplaylist[counter] = workingplaylist[counter+1];
				}
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
				working_playlist[2count] = initiallist[i]; //move to top of unsorted list -- based on number of 5 & 4* songs there were
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
				fin_list[5count + 4count + 3count + songadd] = working_playlist[rngnum];
				//then remove it from the working list
					//loop through remainder of list 
					//move next element into that element
				counter = rngnum;				
				for(counter;counter<p_len;p_len++){
					workingplaylist[counter] = workingplaylist[counter+1];
				}				

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
			fin_list[5count + 4count + 3count + 2count + songadd] = working_playlist[rngnum];
			//then remove it from the working list
				//loop through remainder of list 
				//move next element into that element
			counter = rngnum;				
			for(counter;counter<p_len;p_len++){
				workingplaylist[counter] = workingplaylist[counter+1];
			}		
			offset++;
			songadd++;
			running_p_length--;
			rngnum = -1; //so if it keeps this number we know something is wrong b/c nothing would be added
		}
	}
	//play the shuffle
}