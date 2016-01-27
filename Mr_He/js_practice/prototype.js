function Person(){

}
Person.prototype.name = "s";
Person.prototype.age = 45;
Person.prototype.sayName = function(){
    alert(this.name);
};
var per1 =  new Person();
per1.sayName();

var per2 =  new Person();
per2.sayName();
alert(per1.sayName == per2.sayName);//true

alert(Object.getPrototypeOf(per1) == Person.prototype);//true


for(var prop in per1){
    alert(prop);
}
Object.defineProperty(Person.prototype,"like",{
    value:"eating",
    enumerable:false,
    writable:false,
    configurable:true
});
per1.like//"eating"
per1.like = "sdsfdf";
per1.like//"eating"
per1.hasOwnProperty("like");//false

Object.defineProperty(Person.prototype,"like",{
    
    writable:true,
    
});
per1.hasOwnProperty("like");//false
per1.like = "sdsfdf";//"sdsfdf"
per1.hasOwnProperty("like");//true

var keys = Object.keys(Person.prototype);
alert(keys);//["name", "age", "sayName","like"] 对象上可枚举的实例属性
var p1keys = Object.keys(per1);
alert(p1keys);//["like"]
var keys2 = Object.getOwnPropertyNames(Person.prototype);
alert(keys2);//["constructor", "name", "age", "sayName"] 所有实例属性，无论是否可枚举

function Dog(){}
Dog.prototype = {
    name: "p1",
    age: 5,
    like: "eating",
    sayName:function(){
        alert(this.name);
    }
};//相当于重写了原型对象，此时原型对象的constructor指向Object构造函数
var dog1 = new Dog();
alert(dog1 instanceof Object);//true
alert(dog1 instanceof Dog);//true
alert(dog1.constructor == Object);//true
alert(dog1.constructor == Dog);//false
Dog.prototype = {
    constructor:Dog,
    name: "p2",
    age: 5,
    like: "eating",
    sayName:function(){
        alert(this.name);
    }
};
alert(dog1.constructor == Dog);//false
var dog2 = new Dog();
alert(dog2.constructor == Dog);//ture
var dogKeys = Object.keys(Dog.prototype);
alert(dogKeys);//["constructor", "name", "age", "like", "sayName"] constructor变成可枚举
Object.getPrototypeOf(dog1);//Object {name: "p1", age: 5, like: "eating"} 与第一次重写的原型相连
Object.getPrototypeOf(dog2);//Dog {name: "p2", age: 5, like: "eating"}与第二次重写的原型相连


