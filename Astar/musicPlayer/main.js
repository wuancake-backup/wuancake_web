var isplay=false;
//var islike=true;//觉得应该给每首歌做一个object this.islike
var songs=[];
var index=0;
var num=0;
var islyric=true;


/**设置进度条**/
function drawprocess(val)
{
	var music=document.getElementById("val");
	var w=val*344;
	music.innerHTML='<div id="val1" style=" width:'+w+'px;height:4px;background-color:blue;"></div>';
}


//显示播放时间
function showCurrentTime(time)
{
	var minutes=parseInt(time/60);
	var musicplay=document.getElementById("play");
	var seconds=parseInt(time)-minutes*60;
	if(minutes<10)
	{
		minutes='0'+minutes;
	}
	if (seconds<10) {seconds='0'+seconds;}
		var sc=minutes+':'+seconds;
	$('#currenttime').html(String(sc));
}


//设置音量
function drawVol(v)
{
	var vol=document.getElementById("volAll");
	var w=v*60;
	var musicplay=document.getElementById("play");
	musicplay.volume=v;
	vol.innerHTML='<div id="volCurrent" style=" width:'+w+'px;height:6px;background-color:blue;"></div>';
}

$('#volAll').click(function(e){
	var CurrentProgress = e.offsetX;
    var vol=document.getElementById("play");
    vol.volume=CurrentProgress/60*1;
    $("#volCurrent").css("width",CurrentProgress);
});



/*********************************************************初始化***********************************************************************/
document.body.onload=init;
function init()
{
	//把数据库id弄进来
	$.ajax(	    			{
	type:'GET',
	url:"init.php",
	success:function(data){
		data = JSON.parse(data);
		num=data.length;
		for(var i=0;i<num;i++)
		{
			var a=data[i];
			songs[i]=new songObj();
			songs[i].init(a['name'],a['image_id'],a['singer'],a['album'],a['lyr'],a['id'],a['tag'],a['islike']);
		}
		songs[index].update();
		showLyric();
		drawVol(0.5);
		}
}
			);
	//更新
}

/*************************************************播放列表增加新歌****************************************/
function creatLocal(arr)
{
	var flag=0;
	var a=arr;
	a=a.split(",");
	//console.log(arr);
	for(var i=0;i<num;i++)
	{
		if(songs[i].id==a[0])
		{
			index=i;
			 islyric=false;
		     var html=document.getElementById("lyric_button");
		     html.style.color="#ffffff";
		     songs[index].update();
		     isplay=true;
		     var player=document.getElementById("play");
		      player.play();
		      html='<img src="src\\begin-icon.png" style="width:40px;height:40px;">';
		      $('#pauseb').html(String(html));
			flag=1;
			break;
		}
	}
	if(flag==0)
	{
       $.ajax({
		type: 'POST',
		url: 'creat.php',
		data: {arr},
		success: function(msg){
			//alert(msg);
		//	console.log(arr);
				arr=arr.split(",");
				//console.log(arr[5]);
		      	songs[num]=new songObj();
		      	songs[num].init(arr[1],arr[4],arr[3],arr[5],"无歌词",arr[0],arr[6],0);
		      	index=num;
		      	num++;
		      	 islyric=false;
		     	var html=document.getElementById("lyric_button");
		      	html.style.color="#ffffff";
		      	songs[index].update();
		      	isplay=true;
		      	var player=document.getElementById("play");
		      	player.play();
		      	html='<img src="src\\begin-icon.png" style="width:40px;height:40px;">';
		      	$('#pauseb').html(String(html));
			},
		error:function(msg){
		// 提交失败
		alert("查询失败！请刷新网页");
			}
		});
   }
     // showLyric();
	//songs[index].
}

/************************************************歌词问题*************************************************/
function changeLyric()
{
	if (islyric==true)
	{
		islyric=false;
	}
	else
	{
		islyric=true;
	}
	showLyric();
}


var lyr=new Array();

