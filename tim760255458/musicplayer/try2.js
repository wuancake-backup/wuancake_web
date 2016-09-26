var music_list = ["常慧伦 - 莫名我就喜欢你","刘瑞琦 - 乌克丽丽","四季 音色 - 夏夜"];
var i = 0;

//下一曲
function next_music () {
	var a = document.getElementById("mymusicplayer");
	if (i < music_list.length || a.ended == true) {
		a.src = "mp3/" + music_list[i] + ".mp3";
		i++;
	} else{
		i = 0;
	}
}

//播放和暂停
function play_and_stop () {
	var a = document.getElementById("mymusicplayer");
	if (a.paused == true) {
		a.play();
	} else{
		a.pause();
	}
}

//进度条
function music_rate () {
	var a = document.getElementById("music_rate_bg");
		b = document.getElementById("music_rate_color");
		size = music_currenttime()/music_timeall();
	b.style.width = size * a.style.width;
}

//获取当前歌曲时长
function music_timeall () {
	var a = document.getElementById("mymusicplayer");
	if(a.currentTime != 0){
		return a.duration;
	} else{
		return 0;
	}
	
}

//获取已播放时长
function music_currenttime () {
	var a = document.getElementById("mymusicplayer");
	return a.currentTime;
}

//定时器
var timer = setInterval(music_rate(),1000);
