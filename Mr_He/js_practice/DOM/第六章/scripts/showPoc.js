/* 
* @Author: anchen
* @Date:   2015-12-15 14:24:47
* @Last Modified by:   anchen
* @Last Modified time: 2015-12-17 14:08:35
*/

'use strict';
function showPic(whichpic){
    if(!document.getElementById("placeholder")) return false;//如果图片占位符不存在，图片切换不成功，返回false
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);

    if(document.getElementById("description")){
    var text = whichpic.getAttribute("title");
    var description = document.getElementById("description");
    description.firstChild.nodeValue = text;
    }//如果描述文字存在，则进行描述文字更新，不存在就忽略，不会对图片更新产生影响

    return true;//图片更新成功
}
function countBodyChildren(){
    var body_element = document.getElementsByTagName("body")[0];
    alert(body_element.childNodes.length);
    alert(body_element.nodeType);
}

function prepareGallery(){
    if(!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function(){
            // showPic(this);
            // return false;
            return !showPic(this);//如果图片占位符存在，就在图片占位符处切换图片，如果不存在图片占位符，就允许a标签的默认行为，跳转到相应的链接处
        }
        // links[i].onkeypress = links[i].onclick;
    }
}
// window.onload = countBodyChildren;
//window.onload = prepareGallery;
function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}

addLoadEvent(prepareGallery);