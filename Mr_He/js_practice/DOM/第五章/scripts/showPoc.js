/* 
* @Author: anchen
* @Date:   2015-12-15 14:24:47
* @Last Modified by:   anchen
* @Last Modified time: 2015-12-17 11:30:19
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

function popUp(winURL){
    window.open(winURL,"popup","width=320,height=480");

}


function prepareLinks(){

    var links = document.getElementsByClassName("popup");
    if(!links){
        return false;
    }
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function(){
        popUp(this.getAttribute("href"));
        return false;
        }
    }  
}
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

addLoadEvent(prepareLinks);
// window.onload = prepareLinks;
// window.onload = countBodyChildren;
// 