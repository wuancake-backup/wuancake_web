function playli(){
var cc=$("#play").attr("cc");
var pa=document.getElementById("actor");
if(cc==0){ 
	pa.pause();
	$("#play").attr("cc","1");
	$("#play").css("background-position","-323px 2px");   
}
else{
	pa.play();
	$("#play").attr("cc","0");
	$("#play").css("background-position","-442px 2px");   
}
}
