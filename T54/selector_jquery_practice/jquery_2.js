$(function(){
var $hideAfter7 = $("li:gt(5)");
$hideAfter7.hide();
var $getButton = $(".showmore #thisButton");
var $valueOfButton = $(".showmore #buttonValue");
/*$getButton.click(function(){
    $hideAfter7.show();
    //$getButton.css("value","精简所有显示");
    $valueOfButton.text("精简所有显示");
    $("ul li a").filter(":contains('东芝'),:contains('华为'),:contains('谷歌'),:contains('IBM')").css("color","red");
});*/
    $getButton.click(function(){
        if($hideAfter7.is(":visible"))
        {
            $hideAfter7.hide();
             $("ul li a").filter(":contains('东芝'),:contains('华为'),:contains('谷歌'),:contains('IBM')").css("color","black");
            $valueOfButton.text("显示所有品牌");
        }
        else
        {
            $hideAfter7.show();
    //$getButton.css("value","精简所有显示");
            $valueOfButton.text("精简所有显示");
            $("ul li a").filter(":contains('东芝'),:contains('华为'),:contains('谷歌'),:contains('IBM')").css("color","red");
        }
    });
});