<?php  
   //访问数据库,读取数据  
  header("Content-Type: text/html; charset=utf-8");
   $conn =mysql_connect("localhost","root","root","creat.php"); 
    if (!$conn){  
      die("数据库连接失败: " . mysql_error());  
    }  
    else
    {
    	// echo "hi";
    }
   mysql_select_db("music_website",$conn);
   mysql_query("set character set 'utf8'");  
   mysql_query("set names 'utf8'");  
?>

