<?php
require_once('./medoo.php');
$content = $_POST['content'];
$database = new medoo([
    'database_type'=>'mysql',
    'database_name'=>'lwinfo',
    'server'=>'localhost',
    'username'=>'root',
    'password'=>'fuck',
    'charset'=>'utf-8',

    'port'=>3306,
]);

$data = $database->insert(
    'Info',
    [
        "InfoContent" => $content,
        "InfoTime" => date('y-m-d h:i:s',time())
    ]
);


$resJson = json_encode($data[0]);
echo $resJson;