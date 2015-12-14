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
