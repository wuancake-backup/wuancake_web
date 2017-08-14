<?php
header("Content-Type: text/html; charset=utf-8");
session_start();
include("conn.php");  
$res=$_POST['arr'];
$res=str_replace('\'','\\\'',$res);
$res=str_replace('"','\"',$res);
$arr=explode(",",$res);
$songid=$arr[0];
$songname=$arr[1];
$image_id=$arr[4];
$singer=$arr[3];
$album=$arr[5];
$tag=$arr[6];
$islike=false;
$lyr="无歌词";
$s="insert into list(name,id,islike,image_id,lyr,tag,singer,album) values ('$songname','$songid','$islike','$image_id','$lyr','$tag','$singer','$album')";
$result=mysql_query($s);
mysql_close($conn);
?>