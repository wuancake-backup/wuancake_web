//创建两个函数，来处理play和like按钮额外的效果，为了防止再次按按扭
//样式不变化的情况，使用if判断class的值，从而解决反复按按钮无变化的情况
function play_btn () {
	var btn=document.getElementById("play");
	if (btn.className == "btn play-btn btn0") {
		btn.className="btn btn1 btn0";
	} else{
		btn.className="btn play-btn btn0";
	}
}
function like_btn () {
	var btn=document.getElementById("like");
	if (btn.className == "btn like-btn btn0") {
		btn.className="btn btn3 btn0";
	} else{
		btn.className="btn like-btn btn0";
	}
}
function sound_volume () {
	var btn=document.getElementById("sound-volume");
	if (btn.className == "btn sound-btn") {
		btn.className="btn btn5";
	} else{
		btn.className="btn sound-btn";
	}
}


//播放器部分


//构造播放器
var myplayer = document.createElement("audio");
myplayer.id = "myplayer";
myplayer.setAttribute("src","mp3/刘瑞琦 - 乌克丽丽.mp3");
myplayer.setAttribute("autoplay","autoplay");


//下一曲功能
var musiclist = ["常慧伦 - 莫名我就喜欢你","刘瑞琦 - 乌克丽丽","四季 音色 - 夏夜"];
var i=0;
function next () {
	myplayer.src = "mp3/"+musiclist[i]+".mp3";
	myplayer.load();
	myplayer.play();
	i=i+1;
	if (i >= musiclist.length) {
		i=0;
	}
	play_btn();
}

//暂停和播放功能
function playandstop () {
	if (myplayer.paused == false) {
		myplayer.pause();
	} else{
		myplayer.play();
	}
}


//播放进度条、时间显示及音量调节
//时间显示
function push_time () {
	var a = document.getElementById("play_time");
	var b = document.getElementById("sup_time");
	a.innerHTML = conversion_time(currenttime);
	b.innerHTML = conversion_time(timeall);
}
//获取歌曲总时间
function timeall () {
	var a = document.getElementById("myplayer");
	if (a.currentTime != 0) {
		return parseInt(a.duration);
	} else{
		return parseInt("0");
	}
}

//获取歌曲当前播放时间
function currenttime () {
	var a = document.getElementById("myplayer");
	return parseInt(a.currentTime);
}

//将剩余秒数转化为标准格式
function conversion_time (time) {
	var surplus_minite,surplus_second,ctime;
	//将剩余秒数转化为分钟
	surplus_minite = Math.floor((time/60)%60);
	//将剩余秒钟转化为秒钟
	surplus_second = Math.floor(time%60);
	if (surplus_second < 10) {
		surplus_second = "0"+surplus_second;
	}
	if (surplus_minite < 10) {
		surplus_minite = "0"+surplus_minite;
	}
	ctime = surplus_minite + ":" + surplus_second;
	return ctime;
}

//歌曲进度条变化
function song_schedule_change (size) {
	var music_rate_color = document.getElementById("music_rate_color");
	music_rate_color.style.width = size + "px";
}

//歌曲进度变化过程
function get_song_progress (event) {
	var music_rate_bg = document.getElementById("music_rate_bg"),
		myplayer = document.getElementById("myplayer"),
		progressbp,
		song_progress;
		
	//获得距相对元素距离的百分比
	var coord = coordinate(event),
		offset_coord_x = coord.coord_x;
	//计算进度条的宽度
	song_schedule_change(offset_coord_x);
	//计算进度条的百分比
	progressbp = progressBarPercentage(262,offset_coord_x)/100;
	//真实的歌曲进度数值
	song_progress = progressbp * myplayer.duration;
	return song_progress;
}

