<?php
$url=$_POST['txt'];
 if(!empty($url))
 {
	$res = file_get_contents($url);
	$s = iconv('gbk','UTF-8',$res);//大坑，一是转编码，二是不能直接iconv输出，得有个变量转接
echo $s;
}
?>