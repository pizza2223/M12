<?php
session_start();
echo "fuera";
if(isset($_GET['id'])) {
    require '../bd.php';
    echo "dentro";
    $id = $_GET['id'];
    
    deleteUserById((int) $id);
    header('Location: ../L2/landingAdmin.php');
    }

?>