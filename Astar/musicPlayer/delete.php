<?php
	header("Content-Type: text/html; charset=utf-8");
	session_start();
	include("conn.php");
	$res=$_GET['arr'] ;
	$sql="delete from `list` where id='$res'";
	mysql_query($sql);
	mysql_close($conn);
?>