$(function(){
    $("#ibutton").bind("click",function(){
        var whatyouwantsay = prompt("input what tank do you like best?","you want to say....");
        $("#context").append("<p>"+whatyouwantsay+"</p>");
        //$("#ibutton").unbind("click");
        //$("#context").append("<p>whatyouwantsay</p>");
    });
    $("#ibutton").trigger('click');
    $("#offibutton").mouseover(function(e){
        var x=10;
        var y=20;
        this.mytitle = this.title;
        this.title = "" ;
        var tip = "<div id='tip'>click it can shut up everyone,including yourself.</div>";
        $("body").append(tip);
        $("#tip").css({
            "top":(e.pageY+y)+"px",
            "left":(e.pageX+x)+"px"
        }).show("fast");
    }).mouseout(function(){
        this.title=this.mytitle;
        $("#tip").remove();
    });
    $("#offibutton").click(function(){
        $("#ibutton").unbind();
        $("#context").append("<p>shut up!</p>");
        $("#offibutton").unbind("click");
    });

    $("#head").click(function(){
        if($(".content").is(":visible"))
        {
            $(".content").delay(2000).fadeOut("slow");
        }
        else
        {
            $(".content").slideDown(1000);
            $(".imgfloat").show("fast").animate({left:"500px"},30000);
        }
    });
    //animate(params, speed, callback)
    $(".imgfloat").hover(function(){
        $(this).stop().animate({left:"200px"},10000);
    },function(){
        $(this).stop().animate({left:"200px"},10000);
    });
    $(".imgfloat").click(function(){
       if($(this).is(":animated")){
            $(this).stop(false,true);
       }
    });
});