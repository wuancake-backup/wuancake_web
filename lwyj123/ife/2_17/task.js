/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
	var y = dat.getFullYear();
	var m = dat.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = dat.getDate();
	d = d < 10 ? '0' + d : d;
	return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
	var returnData = {};
	var dat = new Date("2016-01-01");
	var datStr = ''
	for (var i = 1; i < 92; i++) {
		datStr = getDateStr(dat);
		returnData[datStr] = Math.ceil(Math.random() * seed);
		dat.setDate(dat.getDate() + 1);
	}
	return returnData;
}

var aqiSourceData = {
	"北京": randomBuildData(500),
	"上海": randomBuildData(300),
	"广州": randomBuildData(200),
	"深圳": randomBuildData(100),
	"成都": randomBuildData(300),
	"西安": randomBuildData(500),
	"福州": randomBuildData(100),
	"厦门": randomBuildData(100),
	"沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}


/**
 * 随机颜色
 */
function RandomColor() {
	return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
}

/**
 * 渲染图表
 */
function renderChart() {
	var chart = "";
	var data = chartData[pageState.nowSelectCity];	//取出数据中城市的数据
	var data2 = data[pageState.nowGraTime];			//取出城市数据中按日期粒度存储的数据
	if(pageState.nowGraTime === "day") {
		data = aqiSourceData[pageState.nowSelectCity];
		for(var item in data) {
			chart += "<div style='height:" + data[item] + ";width: 33%;background-color: #666666;margin:3px ;' title='aqi:"+data[item]+"&#13Time:"+item+"'></div>";
		}
		document.querySelector(".aqi-chart-wrap").innerHTML = chart;
	} 
	else {
		for(var item in data2) {
			chart += "<div style='height:" + data2[item] + ";width: 33%;background-color: #666666;margin: 3px;' title='aqi:"+data2[item]+"&#13Time:"+item+"'></div>";
		}
		document.querySelector(".aqi-chart-wrap").innerHTML = chart;
	}
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(timeS) {
  // 设置对应数据
	pageState.nowGraTime = timeS;
  // 调用图表渲染函数
    renderChart();
  
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(city) {
    // 设置对应数据
	pageState.nowSelectCity = city;
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	document.getElementById('form-gra-time').addEventListener('change', function(event) {
		graTimeChange(event.target.value);
	});
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	selector = document.getElementById('city-select');
	selector.innerHTML = '';
	for(var city in aqiSourceData) {
		selector.innerHTML += '<option>' + city + '</option>';
	}
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	selector.addEventListener('change', function(event) {
		citySelectChange(event.target.value);
	});
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
	// 将原始的源数据处理成图表需要的数据格式
	//规定一星期以星期一开始 2016-01-01为星期五
	for(city in aqiSourceData) {
		chartData[city] = {};
		var week = {};
		var month = {};
		//格式化周数据
		var sum = 0;    //当前周总雨量
		var wDays = 0   //这周算了几天
		var i = 1;		//现在第几周
		for(var eachday in aqiSourceData[city]) {
			sum += aqiSourceData[city][eachday];
			wDays++;
			if(new Date(eachday).getDay() == 0) { //现在加的这天是星期天
				week['2016年第' + i + '周'] = sum / wDays;
				sum = 0;
				wDays = 0;
				i++;
			}
		}
		//最后把未满的做一下处理
		if(sum != 0) {
			week['2016年第' + i + '周'] = sum / wDays;
		}
		
		//格式化月数据
		var i = 1;	//当前月份
		var mDays = 0;
		sum = 0;
		for(var eachday in aqiSourceData[city]) {
			if(new Date(eachday).getMonth() + 1 != i) { //getMonth从0到11
				month['2016年第' + i + '月'] = sum / mDays;
				mDays = 0;
				sum = 0;
				i++;
			}
			sum += aqiSourceData[city][eachday];
			mDays++;
		}
		//同样最后做一个处理
		if(sum != 0) {
			month['2016年第' + i + '月'] = sum / mDays;
		}
		// 处理好的数据存到 chartData 中
		chartData[city]['month'] = month;
		chartData[city]['week'] = week;
	}
}

/**
 * 初始化函数
 */
function init() {
	document.addEventListener('DOMContentLoaded', function() {
		initGraTimeForm()
		initCitySelector();
		initAqiChartData();
	});
}

init();