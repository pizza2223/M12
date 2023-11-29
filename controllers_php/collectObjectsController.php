<?php
session_start();
if (isset($_COOKIE['objetos'])) {
    require '/../bd.php';
    $objJSON = $_COOKIE['objetos'];
    $objArray = json_decode($jsonData, true);
    $userId =  $_SESSION['user_id'];
   
    foreach($objArray as $obj){
        insertObjectCollectedByUser($obj, $userId);
    }
} 
?>
