<?php
session_start();
if (isset($_COOKIE['puntos'])) {
    require '../bd.php';
    $puntos = $_COOKIE['puntos'];
    $userId =  $_SESSION['user_id'];
    $oldPuntos = getPointsByUser($userId);
    $castedOldPuntos = (int) $oldPuntos['puntos'];
    $newPuntos = (int) $puntos +  $castedOldPuntos;
        updatePoints($newPuntos, $userId);
        setcookie("puntos", "", time() - 3600, "/");
        header('Location: ../L2/landing.php');
} else {
    header('Location: ../L2/landing.php');
}
?>