/*
     1 排序的每一步结束后，我们让程序暂停一下运行（javascript没有sleep函数，我们需要自己去实现它），这样子的话，在我们看来排序的过程就是一步一步的进行的，就不会一瞬间就排序结束了。

     2 我们可以通过维护一个数组，把每一次排序之后的数组保存起来，在排序算法结束之后，我们再把保存的每一个数组依次绘制出来。我这里的实现用的就是这种方法。
*/

 /*简化选择器*/

 function $(ele) {
     return document.querySelector(ele);
 }
 var queue = [];
 var snapshots = []; //快照集合
 var timer = null; //定时
 var colors = ["#441d49", "#538289", "#a02730", "#73832a", "#005db1", "#10193a"];
 var interval = $("#speed").value;

 $(".chart").addEventListener("click", function(e) {
     var node = e.target;
     if (node && node.className.toLowerCase() === "bar") {
         var index = [].indexOf.call(node.parentNode.childNodes, node);
         queue.splice(index, 1);
         node.parentNode.removeChild(node);
     }
 });

 init();

 function init() {
     initData(40);
     render();
 }

 $("#sort").onclick = function() {
     if (queue.length == 0) return alert("队列为空");
     queue.bubbleSort();
     timer = setInterval(paint, interval); //定时绘制
     function paint() {
         var snapshot = snapshots.shift() || [];
         if (snapshot.length !== 0) {
             render(snapshot);
         } else {
             clearInterval(timer); //绘制结束
             return;
         }
     }
 }

 $("#left-in").onclick = function() {
     try {
         queue.unshift(getInputValue());
     } catch (e) {
         alert(e.message);
     }
     render();
 }
 $("#right-in").onclick = function() {
     try {
         queue.push(getInputValue());
     } catch (e) {
         alert(e.message);
     }
     render();
 }
 $("#left-out").onclick = function() {
     if (queue.length === 0) return alert("队列为空");
     queue.shift();
     render();
 }
 $("#right-out").onclick = function() {
     if (queue.length === 0) return alert("队列为空");
     queue.pop();
     render();
 }
 $("#random").onclick = function() {
     initData(40);
     render();
 }

 function bubbleSort(arr) {
     snapshots = [];
     if (arr.length < 1) {
         return arr;
     }
     var temp;
     for (var i = 0; i < arr.length; i++) {
         for (var j = 0; j < arr.length - i - 1; j++) {
             if (arr[j] > arr[j + 1]) {
                 temp = arr[j + 1];
                 arr[j + 1] = arr[j];
                 arr[j] = temp;
                 snapshots.push(JSON.parse(JSON.stringify(arr))); // 记录快照
             }
         }
     }
     return arr;
 }

 Array.prototype.bubbleSort = function() {
         return bubbleSort(this);
     }
     //随机产生60个10~100的数   
 function initData(number) {
     queue = [];
     for (var i = 0; i < number; i++) {
         queue.push(Math.floor(Math.random() * 90 + 10));
     }
 }
 //渲染数组
 function render(arr) {
     var array = arr || queue;
     var content = array.map(function(v) {
         return "<div class='bar' style='height:" + (v * 3) + "px; background-color:" + getColor(v) + "'></div>";
     }).join("");
     $(".chart").innerHTML = content;
 }

 function getInputValue() {
     if (queue.length >= 60) throw new Error("队列长度超过60");
     var value = $("#number").value.trim();
     if (!isNumber(value)) throw new Error('输入值无效');
     value = parseInt(value);
     if (value < 10 || value > 100) throw new Error('输入值越界');
     return value;
 }
 //验证输入是否为数字
 function isNumber(n) {
     return !isNaN(parseFloat(n)) && isFinite(n);
 }

 //根据值的大小选择颜色
 function getColor(value) {
     if (!isNumber(value)) {
         return;
     }
     if (value < 60) {
         return colors[0];
     } else if (value >= 60 && value < 70) {
         return colors[1];
     } else if (value >= 70 && value < 80) {
         return colors[2];
     } else if (value >= 80 && value < 90) {
         return colors[3];
     } else if (value >= 90 && value < 100) {
         return colors[4];
     } else if (value === 100) {
         return colors[5];
     }
 }