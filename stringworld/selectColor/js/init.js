var canvas=document.getElementById('cas');
var canvasW=canvas.width=600;
var canvasH=canvas.height=600;
var scoredDom=document.getElementById('scored');
var stage=new createjs.Stage('cas');
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);
var gameView=new createjs.Container();
stage.addChild(gameView);

var n=2;	//初始化显示每一行几个
var scored=0;
function addRect(){
	var cl=parseInt(Math.random()*1000000);
	var color='#'+cl;
	var RectColor='#'+(parseInt(Math.random()*1000000));
	var x=parseInt(Math.random()*n);
	var y=parseInt(Math.random()*n);
	for(var indexX=0;indexX<n;indexX++){
		for(var indexY=0;indexY<n;indexY++){
			var rect=new Rect(n,color,RectColor,canvasW,canvasH);
			gameView.addChild(rect);
			rect.x=indexX;
			rect.y=indexY;

			if(rect.x==x && rect.y==y){
				rect.setRectType(2);
			}
			rect.x=indexX*(canvasW/n);
			rect.y=indexY*(canvasH/n);
			if(rect.getRectType()==2){
				rect.addEventListener('click',function(){
					if(n<7){
						// ++n;
					}
					++n;
					scoredDom.innerText='得分：'+ ++scored;
					gameView.removeAllChildren();
					addRect();
				});
			}
		}
	}
}
addRect();

