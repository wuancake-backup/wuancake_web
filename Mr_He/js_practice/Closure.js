function createFunctions(){
    var result = new Array();
    for(var i = 0;i<10;i++){
        result[i] = function(){
            return i;
        }
    }
    return result;
}
var result = createFunctions2();
result[0]();//10
result[1]();//10

function createFunction2(){
    var result = new Array();
    for(var i = 0; i<10;i++){
        result[i] = (function(num){
            return function(){
                return num;
            };
        })(i);
    }
    return result;
}

var result2 = createFunction2();
result2[0]();//0
result2[1]();//1

function createFunction3(){
    var result = new Array();
    for(var i = 0; i<10;i++){
        result[i] = (function(){
            var num = i;
            return function(){
                return num;
            };
        })();
    }
    return result;
}
var result3 = createFunction3();
result3[0]();//0
result3[1]();//1

function createFunction4(){
    var result = new Array();
    for(var i = 0; i<10;i++){
        result[i] = function(){
            var num = i;
            return function(){
                return num;
            };
        };
    }
    return result;
}
var result4 = createFunction4();
result4[0]()();//10

var name = "The Window";
var object = {
    name:"My Object",
    getNameFunc:function(){
        return function (){
            return this.name;
        };
    }
};
object.getNameFunc()();


