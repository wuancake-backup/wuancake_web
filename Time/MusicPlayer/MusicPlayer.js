window.onload=function(){
	var button = document.getElementsByClassName('play')[0];
	var next = document.getElementsByClassName('next')[0];
	var vincrease = document.getElementsByClassName('increase')[0];
	var vdecrease = document.getElementsByClassName('decrease')[0];
	button.onclick=function(){	
		//alert('ok');
		playPause();
	}	
	next.onclick=function(){
		alert('只有一首');	
	}
	vincrease.onclick=function(){
		volumeIncrease();
	}
	vdecrease.onclick=function(){
		volumeDecrease();
	}
}
function playPause(){
	var audio=document.getElementById('music1');
	var button=document.getElementsByClassName('play')[0];
	if(audio.paused){
		audio.play();
    button.setAttribute('src','image/pause.jpg');	
	}
	else{
		audio.pause();
	button.setAttribute('src','image/play.jpg');	
	}	
}
function volumeIncrease(){
	var myAudio=document.getElementById('music1');
	var newVolume = myAudio.volume + 0.1;
	//alert(newVolume);
	myAudio.volume = newVolume;		
}
function volumeDecrease(){
	var myAudio=document.getElementById('music1');
	var newVolume = myAudio.volume - 0.1;
	myAudio.volume = newVolume;		
}