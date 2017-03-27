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
void basic_play(queue playlist){ //void??
	while(playlist != is_empty){
		p_len = sizeof(playlist);
		for(int i = 0,i < p_len, i++ ){
 			//play song
		}
	}
}

void basic_shuffle(queue playlist){
	/*create the shuffle*/
	//assuming queue element starts at 0 and increments --- so song 1 is q[0]
	//currentsong = playlist[0];
	//nextsong = playlist[1];
	array b_s_list = [];

	int x = 0;	//bslist spot
	int p_len = sizeof(playlist);	
	int y = p_len;	//oldlist counter
	while(y != 0){
		lv = rand() % p_len; //pick a random number from the playlist to add into the queue
		/*add song and "remove it from the old list*/
		b_s_list[x] = playlist[lv];
		while(int z = lv; z < p_len; z++){
			playlist[z] = playlist[z+1];
		}
		x++;
		y--;
		p_len--;		
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

