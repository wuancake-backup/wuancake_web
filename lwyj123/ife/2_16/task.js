/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
//这个函数用来裁剪前后空格
function trimStr(str) {
	return str.replace(/(^\s*)|(\s*$)/g,"");
}

function addAqiData() {
	var cityReg = new RegExp('[^A-Za-z\u4e00-\u9fa5]');
	var city = trimStr(document.getElementById('aqi-city-input').value);
	var airQulity = trimStr(document.getElementById('aqi-value-input').value);
	var error = 0;
	if(city.match(cityReg)) {
		//提示错误信息
		alert('城市名必须为中英文字符');
		error += 1;
	}
	if(airQulity < 0 || airQulity > 5000) {
		alert('大清药丸');
		error += 2;
	}
	if(error == 0) {
		aqiData[city] = airQulity;
	}
	
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	/*
	var table = document.getElementById('aqi-table');
	table.innerHTML = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	for(var item in aqiData) {

		table.innerHTML += "<tr><td>" + item + "</td><td>" + aqiData[item] + "</td><td><button data-city='" + item + "'>删除</button></td>";		
	}
	*/
	    var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
        items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>"
    }
    document.getElementById("aqi-table").innerHTML = city ? items : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
	// do sth.
	delete aqiData[city];
	renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  
	document.addEventListener('DOMContentLoaded', function() {
		document.getElementById('add-btn').addEventListener('click', addBtnHandle)
		document.getElementById('aqi-table').addEventListener('click', function(event) {
			if(event.target.nodeName.toLowerCase() == 'button') {
				delBtnHandle(event.target.dataset.city);
			}
		})
	})

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
      // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数


}

init();