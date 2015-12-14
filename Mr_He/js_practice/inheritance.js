//原型链
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
}
function SubType(){
    this.subproperty = false;
}
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
    return this.subproperty;
}

var instance = new SubType();
alert(instance.getSuperValue());//true



//组合继承:原型链和借用构造函数组合
function S1(name){
    this.name = name;
    this.colors = ["red","green","blue"];
}
S1.prototype.sayName = function(){
    alert(this.name);
};
function S2(name,age){
    //继承属性
    S1.call(this,name);
    this.age = age;
}
//继承方法
S2.prototype = new S1();
S2.prototype.constructor = S2;
S2.prototype.sayAge = function(){
    alert(this.age);
}

var ins1 = new S2("Nich",29);
ins1.colors.push("black");
alert(ins1.colors);
ins1.sayName();
ins1.sayAge();

var ins2 = new S2("Greg",27);
alert(ins2.colors);
ins2.sayName();
ins2.sayAge();

ins1 instanceof S1;//true
ins1 instanceof S2;//true

S1.prototype.isPrototypeOf(ins1);//true
S2.prototype.isPrototypeOf(ins1);//true

//寄生式继承
function createA(or){
    var clone = Object.create(or);
    clone.sayHi = function(){
        alert("hi");
    };
    return clone;
}
var person = {
    name:"Nice",
    friend:["a","b","c"]
};
var anPerson = createA(person);
anPerson.sayHi();


//寄生组合式继承
function inheritPrototype(subType,superType){
    var prototype = Object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}
function SuperType(name){
    this.name = name;
    this.colors = ["red","blue","green"];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};
function SubType(name,age){
    SuperType.call(this,name);
    this.age = age;
}
inheritPrototype(SubType,SuperType);
SubType.prototype.sayAge = function(){
    alert(this.age);
};

var p1 = new SubType("ss",23);
