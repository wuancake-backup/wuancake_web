/* 
* @Author: anchen
* @Date:   2015-12-17 14:49:13
* @Last Modified by:   anchen
* @Last Modified time: 2015-12-17 15:39:11
*/

'use strict';
window.onload = function(){
    var testdiv = document.getElementById("testdiv");
   // alert(testdiv.innerHTML);
    testdiv.innerHTML = "<p> I inserted this content </p>";
    alert(testdiv.firstChild.nodeName);
}


// window.onload = function(){
//     var para = document.createElement("p");
//     var testdiv = document.getElementById("testdiv");
//     testdiv.appendChild(para);
//     var txt = document.createTextNode("Hello World");
//     para.appendChild(txt);
// }