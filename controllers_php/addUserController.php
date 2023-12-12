<?php
require_once('../bd.php');
session_start();
if(isset($_POST['submit'])) {

    
$nom = $_POST['nom'];
$correu = $_POST['correu'];
$contra = $_POST['contra'];
$puntos = 1;

insertUser($nom, $correu, $contra, $puntos);
header("Location: ../L2/landingAdmin.php");
}

?>