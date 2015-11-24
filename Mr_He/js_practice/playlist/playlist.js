/* 
* @Author: anchen
* @Date:   2015-11-20 14:05:22
* @Last Modified by:   anchen
* @Last Modified time: 2015-11-20 16:31:14
*/

window.onload = init;
function init(){
    var button = document.getElementById("addButton");
    button.onclick = handleButtonClick;
}
function handleButtonClick(){
    var textInput = document.getElementById("songTextInput");
    var songName = textInput.value;
    if (songName=="") {
        alert("Please enter a song");
    } else {
        var li = document.createElement("li");
        li.innerHTML = songName;
        var ul = document.getElementById("playlist");
        ul.appendChild(li);
    
    }

}