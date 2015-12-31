$(function(){
    $("#change").click(function(){
        if($(".music")[0].paused){
            $(".music")[0].play();
            document.getElementById("change").src="stop.PNG";
        }
        else{
            $(".music")[0].pause();
            document.getElementById("change").src="begin.PNG";
        }
    });
    $("#next").click(function(){

    })
    var progress = function() {
    var currentTime = Math.floor($(".music")[0].currentTime); //获取播放时间（秒为单位），如何转换为分钟我就不多说了，自己百度，或者去我演示地址拔。
    var currentTimeMin = Math.floor(currentTime/60);
    var currentTimeSecond = currentTime%60;
    if(currentTimeMin<10){
        currentTimeMin = "0"+currentTimeMin;
    }
    if(currentTimeSecond<10){
        currentTimeSecond = "0"+currentTimeSecond;
    }
    $("#nowHidden").html(currentTime);
    $("#current").html(currentTimeMin+":"+currentTimeSecond);
}
    //总时间
    var time = function() {
    var song = Math.floor($(".music")[0].duration); //获取歌曲时间
    var songMin = Math.floor(song/60);
    var songSecond = song%60;
    if(songMin<10){
        songMin = "0"+songMin;
    }
    if(songSecond<10){
        songSecond = "0"+songSecond;
    }
    $("#totalHidden").html(song);
    $("#duration").html(songMin+":"+songSecond);   
}
    $(".music")[0].addEventListener("loadedmetadata",time);
    $(".music")[0].addEventListener("timeupdate",progress);
    var now = function(){
        var progressNow = $("#nowHidden").html()/$("#totalHidden").html();
        //为什么必须用html()才能使进度条获取实时进度？直接用时间对应的数字相除就不行，看来得看看添加监视的部分。
        document.getElementById("progressNow").value=progressNow*($("#progressNow").attr("max"));
    }
    $(".music")[0].addEventListener("timeupdate",now);
})