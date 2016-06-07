function $(ele) {
    return document.querySelector(ele);
}

var array = [];
var interval = $('#speed').value;


Array.prototype.bubbleSort = function() {
    return bubbleSort(this);
};
function initData(num) {
    array = [];
    for (var i = 0; i < num; i++) {
        array.push(Math.floor(Math.random() * 90 + 10));
    }
}

function bubbleSort(arr) {

}

function bindingButton () {
    //也曾想过直接在冒泡里直接渲染，但这样就会有时间浪费的问题，而这样写会有空间浪费的问题。
    //如果不使用快照会使得排序时数组不可用。
    $("#sort").onclick = function() {
        if (array.length == 0) return alert("队列为空");
        array.bubbleSort();
        timer = setInterval(paint, interval); //定时绘制
        function paint() {
            var snapshot = snapshots.shift() || [];
            if (snapshot.length === 0) {
                clearInterval(timer); //绘制结束
            } else {
                render(snapshot);
            }
        }
    };
    $('#left-in').addEventListener('onclick', function() {
        try {
            array.unshift(getInputValue());
        }
        catch(e) {
            alert(e.message);
        }
        render();
    });
    $('#right-in').addEventListener('onclick', function() {
        try {
            array.push(getInputValue());
        }
        catch(e) {
            alert(e.message);
        }
        render();
    });
    $('#left-out').addEventListener('onclick', function() {
        if (array.length === 0) return alert("队列为空");
        array.shift();
        render();
    });
    $('#right-out').addEventListener('onclick', function() {
        if (array.length === 0) return alert("队列为空");
        array.pop();
        render();
    });
    $('#random').addEventListener('onclick', function() {
        initData(40);
        render();
    });
}



function render(arr) {
    var array = arr || queue;
    var content = array.map(function(v) {
        return "<div class='bar' style='height:" + (v * 3) + "px;'></div>";
    }).join("");
    $(".chart").innerHTML = content;
}


function getInputValue() {
    if(array.length >= 60) {
        throw new Error('数组太多越界了');
    }
    var num = $('#number').value;
    if(isNaN(num)) {
        throw new Error('not number');
    }
    num = parseInt(num);
    if(num > 100 || num < 10) {
        throw new Error('输入越界');
    }
    return num;
}

//初始化。绑定事件之类的
function init() {

    document.addEventListener('DOMContentLoaded', function() {
        bindingButton();
    });

}

//test
init();