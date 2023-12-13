<?php
session_start();
echo "fuera";
if (isset($_GET['id'])) {
    require '../bd.php';
    echo "dentro";
    $id = $_GET['id'];
    if(isset($_POST['submit'])) {
    updateUser($_POST['nom'], $_POST['correu'], $_POST['contra'], (int) $_POST['puntos'], (int) $id);
    header('Location: ../L2/landingAdmin.php');
    }
} 
?>