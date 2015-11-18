window.onload = function () {
	var player = document.getElementById('player');
	voiceControl(player)

	control(player)
	timeControl(player)
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
			document.onmouseup=null;
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

var drag = function (obj) {
	
}