/*
structure to hold all songs as added
2nd structure/queue to edit and change for shuffle


algorithm functions
1. basic play [as added] --> play through by increasing number order from the list -- each number given to song when added 
2. basic shuffle [reg shuffle, no extra stuff]
3. ranked shuffle
4. alphabetic shuffle??
	--these should also handle a song being added mid shuffle:
		--> if add song then recall the function with what is left of the shuffle 

*/

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
	/*create the shuffle*/
	//assuming queue element starts at 0 and increments --- so song 1 is q[0]
	//currentsong = playlist[0];
	//nextsong = playlist[1];
	//array b_s_list = [];

	int x = 0;	//bslist spot
	int p_len = sizeof(playlist);	
	int y = p_len;	//oldlist counter
	while(y != 0){
		lv = rand() % p_len; //pick a random number from the playlist to add into the queue
		/*add song and "remove it from the old list*/
		if(b_s_list[x-1].artist != playlist[lv].artist ){
			b_s_list[x] = playlist[lv];
			while(int z = lv; z < p_len; z++){
				playlist[z] = playlist[z+1];
			}
			x++;
			y--;
			p_len--;		
		}
		
	}
 	/*run the shuffle*/
		--inside or outside the function??? -- main??
}


__??__ ranked_shuffle(queue playlist){
	/*ranking of each song from 1-5, each song gets 1 entry per ranking --> rank1 = 1 entry, rank 5 = 5 entries.*/
	//r_shuffle
	int x = 0; //playlist counter
	int y = 0; //r_s_list counter
	p_len = sizeof(playlist);
	/*adding songs based on ranking*/
	while(playlist != empty){
		while(int x = 0; x < p_len; x++){
			if(playlist[x].ranking == 1){
				r_s_list[y] = playlist[x];
				x++;
				y++;
			}
			else if(playlist[x].ranking == 2){
				r_s_list[y] = playlist[x];
				r_s_list[y+1] = playlist[x];
				x++;
				y=y+2;			
			}
			else if(playlist[x].ranking == 3){
				r_s_list[y] = playlist[x];
				r_s_list[y+1] = playlist[x];
				r_s_list[y+2] = playlist[x];
				x++;
				y=y+3;			
			}
			else if(playlist[x].ranking == 4){
				r_s_list[y] = playlist[x];
				r_s_list[y+1] = playlist[x];
				r_s_list[y+2] = playlist[x];
				r_s_list[y+3] = playlist[x];
				x++;
				y=y+4;
			}
			else{//playlist[x].ranking == 5
				r_s_list[y] = playlist[x];
				r_s_list[y+1] = playlist[x];
				r_s_list[y+2] = playlist[x];
				r_s_list[y+3] = playlist[x];
				r_s_list[y+4] = playlist[x];				
				x++;
				y=y+5;			
			} 		
		}
	}

	int x = 0;	//rlist spot
	int p_len = sizeof(playlist);	
	int y = p_len;	//oldlist counter
	while(y != 0){
		lv = rand() % p_len; //pick a random number from the playlist to add into the queue
		/*add song and "remove it from the old list*/
		if(b_s_list[x-1].artist != playlist[lv].artist ){
			b_s_list[x] = playlist[lv];
			while(int z = lv; z < p_len; z++){
				playlist[z] = playlist[z+1];
			}			
			x++;
			y--;
			p_len--;		
		}		
	}
 	/*run the shuffle*/
		--inside or outside the function??? -- main??

}


void main(){

	/*create queue/array */
	/*create editable queue*/	
	
	array base_list; //parameters: [number(number in the list),song_name,artist,album,ranking]


	array shuffle_edit; //same parameters
	l_size = sizeof(base_list);
	
	/*b/c of sizing and how preallocation i am initially setting things to size of original list*/
	/*will have to be developed for what happens when a person adds a new song while running a list*/
	array b_s_list[l_size];
	array b_shuff[l_size];
	array r_shuff[5*l_size]; //5 b/c of rankings from 1-5 and how that would affect algorithm 
	array al_shuff[l_size];

	int userinput = 0;
	cin << shuff_type;
	userinput = shuff_type;

	/*
	0 = basic play
	1 = basic shuffle
	2 = ranked shuffle
	3 = alph. shuffle
	-1 = quit	
	*/

	while(userinput != -1){
		if(userinput = 0){
			basic_play(editable_queue);
		}
		else if(userinput = 1){
			basic_shuff(editable_queue);
		}
		else if(userinput = 2){
			rank_shuff(editable_queue);
		}
		else if(userinput = 3){
			alph_shuff(editable_queue);
		}

	}
		
}
