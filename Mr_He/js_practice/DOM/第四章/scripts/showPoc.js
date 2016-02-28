/* 
* @Author: anchen
* @Date:   2015-12-15 14:24:47
* @Last Modified by:   anchen
* @Last Modified time: 2015-12-16 14:43:57
*/

'use strict';
function showPic(whichpic){
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    var text = whichpic.getAttribute("title");
    var description = document.getElementById("description");
    //alert(description.nodeValue);
    //alert(description.childNodes[0].nodeValue);
    //alert(description.firstChild.nodeValue);
    description.firstChild.nodeValue = text;
}
function countBodyChildren(){
    var body_element = document.getElementsByTagName("body")[0];
    alert(body_element.childNodes.length);
    alert(body_element.nodeType);
}

// window.onload = countBodyChildren;
// 