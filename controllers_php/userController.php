<?php

require_once('../bd.php');
session_start();
if(isset($_POST['submit'])) {

    
$userName = $_POST['mail'];
$psswd = $_POST['passwd'];
$passwords = getPasswordByEmails($userName);


    if($psswd == $passwords['contra']){
        $id = getIDByEmails($userName);
        $_SESSION['user_id'] = $id["user_id"];
        header('Location: ../L2/landing.php'); 
        exit(); 
    } else {
       if($userName == "admin"){
        header('Location: ../L2/landingAdmin.php'); 
       }
        
    }

}

?>