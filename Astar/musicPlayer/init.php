<?php
	header("Content-Type: text/html; charset=utf-8");
	session_start();
	include("conn.php");  
	$sql="select count(*) from list";
	$query=mysql_query($sql);
	$result=mysql_fetch_array($query);
	//echo ','.$result[0].',';          //num
	if($result[0])
	{
		$sql="select * from list order by id";
		$query=mysql_query($sql);
		$data=array();
		while($res=mysql_fetch_array($query,MYSQL_ASSOC))
		{
			array_push($data,$res);
		}
		echo json_encode($data);
	}
	mysql_close($conn);
?>