/**
 * Created by 少郑 on 2015/6/27.
 */

    /*  通用函数--获取指定id的object*/
function $(id){
    obj=document.getElementById(id);
    return obj;
}

/*通用函数----返回字符串的长度，1个汉字算2个字符*/
String.prototype.chLength=function(){
    var len = this.replace(/[^\x00-\xff]/g, "**").length;
    return len;
};
/*检测函数check，检测用户名的长度是否在指定范围内*/
function setNullinnerHTML(id){
    //使用方法 例如： setNullinnerHTML(“id”)
    document.getElementById(id).innerHTML="&#12288;"
}
function VlaueNullTest(obj,id){
    //检测内容是否为空
    //源 obj
    //提示位置 id
    //使用方法 例如：VlaueNullTest(obj,"id");
    if(obj==""){document.getElementById(id).innerHTML="不能为空，请输入"; return true;}else{return false}

}

function SpaceTest(obj,id){
    //检测是否有空格
    //检测是否有 双字节字符 例如汉字
    //源 obj
    //提示位置 id
    //使用方法 例如：SpaceTest(obj,"id");
    var SpaceReg=new RegExp(/\s+/g);
    var SpaceBoolean=SpaceReg.test(obj);
    if(SpaceBoolean){document.getElementById(id).innerHTML="请不要输入空格"; return true;}else{return false}


}

function SpecialCharTest(obj,id){
    //检测是否有 汉字 特殊符号 非中英文字
    //源 obj
    //提示位置 id
    //使用方法 例如：SpecialCharTest(obj,"id");
    var SpecialCharReg=new RegExp(/[^\x00-\xff]/);
    var SpecialCharBoolean=SpecialCharReg.test(obj);
    if(SpecialCharBoolean){document.getElementById(id).innerHTML="不允许双字节符号，例如汉字 特殊符号 非中英文字"; return true;}else{return false}
}


function ChineseTest(obj,id){
    //仅限输入中英数
    //源 obj
    //提示位置 id
    //使用方法 例如：SpecialCharTest(obj,"id");
    var ChineseReg=new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9_]+$/);
    var ChineseBoolean=ChineseReg.test(obj);
    if(!ChineseBoolean){document.getElementById(id).innerHTML="请不要输入 特殊符号 繁体 非中英文字"; return true;}else{return false}
}

function LengthtTest(obj,id,min,max){
    //检测 长度是否在合法范围内
    //源 name
    //提示位置 id
    //min 最小数
    //max 最大数
    //使用方法 例如：LengthtTest(obj,"id",min,max);
    if (obj.chLength()>max || obj.chLength()<2) {var a="长度应该在";var b="之间";document.getElementById(id).innerHTML=a+min+"~"+max+b;return true;}else{return false}
}

function EmailTest(obj,id) {
    //判断Email 是否 不符合要求
    //源 obj
    //提示位置 id
    var EmailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!EmailReg.test(obj)) {document.getElementById(id).innerHTML = "Email不符合要求 正确的例如 wuan123@wuan123.in";return true;} else {return false;}
}