function showLyric()
{
	lyr.splice(0,lyr.length);
	var html=document.getElementById("lyric_button");
	if(islyric==true)
	{
		html.style.color="black";
		$('#lyric').html(String(songs[index].lyr));
		var id=songs[index].id,
   		txt = `http://music.qq.com/miniportal/static/lyric/${id%100}/${id}.xml`;
   		 $.ajax({
   		 	type:"post",
   		 	url:"lyric.php",
   		 	datatype:"xml",
   		 	data:{txt},
   		 	success:function(data){
   		 		//console.log(data);
   		 		try
   		 		{
   		 			var xmlDoc = null;
	   		 		try //Internet Explorer
	   		 		{
	   		 			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	   		 			xmlDoc.async="false";
	   		 			xmlDoc.loadXML(data);
	   		 		}
	   		 		catch(e)
	   		 		{
	   		 			try //Firefox, Mozilla, Opera, etc.
	   		 			{
	   		 				parser=new DOMParser();
	   		 				xmlDoc=parser.parseFromString(data,"text/xml");
	   		 			}
	   		 			catch(e) {}
	   		 		}
	   		 		var a=xmlDoc.getElementsByTagName('lyric')[0].childNodes[0].nodeValue;
	   		 		//console.log(a);
	   		 		b=a.split("\n");
	   		 		//console.log(b);
	   		 		//$("#lyric").html(b);
	   		 		//console.log(b[5]);//从b[5]开始
	   		 		//$("#lyric").html(a);
	   		 		$('#lyric').html("");
	   		 		var len=b.length;
	   		 		for(var i=5;i<len;i++)
	   		 		{
	   		 			 var d = b[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g);//数组
	   		 		//	console.log(d[0]);//d[1]为数组长度
	   		 			 if(d)//去掉空行
	   		 			 {
		   		 			 var e =b[i].replace(d[0],"");
		   		 			 
		   		 			 //console.log(e);
		   		 			 //d[0]为时间，e为歌词
		   		 			 //接下来处理时间
		   		 			 //分割法
		   		 			 var t=d[0].split(":");
		   		 			 var min=t[0].replace("[","");
		   		 			 //console.log(min);
		   		 			 var sec=t[1].replace("]","");
		   		 			// console.log(sec);
		   		 			t=parseInt(min*60)+parseFloat(sec);
		   		 			if(e!="")
		   		 			{
		   		 				lyr.push([t,e]);
		   		 				//console.log("我不是王菲");
		   		 			}
		   		 			else
		   		 			{
		   		 				//console.log("我是王菲");
		   		 			}
	   		 			}
	   		 		}
	   		 		//console.log(lyr);
	   		 		var music=document.getElementById("play");
		   		 		music.addEventListener('timeupdate',lyricListener,false);
			}
			catch(e)
			{
				$('#lyric').html("无歌词");
			}
               
   		 	}

   		});
	}
	else
	{
		html.style.color="#ffffff";
		var a="";
		$('#lyric').html(String(a));
		var music=document.getElementById("play");
		music.removeEventListener("timeupdate",lyricListener,false);
	}
}
function lyricListener()
{
$('#lyric').html("");
var music=document.getElementById("play");
	for(var i=0;i<lyr.length;i++)
	{
		if(music.currentTime<lyr[i][0]&&i>=1)
		{
				//console.log(lyr[i][0]);
				if(i>=8)
				{
					for(var j=8;j>1;j--)
					{
							var html=lyr[i-j][1]+'<br>';
							if(j==8)
							{
								$('#lyric').html(html);
							}
							else
							{
								$('#lyric').append(html);
							}
					}
				}
				else//i<6
				{

					for(var j=0;j<i-1;j++)
					{
							var html=lyr[j][1]+'<br>';
							if(j==0)
							{
								$('#lyric').html(html);
							}
							else
							{
								$('#lyric').append(html);
							}
					}
				}
				var html='<span style="color:red;">'+lyr[i-1][1]+'<br></span>';
					$('#lyric').append(html);
						for(j=i;j<lyr.length;j++)
						{
							var html=lyr[j][1]+'<br>';
							$('#lyric').append(html);
						}
						break;
		}
}
try{
	if(i==lyr.length)
	{
		for(var j=8;j>1;j--)
		{
			var html=lyr[i-j][1]+'<br>';
			if(j==8)
			{
				$('#lyric').html(html);
			}
			else
			{
				$('#lyric').append(html);
			}
		}
		var html='<span style="color:red;">'+lyr[lyr.length-1][1]+'<br></span>';
		$('#lyric').append(html);
	 }
	 }
	 catch(e){}	
}

 /********************************************音频进度条事件***********************************************/
                $("#val").click(function (e) {
                    //----播放进度条的基准参数
                    var CurrentProgress = e.offsetX;
                    /*var CurrentProgress = Progress.left;*/
               		var time=document.getElementById("play");
               		time.currentTime=CurrentProgress/344*time.duration;
                    $("#val1").css("width",CurrentProgress);
                });
                

/***************************************************四个控制按钮********************************************/

//播放下一首，（index++）%num
//如果处于暂停状态按了下一首，状态也要改变了
function next()
	{
		if(num==0)
		{
			alert("后台没有歌曲！");
			return;
		}
		else
		{
			index+=1;
			index%=num;
			isplay=true;
			//改照片，改歌词，改简介，改div-music
			songs[index].update();
			showLyric();
			var player=document.getElementById("play");
      		player.play();
      		var html='<img src="src\\begin-icon.png" style="width:40px;height:40px;">';
       		$('#pauseb').html(String(html));
		}
		//showLyric();
		//console.log("from next");
	}

//暂停
$('#pauseb').click(function(){
   //添加音乐标签
       //var audios = document.createElement('audio');
       //添加音乐地址
      // audios.src = '特曼,满汉全席 - 每天回家都会看到我女儿在装死.mp3';
       //插入音乐标签
       //如果是暂停图就变成开始图
       //反之变为暂停图
       if (num!=0) 
       {
       if(isplay==false)//暂停状态变开始状态
       {
       /*	var html='<audio src="特曼,满汉全席 - 每天回家都会看到我女儿在装死.mp3" id="play" controls="controls"></audio>';
       	$('#music').html(String(html));*/
       	var html='<img src="src\\begin-icon.png" style="width:40px;height:40px;">';
       	$('#pauseb').html(String(html));
      	var player=document.getElementById("play");
      	player.play();
      	isplay=true;
       }
       else
       {
       	var html='<img src="src\\pause-icon.png" style="width:15px;height:15px;">';
       	$('#pauseb').html(String(html));
       	var player=document.getElementById("play");
      	player.pause();
      	isplay=false;
       }
   }
   });


//喜欢
$('#heartb').click(function(){
	songs[index].changeHeart();
});


//删除
$('#trashbinb').click(function(){

	//从数组中去掉
	//index++
	//num--
	var arr=songs[index].id;
	songs.splice(index,1);
	num--;
	isplay=false;
	var player=document.getElementById("play");		
	player.pause();
	var html='<img src="src\\pause-icon.png" style="width:15px;height:15px;">';
    $('#pauseb').html(String(html));
	if(num==0)
	{
			//应该把所有东西归零
			var html='<span style="margin-left:10px;">没有音乐可播放</spab>';
			$('#music').html(String(html));
	}
		else
		{
			index%=num;
			//改照片，改歌词，改简介，改div-music
			songs[index].update();
			showLyric();
		}
	$.ajax({
		type:'GET',
		url:"delete.php",
		data:{arr},
		success:function(data)
		{
		}
	});
	}

);
