var datatable=null;
var db=openDatabase('MyData','','My Database',102400);
function init(){
    datatable=document.getElementById('datatable');
    showAllData();
}
function removeAllData(){
  for(var i=datatable.childNodes.length-1;i>=0;i--)
  {
   datatable.removeChild(datatable.childNodes[i]);
  }
    var  tr=document.createElement('tr');
}
function showData(){

}
function showAllData(){

}
function addData(name,message,time){

}
function saveData(){

}