function EnglishNumberTest(obj,id){
    //判断 是否 不符合a-z A-Z 0-9的规则
    //源 obj
    //提示位置 id
    var EnNimberReg=new RegExp(/^[A-Za-z0-9]+$/);
    var EnNimberBoolean=EnNimberReg.test(obj);
    if(!EnNimberBoolean){document.getElementById(id).innerHTML="只允许输入英文a-z A-Z 和数字0~9;"; return true;}else{ return false}
}
//[.~!@#$%\^\+\*&\\\/\?\|:\.{}()';="]
function SignTest(obj,id){
    //判断 是否有英文符号
    //源 obj
    //提示位置 id
    var SignReg=new RegExp(/[.~!@#￥$%\^\+\*&\\\/\?\|:\.{}()';="]/);
    var SignBoolean=SignReg.test(obj);
    if(SignBoolean){document.getElementById(id).innerHTML="请不要输入 符号;"; return true;}else{ return false}
}

function equalsTest(obj,obj2,id){
    //判断 是否相等
    //源 obj
    //提示位置 id

    if(obj!=obj2){document.getElementById(id).innerHTML="密码不一致;"; return true;}else{ return false}
}
//用户名可包含中文英文数字，不得包含空格，密码只能包含英文和数字  uname 2-16  pw 6-18
function Logincheck()
{




    console.info("zhixing");
    //获取账号的数据
    var name=$('uname').value;
    var password=$('upw').value;

    if(VlaueNullTest(name,"UnameWarming")){return false}else{setNullinnerHTML("UnameWarming")};/*判断是否为空*/
    if(SpaceTest(name,"UnameWarming")){return false}else{setNullinnerHTML("UnameWarming")};/*判断是否有空格*/
    if(LengthtTest(name,"UnameWarming",2,16)){return false}else{setNullinnerHTML("UnameWarming")};/*判断长度 */
    if(SignTest(name,"UnameWarming")){return false}else{setNullinnerHTML("UnameWarming")};/*判断符号 */
    if(ChineseTest(name,"UnameWarming")){return false}else{setNullinnerHTML("UnameWarming")};/*判断汉子 */

    if(VlaueNullTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断是否为空*/
    if(SpaceTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断是否有空格*/
    if(SpecialCharTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断双字节符号 */
    if(LengthtTest(password,"PasswordWarming",6,16)){return false}else{setNullinnerHTML("PasswordWarming")};/*判断长度 */
    if(SignTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断符号 */
    if(EnglishNumberTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断a-z A-Z 0-9 */



    // if(name==""){document.getElementById("a3").innerHTML="请输入账号1"; return false;}

    //if(VlaueNullTest(name)){document.getElementById(id).innerHTML="请输入账号";alert("请输入账号");return false};
    //if(SpaceTest(name)){document.getElementById(id).innerHTML="请不要输入空格0";alert("请不要输入空格0");return false};
    //SpaceTest(name,"a3");


    //if(SpecialCharTest(name,"a3")){return false};/*判断双字节字符*/

    //检测空格
 /*var reg=new RegExp(/\s+/g);
    var result=reg.test(name);
    if(result){document.getElementById("a3").innerHTML="请不要输入空格1"; return false;}
    name=name.replace(reg,"");*/
   /* SpaceTest(name,"a3");
    name=name.replace(reg1,"");*/

    //检测 是否有汉字或者双字节字符
  /*  var reg1=new RegExp(/[^\x00-\xff]/);
    var result1=reg1.test(name);
    if(result1){document.getElementById("a3").innerHTML="不允许符号1"; return false;}
    name=name.replace(reg1,"");*/


    //检测是否有符号
   /* var reg2=new RegExp(/^[A-Za-z0-9]+$/);
    var result2=reg2.test(name);
    if(!result2){document.getElementById("a3").innerHTML="不允许符号2 只允许输入英文 和数字1~9;"; return false;}*/


   /* var pwd1=document.getElementById("upw").value;
    var pwd2=document.getElementById("upw2").value;
    if(pwd1!=pwd2){
        alert("两次密码不一致")
        return false; }
*/

   /* var name1=$('upw').value;

    //检测空格
    var reg=new RegExp(/\s+/g);
    var result=reg.test(name1);
    if(result){alert("密码不能有空格"); return false;}
    name1=name1.replace(reg,"");


    //检测 是否有汉字或者双字节字符
    var reg1=new RegExp(/[^\x00-\xff]/);
    var result1=reg1.test(name1);
    if(result1){alert("密码不能有双字节符号"); return false;}
    name1=name1.replace(reg1,"");

    //检测密码是否一致

    if (name.chLength()>16 ||name.chLength()<8)
    {
        alert('用户名长度应在8-16之间');
        return false;
    }
    // else {
    //密码框的代码如下
    var pass=$('upw').value;
    if (pass.chLength()>16 || pass.chLength()<8)
    {
        alert('密码长度应在8-16之间');

        return false;

    }
    else
        var pattern =  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var email = $('uemail').value;
    if (email=="" ||pattern.test(email))   //email输入为空或符合格式要求
    {
        return true
    }
    else
        alert("请填写正确的Email.");   //在指定位置显示出错信息
    return false;

*/


}
function Rregistration(){
    var name=$('uname').value;
    var password=$('upw').value;
    var email=$('uemail').value;
    var password2=$('upw2').value;
    //开始判断name
    if(VlaueNullTest(name,"UnameWarming")){return false}else{setNullinnerHTML("UnameWarming")};/*判断是否为空*/
    if(SpaceTest(name,"UnameWarming")){return false}else{setNullinnerHTML("UnameWarming")};/*判断是否有空格*/
    if(LengthtTest(name,"UnameWarming",2,16)){return false}else{setNullinnerHTML("UnameWarming")};/*判断长度 */
    if(SignTest(name,"UnameWarming")){return false}else{setNullinnerHTML("UnameWarming")};/*判断符号 */
    if(ChineseTest(name,"UnameWarming")){return false}else{setNullinnerHTML("UnameWarming")};/*判断汉字 */


    //开始判断password
    if(VlaueNullTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断是否为空*/
    if(SpaceTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断是否有空格*/
    if(SpecialCharTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断双字节符号 */
    if(LengthtTest(password,"PasswordWarming",6,16)){return false}else{setNullinnerHTML("PasswordWarming")};/*判断长度 */
    if(SignTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断符号 */
    if(EnglishNumberTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断a-z A-Z 0-9 */
    if(VlaueNullTest(password2,"Password2")){return false}else{setNullinnerHTML("Password2")};/*判断是否为空*/
    if(equalsTest(password,password2,"Password2")){return false}else{setNullinnerHTML("Password2")};
    //开始判断email
    //if(VlaueNullTest(email,"EmailWarming")){return false}else{setNullinnerHTML("EmailWarming")};/*判断是否为空*/
    if(email!=""){
    	
    	if(SpaceTest(email,"EmailWarming")){return false}else{setNullinnerHTML("EmailWarming")};/*判断是否有空格*/
        if(LengthtTest(email,"EmailWarming",5,70)){return false}else{setNullinnerHTML("EmailWarming")};/*判断长度 */
        // if(SignTest(email,"EmailWarming")){return false}else{setNullinnerHTML("EmailWarming")};/*判断符号 */
        //if(ChineseTest(email,"EmailWarming")){return false}else{setNullinnerHTML("EmailWarming")};/*判断汉字 */
        if(SpecialCharTest(email,"EmailWarming")){return false}else{setNullinnerHTML("EmailWarming")};/*判断双字节符号 */
        if(EmailTest(email,"EmailWarming")){return false}else{setNullinnerHTML("EmailWarming")};/*验证邮箱*/
    }

}

function VEmail(){

    var email=$('uemail').value;

    //开始判断email
    if(VlaueNullTest(email,"EmailWarming")){return false}else{setNullinnerHTML("EmailWarming")};/*判断是否为空*/
    if(SpaceTest(email,"EmailWarming")){return false}else{setNullinnerHTML("EmailWarming")};/*判断是否有空格*/
    if(LengthtTest(email,"EmailWarming",5,70)){return false}else{setNullinnerHTML("EmailWarming")};/*判断长度 */
    //if(SignTest(email,"EmailWarming")){return false}else{setNullinnerHTML("EmailWarming")};/*判断符号 */
    //if(ChineseTest(email,"EmailWarming")){return false}else{setNullinnerHTML("EmailWarming")};/*判断汉字 */
    if(SpecialCharTest(email,"EmailWarming")){return false}else{setNullinnerHTML("EmailWarming")};/*判断双字节符号 */
    if(EmailTest(email,"EmailWarming")){return false}else{setNullinnerHTML("EmailWarming")};/*验证邮箱*/




}

function getPasswd(){
    var password=$('upw').value;
    var password2=$('upw2').value;

    var pwd1=document.getElementById("upw").value;
    var pwd2=document.getElementById("upw2").value;


    //开始判断password
    if(VlaueNullTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断是否为空*/
    if(SpaceTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断是否有空格*/
    if(SpecialCharTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断双字节符号 */
    if(LengthtTest(password,"PasswordWarming",6,16)){return false}else{setNullinnerHTML("PasswordWarming")};/*判断长度 */
    if(SignTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断符号 */
    if(EnglishNumberTest(password,"PasswordWarming")){return false}else{setNullinnerHTML("PasswordWarming")};/*判断a-z A-Z 0-9 */

    if(VlaueNullTest(password2,"Password2")){return false}else{setNullinnerHTML("Password2")};/*判断是否为空*/
    if(equalsTest(password,password2,"Password2")){return false}else{setNullinnerHTML("Password2")};

}

function CreateGroup(){
    var Gname=$('Gname').value;
    if(VlaueNullTest(Gname,"GnameWarming")){return false}else{setNullinnerHTML("GnameWarming")};/*判断是否为空*/
    if(SpaceTest(Gname,"GnameWarming")){return false}else{setNullinnerHTML("GnameWarming")};/*判断是否有空格*/
    if(LengthtTest(Gname,"GnameWarming",2,16)){return false}else{setNullinnerHTML("GnameWarming")};/*判断长度 */
    if(SignTest(Gname,"GnameWarming")){return false}else{setNullinnerHTML("GnameWarming")};/*判断符号 */
}







