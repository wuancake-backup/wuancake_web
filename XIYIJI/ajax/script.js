var xmlhttp;
var zzz;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
   var data=JSON.parse(xmlhttp.responseText); 
    var element=document.getElementById("myDiv");
   for (var i=0;i<data.length;i++)
   {
    var img = document.createElement("img");
    img.setAttribute("src", data[i].author.avatar_url);
    var ad = document.getElementById("myDiv");
    ad.appendChild(img);
   }

    }
  }
xmlhttp.open("GET","https://api.github.com/repos/facebook/react/commits",true);
xmlhttp.send();
