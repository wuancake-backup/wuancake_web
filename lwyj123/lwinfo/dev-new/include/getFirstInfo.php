<?php
require_once('./medoo.php');
$database = new medoo([
    'database_type'=>'mysql',
    'database_name'=>'lwinfo',
    'server'=>'localhost',
    'username'=>'root',
    'password'=>'fuck',
    'charset'=>'utf-8',

    'port'=>3306,
]);

$maxid = $database->max(
    'Info',
    "InfoId"
);
$data = $database->select(
    'Info',
    "*",
    ["InfoId" => $maxid]
);


$resJson = json_encode($data[0]);
echo $resJson;