$(function(){
	var x = 10;
	var y = 20;
   $("a.tooltip").mouseover(function(e){
		this.myTitle = this.title;
		this.title="";
		var imgTitle = this.myTitle?"<br/>"+this.myTitle:"";
		var tooltip = "<div id='tooltip'><img src='"+ this.href +"' alt='商品预览图'/>"+"</div>"; //注意引号的位置，一不留神就出错
		$("body").append(tooltip);
		$("#tooltip").css({
			"left":(e.pageX+x) + "px",
			"ltop":(e.pageY+y) + "px"
		}).show("fast");
   }).mouseout(function(){
	   this.title = this.myTitle;
	   $("#tooltip").remove();
   }).mousemove(function(e){
	   $("#tooltip").css({
			"left":(e.pageX+x) + "px",
			"top":(e.pageY+y) + "px"
		});
   });
});
/*$(function(){
	var x = 10;
	var y = 20;
	$("a.tooltip").mouseover(function(e){
		this.myTitle = this.title;
		this.title = "";	
		var imgTitle = this.myTitle? "<br/>" + this.myTitle : "";
		var tooltip = "<div id='tooltip'><img src='"+ this.href +"' alt='产品预览图'/>"+imgTitle+"<\/div>"; //创建 div 元素
		$("body").append(tooltip);	//把它追加到文档中						 
		$("#tooltip")
			.css({
				"top": (e.pageY+y) + "px",
				"left":  (e.pageX+x)  + "px"
			}).show("fast");	  //设置x坐标和y坐标，并且显示
    }).mouseout(function(){
		this.title = this.myTitle;	
		$("#tooltip").remove();	 //移除 
    }).mousemove(function(e){
		$("#tooltip")
			.css({
				"top": (e.pageY+y) + "px",
				"left":  (e.pageX+x)  + "px"
			});
	});
})*/