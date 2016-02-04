$(function(){
    var $man = $('img[alt=man]');

    $("#up").click(function(){
        var upBoxNo = $man.index('img') - 8;
        var upupBoxNo = $man.index('img') - 16;
        if ($("img:eq("+upBoxNo+")").attr("src")=="Pictures/Game1/inner.png")
        {
            $("img:eq("+upBoxNo+")").attr("src","Pictures/Game1/man.png");
            $man.attr('src', 'Pictures/Game1/inner.png');
            $man = $("img:eq("+upBoxNo+")");
        }
        else if ($("img:eq("+upBoxNo+")").attr("src")=="Pictures/Game1/inside.png")
        {
            $("img:eq("+upBoxNo+")").attr("src","Pictures/Game1/man.png");
            $man.attr('src', 'Pictures/Game1/inside.png');
            $man = $("img:eq("+upBoxNo+")");
        }
        else if (($("img:eq("+upBoxNo+")").attr("src")=="Pictures/Game1/boxs.png")&&($("img:eq("+upupBoxNo+")").attr("src")=="Pictures/Game1/inner.png"))
        {
            $("img:eq("+upBoxNo+")").attr("src","Pictures/Game1/man.png");
            $("img:eq("+upupBoxNo+")").attr("src","Pictures/Game1/boxs.png");
            $man.attr('src', 'Pictures/Game1/inner.png');
            $man = $("img:eq("+upBoxNo+")");
        }
        else if (($("img:eq("+upBoxNo+")").attr("src")=="Pictures/Game1/boxs.png")&&($("img:eq("+upupBoxNo+")").attr("src")=="Pictures/Game1/inside.png"))
        {
            $("img:eq("+upBoxNo+")").attr("src","Pictures/Game1/man.png")
            $("img:eq("+upupBoxNo+")").attr("src","Pictures/Game1/boxs.png")
            $man.attr('src', 'Pictures/Game1/inner.png');
            $man = $("img:eq("+upBoxNo+")");
            alert("You Win!");
        }
    });

        $("#down").click(function(){
        var downBoxNo = $man.index('img') + 8;
        var downdownBoxNo = $man.index('img') + 16;
        if ($("img:eq("+downBoxNo+")").attr("src")=="Pictures/Game1/inner.png")
        {
            $("img:eq("+downBoxNo+")").attr("src","Pictures/Game1/man.png");
            $man.attr('src', 'Pictures/Game1/inner.png');
            $man = $("img:eq("+downBoxNo+")");
        }
        else if ($("img:eq("+downBoxNo+")").attr("src")=="Pictures/Game1/inside.png")
        {
            $("img:eq("+downBoxNo+")").attr("src","Pictures/Game1/man.png");
            $man.attr('src', 'Pictures/Game1/inside.png');
            $man = $("img:eq("+downBoxNo+")");
        }
        else if (($("img:eq("+downBoxNo+")").attr("src")=="Pictures/Game1/boxs.png")&&($("img:eq("+downdownBoxNo+")").attr("src")=="Pictures/Game1/inner.png"))
        {
            $("img:eq("+downBoxNo+")").attr("src","Pictures/Game1/man.png");
            $("img:eq("+downdownBoxNo+")").attr("src","Pictures/Game1/boxs.png");
            $man.attr('src', 'Pictures/Game1/inner.png');
            $man = $("img:eq("+downBoxNo+")");
        }
        else if (($("img:eq("+downBoxNo+")").attr("src")=="Pictures/Game1/boxs.png")&&($("img:eq("+downdownBoxNo+")").attr("src")=="Pictures/Game1/inside.png"))
        {
            $("img:eq("+downBoxNo+")").attr("src","Pictures/Game1/man.png");
            $("img:eq("+downdownBoxNo+")").attr("src","Pictures/Game1/boxs.png");
            $man.attr('src', 'Pictures/Game1/inner.png');
            $man = $("img:eq("+downBoxNo+")");
            alert("You Win!");
        }
    });
    
    $("#left").click(function(){
        var leftBoxNo = $man.index('img') - 1;
        var leftleftBoxNo = $man.index('img') - 2;
        if ($("img:eq("+leftBoxNo+")").attr("src")=="Pictures/Game1/inner.png")
        {
            $("img:eq("+leftBoxNo+")").attr("src","Pictures/Game1/man.png");
            $man.attr('src', 'Pictures/Game1/inner.png');
            $man = $("img:eq("+leftBoxNo+")");
        }
        else if ($("img:eq("+leftBoxNo+")").attr("src")=="Pictures/Game1/inside.png")
        {
            $("img:eq("+leftBoxNo+")").attr("src","Pictures/Game1/man.png");
            $man.attr('src', 'Pictures/Game1/inside.png');
            $man = $("img:eq("+leftBoxNo+")");
        }
        else if (($("img:eq("+leftBoxNo+")").attr("src")=="Pictures/Game1/boxs.png")&&($("img:eq("+leftleftBoxNo+")").attr("src")=="Pictures/Game1/inner.png"))
        {
            $("img:eq("+leftBoxNo+")").attr("src","Pictures/Game1/man.png");
            $("img:eq("+leftleftBoxNo+")").attr("src","Pictures/Game1/boxs.png");
            $man.attr('src', 'Pictures/Game1/inner.png');
            $man = $("img:eq("+leftBoxNo+")");
        }
        else if (($("img:eq("+leftBoxNo+")").attr("src")=="Pictures/Game1/boxs.png")&&($("img:eq("+leftleftBoxNo+")").attr("src")=="Pictures/Game1/inside.png"))
        {
            $("img:eq("+leftBoxNo+")").attr("src","Pictures/Game1/man.png")
            $("img:eq("+leftleftBoxNo+")").attr("src","Pictures/Game1/boxs.png")
            $man.attr('src', 'Pictures/Game1/inner.png');
            $man = $("img:eq("+leftBoxNo+")");
            alert("You Win!");
        }
    });

    $("#right").click(function(){
        var rightBoxNo = $man.index('img') + 1;
        var rightrightBoxNo = $man.index('img') + 2;
        if ($("img:eq("+rightBoxNo+")").attr("src")=="Pictures/Game1/inner.png")
        {
            $("img:eq("+rightBoxNo+")").attr("src","Pictures/Game1/man.png");
            $man.attr('src', 'Pictures/Game1/inner.png');
            $man = $("img:eq("+rightBoxNo+")");
        }
        else if ($("img:eq("+rightBoxNo+")").attr("src")=="Pictures/Game1/inside.png")
        {
            $("img:eq("+rightBoxNo+")").attr("src","Pictures/Game1/man.png");
            $man.attr('src', 'Pictures/Game1/inside.png');
            $man = $("img:eq("+rightBoxNo+")");
        }
        else if (($("img:eq("+rightBoxNo+")").attr("src")=="Pictures/Game1/boxs.png")&&($("img:eq("+rightrightBoxNo+")").attr("src")=="Pictures/Game1/inner.png"))
        {
            $("img:eq("+rightBoxNo+")").attr("src","Pictures/Game1/man.png");
            $("img:eq("+rightrightBoxNo+")").attr("src","Pictures/Game1/boxs.png");
            $man.attr('src', 'Pictures/Game1/inner.png');
            $man = $("img:eq("+rightBoxNo+")");
        }
        else if (($("img:eq("+rightBoxNo+")").attr("src")=="Pictures/Game1/boxs.png")&&($("img:eq("+rightrightBoxNo+")").attr("src")=="Pictures/Game1/inside.png"))
        {
            alert("Ok!");
            $("img:eq("+rightBoxNo+")").attr("src","Pictures/Game1/man.png")
            $("img:eq("+rightrightBoxNo+")").attr("src","Pictures/Game1/boxs.png")
            $man.attr('src', 'Pictures/Game1/inner.png');
            $man = $("img:eq("+rightBoxNo+")");
            alert("You Win!");
        }
    });
})