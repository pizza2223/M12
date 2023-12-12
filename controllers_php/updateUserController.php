<?php
session_start();
if (isset($_GET['id'])) {
    require '../bd.php';
    $id = $_GET['id'];
    if(isset($_POST['desa'])) {
    updateUser($_POST['nom'], $_POST['correu'], $_POST['contra'], $_POST['puntos'], $id);
    }
} else {
    header('Location: ../L2/edita.php');
}
?>