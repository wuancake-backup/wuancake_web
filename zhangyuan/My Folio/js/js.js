// JavaScript Document
function $(id) {
    return typeof id==='string'?document.getElementById(id):id;
}
window.onload=function(){
    var index=0;
    var timer=null;
    var pic=$("pic").getElementsByTagName("li");
    var num=$("num").getElementsByTagName("li");
    var tag=$("tag");
    var left=$("left");
    var right=$("right");
    //单击左箭头
    left.onclick=function(){
        index--;
        if (index<0) {index=num.length-1};
        changeOption(index);
    }
    //单击右箭头
    right.onclick=function(){
        index++;
        if (index>=num.length) {index=0};
        changeOption(index);
    }
    //鼠标划在窗口上面，停止计时器
    tag.onmouseover=function(){
        clearInterval(timer);
    }
    //鼠标离开窗口，开启计时器
    tag.onmouseout=function(){
        timer=setInterval(run,2000)
    }
    //鼠标划在页签上面，停止计时器，手动切换
    for(var i=0;i<num.length;i++){
        num[i].id=i;
        num[i].onmouseover=function(){
            clearInterval(timer);
            changeOption(this.id);
        }
    }
    //定义计时器
    timer=setInterval(run,2000)
    //封装函数run
    function run(){
        index++;
        if (index>=num.length) {index=0}
        changeOption(index);
    }
    //封装函数changeOption
    function changeOption(curindex){
        console.log(index);
        for(var j=0;j<num.length;j++){
            pic[j].style.display="none";
            num[j].className="";
        }
        pic[curindex].style.display="block";
        num[curindex].className="active";
        index=curindex;
    }
}