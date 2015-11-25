/* 
* @Author: anchen
* @Date:   2015-11-24 13:15:11
* @Last Modified by:   anchen
* @Last Modified time: 2015-11-24 15:43:15
*/

window.onload = getMyLocation;
function getMyLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation);
    }else{
        alert("No geolocation support");
    }
}

function displayLocation(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ",Longitude: "+ longitude;
}
