//原生js实现，学到了
$ = function(el) {return document.querySelector(el);};

var data = [];
//渲染结果
function render() {
	$('.shower').innerHTML = data.map(function(p) {
		return "<div>" + p +"</div>";
	}).join(' ');
}

//获取输入框数字并检验
function getValue() {
	var number = $('#number').value;
	if(!number.match(new RegExp('^[0-9]*$'))) {
		throw new Error('input valid!');
	}
	return parseInt(number);
}

function process(command) {
	try {
		switch(command) {
			case "leftInsert":
				var num = getValue();
				data.unshift(num);
				break;
			case "rightInsert":
				var num = getValue();
				data.push(num);
				break;
			case "leftOuter":
				if(data.length != 0) {
					alert(data.shift());
				}
				break;
			case "rightOuter":
				if(data.length != 0) {
					alert(data.pop());
				}
				break;	
		}
	}
	catch(e) {
		alert(e.message);
	}
	
	//重新渲染
	render();
}



//初始化。绑定事件之类的
function init() {
	
	document.addEventListener('DOMContentLoaded', function() {
		document.getElementsByClassName('controller')[0].addEventListener('click', function(event){
			if(event.target.type == 'button') {
				process(event.target.name);
			}
		});
	});

}

//test
init();