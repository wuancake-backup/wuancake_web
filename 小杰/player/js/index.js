window.onload=function(){
	var pause=document.getElementById('pause');
	var next=document.getElementById('next');
	var love=document.getElementById('love');
	var rubbish=document.getElementById('rubbish');
	var song=document.getElementById('song');
	var lyric=document.getElementById('lyric');
	var playedProgress=document.getElementById('playedProgress');
	var height=lyric.offsetHeight;
	var timer=0;
	var speed=100/180;
	var w=0;
	

	rubbish.onclick=function(){
		alert("这首歌已经放进了垃圾箱");
	}

	love.onclick=function(){
		this.style.backgroundPosition="0px -17px";
	}
	pause.onclick=function(){
		if (song.paused) {
			song.play();
			timer=setInterval(function(){
				w+=speed;
				playedProgress.style.width=w+'%';
			}, 1000);
		}else {
			song.pause();
			clearInterval(timer);
		}
	}
	next.onclick=function(){
		alert("下一首");
	}
}