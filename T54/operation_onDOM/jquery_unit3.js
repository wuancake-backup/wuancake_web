$(function(){
    var $li = $("ul li:eq(1)");
    var li_txt = $li.text();
    alert(li_txt);          //获取节点
    var $li_1 = $("<li title='IBM'>IBM</li>");  //title如果要使用单引号就都使用单引号，如果使用双引号就都是双引号！
    var $li_2 = $("<li title='德州仪器'>德州仪器</li>");
    $("ul").append($li_1);
    $li_2.prependTo("ul");
    var p_html = $("p").html();
    alert(p_html);
    $("p").html("<strong>which company do you like best?</strong>");
    p_html = $("p").text();
    alert(p_html);
    $("ul li").click(function(){
        $(this).clone(true).appendTo("ul");
        $(this).wrap("<strong></strong>");
        $(this).addClass("test");
        var $valueofTitle = $(this);
        var p_txt = $valueofTitle.attr("title");  //attr()修改设置属性
        alert(p_txt);
        $(this).removeClass("test");
    });
});