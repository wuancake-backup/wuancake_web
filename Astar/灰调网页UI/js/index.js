var num;
var index;
window.onload=init;
function init()
{
	num=5;
	index=0;
}
function nextPic()
{
	//do something to change the pic
	index++;
	changeFlower();
}
function changeFlower()
{
	index=index%5;
	var html='<img src="images/'+index+'.png" width="618px" height="301px">';
	$('#flower').html(String(html));
	//小圆点改变第index
	var list = $('#point li');
	console.log(list)
    list.removeClass('selected');
    list[index].className+='selected';
}
function prePic()
{
	index--;
	if(index==-1)
		index=4;
	changeFlower();

}