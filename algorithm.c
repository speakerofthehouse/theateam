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

array base_list; //parameters: [number(number in the list),song_name,artist,album,ranking]


queue shuffle_edit; //same parameters


int i = 0;
void basic_play(queue playlist){ //void??
	while(playlist != is_empty){
		p_len = sizeof(playlist);
		for(int i = 0,i < p_len, i++ ){
 			//play song
		}
	}
}




void main(){

	/*create queue/array */
	/*create editable queue*/	

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





