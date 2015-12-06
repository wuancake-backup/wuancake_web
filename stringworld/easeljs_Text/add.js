/**
 * Created by zj on 15-11-30.
 */

var canvas,
	stage,
	text,
	rect,
	count=0;
canvas=document.getElementById('gameView');
stage=new createjs.Stage(canvas);

var gameView=new createjs.Container();
stage.addChild(gameView);

gameView.x=100;
gameView.y=100;
text=new createjs.Text('jsdvbsdv','20px Arial','#fff');
text.rotation=10;
gameView.addChild(text);

rect=new createjs.Shape();
rect.rotation=text.rotation;
gameView.addChildAt(rect,0);		//添加子元素

createjs.Ticker.setFPS(10);
createjs.Ticker.addEventListener('tick',handlerTick);

function handlerTick(e){
	count++;
	text.text='sjvbsjbvdjksdbvjdvbsj'+count+'!!!';
	rect.graphics.clear().beginFill('#f00').drawRect(-10,-10,text.getMeasuredWidth()+20,50);
	stage.update(e);
}








