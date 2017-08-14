<?php
header("Content-Type: text/html; charset=utf-8");
session_start();
include("conn.php");  
$res=$_GET['arr'];
$arr=explode(",",$res);
$islike=$arr[1];
$id=$arr[0];
if($islike==true)
{
	$islike=1;
}
else
{
	$islike=0;
}
$sql="update list set islike='$islike' where id='$id'";
mysql_query($sql);
mysql_close($conn);
?>