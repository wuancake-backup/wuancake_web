function Rect(n,color,RectColor,canvasW,canvasH){
	createjs.Shape.call(this);
	this.setRectType=function(type){
		this._RectType=type;
		switch(type){
			case 1:
			this.setColor(color);
			break;
			case 2:
			this.setColor(RectColor);
			break;
		}
	}
	this.setColor=function(colorString){
		this.graphics.beginFill(colorString);
		this.graphics.drawRect(0,0,canvasW/n-5,canvasH/n-5);
		this.graphics.endFill();
	}
	this.getRectType=function(){
		return this._RectType;
	}
	this.setRectType(1);
}
Rect.prototype=new createjs.Shape();