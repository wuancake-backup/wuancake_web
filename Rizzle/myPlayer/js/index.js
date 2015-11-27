var controls = {
	player : "player",

	playbut : "playbut",
}

var myPlayer = (function (window,controls) {
	var player = document.getElementById('player');	
	var myPlayer = {};
	myPlayer.init = function() {
		timeInit();
	}; 
	myPlayer.render = function () {
		myPlayer.init()
		controlBut(controls.playbut,player);
		//timeControl(player);
		voiceControl(player);
	}
	//控制播放的按钮
	var controlBut = function (playbut,player) {
		var playButton = document.getElementById(playbut);	
		playButton.addEventListener("click",function () {
			if (player.paused) {
				player.play();
				this.innerHTML = "&#xe750;"
			}else{
				player.pause();
				this.innerHTML = "&#xe74f;"
			};
		},false) 
	}
	//转换时间格式的函数
	var secToMin = function (sec) {
		if (typeof sec === "number" && sec === sec) {
			var min = Math.floor(sec/60);
			console.log()
			var newsec = sec%60;
			if (min<10) {
				var realmin = "0" + min.toString();
			}else{
				var realmin = min.toString();
			};
			if (newsec<10) {
				var realsec = "0" + newsec.toString();
			}else{
				var realsec = newsec.toString();
			};
			var time = realmin+":"+realsec;
			console.log(time)
			return time
		}else{return "00:00"};	
	}
	//时间显示的函数
	var timeInit = function () {
		var nowtime = document.createElement('span');
		var fulltime = document.createElement('span');
		nowtime.className = "now pl10";

		var showtime = document.getElementById('showtime');
		fulltime.innerHTML = secToMin(Math.ceil(player.duration));
		console.log(secToMin(270))
		nowtime.innerHTML = secToMin(Math.ceil(player.currentTime));		
		//console.log(secToMin(80))
		var span = document.createElement('span');
		span.innerHTML = "/";
		showtime.appendChild(nowtime);
		showtime.appendChild(span);
		showtime.appendChild(fulltime);

		var timeline = document.getElementById('timeline');
		var timediv = document.createElement('div');
		var dot = document.createElement('span');
		dot.className = "dot"
		timediv.className = "inside";
		timediv.style.width = "0px"
		timeline.appendChild(timediv);
		timeline.appendChild(dot);
		
		var time = player.currentTime;
		setInterval(function () {
			nowtime.innerHTML = secToMin(Math.ceil(player.currentTime)) ;
			timediv.style.width = player.currentTime/player.duration*100+"%";
			dot.style.left = player.currentTime/player.duration*parseInt(timeline.clientWidth)+"px";
		},300)	


		timeline.addEventListener("mousedown",function (event) {
			var dot = this.getElementsByTagName('span')[0];

			document.onmousemove = function (event) {
				time = player.duration * ((event.clientX-timeline.offsetLeft)/parseInt(timeline.style.width));
				player.currentTime = time;		
			}
			document.onmouseup=function (){
				document.onmousemove=null;
				//document.onmouseup=null;
			};
		})
	}

	// var timeControl = function (player,event) {


	// 	// timeline.onmousedown = function (event) {
	// 	// }
	// }
	var voiceControl = function (player,event) {
		var voice = document.getElementById('voice');
		var sounddiv = document.getElementById('sound');
		var insidediv = sounddiv.getElementsByTagName('div')[0];
		var dot = insidediv.getElementsByTagName('span')[0];
		insidediv.style.width = sounddiv.style.width;
		var sound = parseInt(insidediv.style.width)/parseInt(sounddiv.style.width);

		voice.onclick = function () {
			if (player.volume) {
				player.volume = 0;
			}else{
				player.volume = sound;
			};
		}

		sounddiv.addEventListener("mousedown",function (event) {
			document.onmousemove = function (event) {

				if (event.clientX>sounddiv.offsetLeft && event.clientX<sounddiv.offsetLeft+parseInt(sounddiv.style.width)) {
					sound = (event.clientX-sounddiv.offsetLeft)/parseInt(sounddiv.style.width);
					player.volume = sound;
					insidediv.style.width = sound * parseInt(sounddiv.style.width) + "px";			
				};

			}
			document.onmouseup=function (){
				document.onmousemove=null;
				document.onmouseup=null;
			};
		},false)
		// sounddiv.onclick = function (event) {

			
		// }
	}	

	return myPlayer;
})(window,controls)

document.addEventListener("DOMContentLoaded",myPlayer.render,false )  

	


var getLrc = function (url,player) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
    	if (xhr.readyState == 4 && xhr.status == 200) {
    		var lyric = lrcobj(xhr.responseText);
    		rollLrc(lyric,player);
    		//console.log(lyric)
    	};
    };
}

var lrcobj = function (lrc) {
	//这里的正则都是自己写的
	var lrcs = lrc.split("/n");
	var obj = [];
	var value = [];
	for (var i = 0; i < lrcs.length; i++) {
		var reg = /\[[0-9][0-9]:[0-9][0-9].[0-9][0-9]\].*/g;
		//var valuereg = 
		value = lrcs[i].match(reg);
		//console.log(value)
	};
	for (var i = 0; i < value.length; i++) {
		var timereg = /\[[0-9][0-9]\:[0-9][0-9]\.[0-9][0-9]\]/g;
		var time = value[i].match(timereg);
		var words = value[i].replace(timereg,"");

		var timew = time.toString()
		var min = parseInt(timew.match(/[0-9][0-9]/)[0]);
		var sec = parseFloat(timew.match(/[0-9][0-9]\.[0-9][0-9]/i)[0])
		var trueTime = Math.round(min*60+sec);
		//console.log(words);
		if (words) {
			obj.push([trueTime,words])
		};
		
	};
	//console.log(obj);
	return obj;

}

var rollLrc = function (lrc,player) {
	var lrcdiv = document.getElementById('lrc');
	var lrcul = lrcdiv.getElementsByTagName('ul')[0];
	//console.log(lrc);
	for (i = 0;i < lrc.length;i++){
		var li = document.createElement("li");
		li.innerHTML = lrc[i][1];
		li.setAttribute('class','a'+lrc[i][0]);
		lrcul.appendChild(li);
	}
	var top = lrctop(lrc);
	console.log(top)
	player.ontimeupdate = function () {
		var time = Math.round(player.currentTime);
		var newtext = lrcdiv.getElementsByClassName('a'+time)[0];
		var now = lrcdiv.getElementsByClassName('active')[0];		

		for (var i = 0; i < lrc.length; i++) {
			if (lrc[i][0] == time) {
				//console.log (now)
				if (newtext && newtext != now) {
					//这里参考了网上的removeClass
					var reg = /active/;			
					newtext.className += ' active';
					//console.log(newtext)
					if (now) {
			    		now.className = now.className.replace(reg,'');
			    		lrcul.style.top = 200-top[time]+"px";
					};
				};
			}; 
		};
	}
}

var lrctop = function (lrc) {
	var top = {};
	var height = 0;
	var lrcdiv = document.getElementById('lrc');
	var lrcul = lrcdiv.getElementsByTagName('ul')[0];
	var li = lrcul.getElementsByTagName("li");
	for (var i = 0; i < li.length; i++) {
		height += li[i].clientHeight;
		console.log(li[i].clientHeight)
		top[lrc[i][0]] = height;
	};
	console.log(top);
	return top
}