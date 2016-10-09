// JavaScript Document
var textlrc;
window.onload=function(){
	var songs=["Eagles-TheLastResort.mp3","GunsN'Roses-Don'tCry(Original).mp3","JohnLennon-Imagine.mp3"];
	var player=document.getElementById("player");
        
	controlplay(player,songs);
	changesong(player,songs);
	timeshow(player);
	timelinecontrol(player);
	timelinectl(player);
	player.volume=0.3;
	voicecontrol(player);
	playlist(songs);
	}


//控制播放，暂停
var controlplay=function(player,songs){
	var startbtu=document.getElementById("start-btu");
	var img=startbtu.getElementsByTagName("img")[0];
	startbtu.onclick=function(){
		if(player.paused){
			if(player.src){
					player.play();}
		    else{
			        player.src='songs/'+songs[0];
					lrcshow(player);}
			        img.src="images/8.JPG";
					player.play();
					
			}
		else{
			player.pause();
			img.src="images/1.JPG";}
		changename(player);
		//console.log(settime(player.duration));
		
		}
	}
//控制切换歌曲
var changesong=function(player,songs){
	var newsong="";
	var changebtu=document.getElementById("change-btu");
	var startbtu=document.getElementById("start-btu");
	var img=startbtu.getElementsByTagName("img")[0];
	var str= window.location.href;
	str=str.replace('index.html','');
	changebtu.onclick=function(){
	if(player.src){
			var songname=player.src.replace(str+'songs/','');
			for(i=0;i<songs.length;i++){
				if(songs[i]==songname){
					var index=i;}
				}
			if(index+1==songs.length){
				newsong=songs[0];}
			else{
				newsong=songs[index+1];}
		}
	else{
		newsong=songs[0];
		}
	player.src='songs/'+newsong;
	player.play();
	img.src="images/8.JPG";
	changename(player);
	changeimage(player);
	lrcshow(player);
	
		}
	}
//控制歌曲名称，歌手名
var changename=function(player){
	var name=document.getElementsByClassName("test");//懒得重写getclass
	var str= window.location.href;
	str=str.replace('index.html','');
	var songname=player.src.replace(str+'songs/','').replace('.mp3','');
	if(player.src){
		name[0].innerHTML=songname.split("-")[1];
		name[2].innerHTML=songname.split("-")[0];
		}
	}
//控制时间的显示
var timeshow=function(player){
	var nowtimeshow=document.getElementById("now-time");
	var alltimeshow=document.getElementById("all-time");
	var nowtime=settime(player.currentTime);
	var alltime=settime(player.duration);
	nowtimeshow.innerHTML=nowtime[0]+':'+nowtime[1];
	alltimeshow.innerHTML=alltime[0]+':'+alltime[1];
	var t=setTimeout("timeshow(player)",1000);
	}
//转换时间函数，把秒数处理成00：00格式
var settime=function(times){
	var mins=Math.floor(times/60);
	var secs=Math.floor(times%60);
	if(mins<10){
		mins='0'+mins;
		}
	if(secs<10){
		secs='0'+secs;
		}
	var num=[];
	num.push(mins);
	num.push(secs);
	return num;
	}
//进度条显示
var timelinecontrol=function(player){
	var scrollline=document.getElementById("scroll-line");
	var nowtime=player.currentTime;
	var alltime=player.duration;
	//console.log(nowtime/alltime);
	scrollline.style.width=(nowtime/alltime)*350+'px';
	var t=setTimeout("timelinecontrol(player)",500);
	}
//点击进度条控制播放
var timelinectl=function(player){
	var timeline=document.getElementById("time-line");
	timeline.onclick=function(event){
		var x=event.clientX;
		var n=this.offsetLeft;
		//console.log(x-n)
		var time=((x-n)/350)*player.duration;
		player.currentTime=time;
		}
	}
//声音控制调节
var voicecontrol=function(player){
	var voiceline=document.getElementById("voice-line");
	var voicescroll=document.getElementById("voice-scroll");
	voiceline.onclick=function(event){
		var x=event.clientX;
		var n=this.offsetLeft;
		player.volume=(x-n)/60;
		voicescroll.style.width=(x-n)+'px';
		}
	}
