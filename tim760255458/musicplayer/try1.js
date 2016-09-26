function mymusicplayer (song) {
	var myplayer = document.createElement("audio");
	myplayer.id = "myplayer";
	document.getElementById("music_player_wrap").appendChild(myplayer);
	//获取歌曲
	this.song = song;
	//获取播放器
	this.musicplayer = document.getElementById("myplayer");
	
}
