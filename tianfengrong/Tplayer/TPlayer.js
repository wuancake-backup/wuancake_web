window.onload=function (){
    var button=document.getElementById('btn');
    var voi=document.getElementById('voice');
    var aud=document.getElementById('music');
    var cur=document.getElementById('currentPosition');
    var sounds=document.getElementById('sound');
    var lyricContainer=document.getElementById('lrcContent');
    button.onclick=function(){
        playPause(this);
    }
    voi.onclick=function(){
        mute(this);
    }
    aud.ontimeupdate=function(){
        updateProgress();
    }
    cur.onchange=function(){
        updateProgress(this);
    }
    sounds.onchange=function(){
        adjustVolume(this);
    }
    timeplay();
}
function playPause(ctrl){
    var audio=document.getElementById('music');
    /*var  btn=document.getElementById('btn');*/
    if(audio.paused){
        audio.play();
        ctrl.innerHTML="&#xf04c;";
    }else{
        audio.pause();
        ctrl.innerHTML="&#xf04b;";
    };
}
function updateProgress(ctrl){
    var audio=document.getElementById('music');
    var curPos=document.getElementById('currentPosition');
    curPos.max=audio.duration;
    if(ctrl){
        audio.currentTime=ctrl.value;
    }else{
        curPos.value=audio.currentTime;
    }
}
function timeplay(){
    var audio=document.getElementById('music');
    var now=document.getElementById('now');
    var fulltime=document.getElementById('full');
    fulltime.innerHTML = Math.ceil(audio.duration);
    setInterval(function () {
        now.innerHTML = Math.ceil(audio.currentTime);
    },300)
}
 function mute(ctrl){
     var audio=document.getElementById('music');
     if(audio.muted)
     {
         audio.muted=false;
         ctrl.style.color='black';
     }else{
         audio.muted=true;
         ctrl.style.color='silver';
     }
 }
function adjustVolume(ctrl){
    var audio=document.getElementById('music');
    audio.volume=ctrl.value;
}