//歌词显示部分
var lrcshow=function(player){
	var lrcpart=document.getElementById("lrcpart");
	var str= window.location.href;
	str=str.replace('index.html','');
	var songname=player.src.replace(str+'songs/','').replace('.mp3','');
	//console.log(songname);
	//var lyric1="justtext";
	var xhr=new XMLHttpRequest();
	xhr.open('GET', 'lrcs/'+songname+'.lrc', true);
    xhr.send();
	//alert(xhr.readyState)
	//alert(xhr.status)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status ==200) {
            var lyric1=xhr.responseText;
		    setlyric(lyric1,player);
                //lrcpart.innerHTML=xhr.responseText;
            }
	    if (xhr.readyState == 4 && xhr.status ==404) {
             var lyric1=xhr.responseText;
		     setlyric(lyric1,player);
             //lrcpart.innerHTML=xhr.responseText;
            }
        }
	//console.log(xhr.responseText)
	//alert(xhr.responseText)
	//var lyric=xhr.responseText;
	//lrcpart.innerHTML=xhr.responseText;
	//setlyric(lyric1,player);
	//var n=setTimeout("lrcshow(player)",1000);
	}
//处理歌词函数
var setlyric=function(lyric1,player){
	var lrcpart=document.getElementById("lrcpart");
	var ul=document.getElementById('lrc-ul');
	var childnum=ul.childNodes.length;
	for(y=0;y<childnum;y++){
		ul.removeChild(ul.childNodes[0]);
		}
	var lyric = lyric1.split('\n'); //先按行分割
    var _l = lyric.length; //获取歌词行数
    var lrc = new Array(); //新建一个数组存放最后结果
    for(i=0;i<_l;i++) {
       var d = lyric[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g);  //正则匹配播放时间
       var t = lyric[i].split(d); //以时间为分割点分割每行歌词，数组最后一个为歌词正文
       if(d != null) { //过滤掉空行等非歌词正文部分
          //换算时间,以秒计
          var dt = String(d).split(':'); 
          var _t = Math.round(parseInt(dt[0].split('[')[1])*60+parseFloat(dt[1].split(']')[0])); 
          lrc.push([_t, t[1]]);
		  //console.log(_t)
		  //console.log(player.currentTime)
                      }
      }
	for(j=0;j<lrc.length;j++){
		var li=document.createElement('li');
		li.innerHTML=lrc[j][1];
		li.setAttribute('class','t'+lrc[j][0])
		ul.appendChild(li);
		}
	textlrc=lrc;
	console.log(lrc)
	var myScroll = setInterval("scrolllrc(textlrc,player)",1000);
	//var t=setTimeout("setlyric(lyric1,player)",1000);
	}
	
	
//定义歌词滚动函数
var scrolllrc=function(lrc,player){
	var ul=document.getElementById('lrc-ul');
	var lrcpart1=document.getElementById("lrcpart");
	//console.log(ul)
	for(i=0;i<lrc.length;i++){
		    var currenttime=Math.round(player.currentTime);
			if(currenttime==lrc[i][0]){
				var nowli=ul.getElementsByClassName('t'+lrc[i][0])[0];
				nowli.style.color='#00FFFF';
				lrcpart1.scrollTop+=25;
				console.log(lrcpart1.scrollTop);
				for(y=0;y<lrc.length;y++){
					if(currenttime!=lrc[y][0]){
						var oldli=ul.getElementsByClassName('t'+lrc[y][0])[0];
				        oldli.style.color='white';
						}
					}
				}
			
			}
	}
		
//定义歌曲封面变化函数
var changeimage=function(player){
	var str= window.location.href;
	str=str.replace('index.html','');
	var songname=player.src.replace(str+'songs/','').replace('.mp3','');
	var image=document.getElementById("albumimage");
	//alert(songname)
	image.src='images/'+songname+'.jpg';
	}
//定义播放列表显示
var playlist=function(songs){
	var playlistul=document.getElementById("play-list").getElementsByTagName('ul')[0];
	for(i=0;i<songs.length;i++){
		var singer=songs[i].split('-')[0];
		var song=songs[i].split('-')[1];
		var li=document.createElement('li');
		li.innerHTML='歌手：'+singer+'------'+'歌曲：'+song;
		playlistul.appendChild(li);
		}
	}