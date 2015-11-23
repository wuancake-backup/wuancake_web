window.onload = function () {
	var player = document.getElementById('player');
	voiceControl(player)

	control(player)
	timeControl(player)

	getLrc("AllofMe.lrc",player)
}
var control = function (player) {
	var control = document.getElementById('control');
	var button = control.getElementsByTagName('span');

	button[0].addEventListener("click",function () {
		if (player.paused) {
			player.play();
			this.innerHTML = "&#xe750;"
		}else{
			player.pause();
			this.innerHTML = "&#xe74f;"
		};
	})
	// button[0].onclick = function () {

	// }
}
var timeControl = function (player,event) {
	var nowtime = document.getElementById('now');
	var fulltime = document.getElementById('full');
	var timeline = document.getElementById('timeline');
	var timediv = timeline.getElementsByTagName('div')[0];
	var dot = timediv.getElementsByTagName('span')[0];
	var time = player.currentTime;

	fulltime.innerHTML = Math.ceil(player.duration);
	setInterval(function () {
		nowtime.innerHTML = Math.ceil(player.currentTime);
		timediv.style.width = player.currentTime/player.duration*100+"%";
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
	// timeline.onmousedown = function (event) {
	// }
}
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
	})
	// sounddiv.onclick = function (event) {

		
	// }
}

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