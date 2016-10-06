var musiclist=["常慧伦 - 莫名我就喜欢你","刘瑞琦 - 乌克丽丽","四季 音色 - 夏夜"];
var i=0;
function next () {
	alert("mucis"+i+"list");
	var a = document.getElementById("player")
	a.src = "mp3/"+musiclist[i]+".mp3";
	a.load();
	a.play();
	alert(a.src);
	i=i+1;
	if (i >= musiclist.length) {
		i=0;
	}
}
var a = document.createElement("audio");
a.setAttribute("src","mp3/刘瑞琦 - 乌克丽丽.mp3");
a.setAttribute("controls","controls");