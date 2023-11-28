<?php 
function openBD()
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $conn = new PDO("mysql:host=$servername;dbname=juego", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("set names utf8");
    return $conn;
}

function closeBD(){
    return null;
}

function getPasswordByEmails($email){
    $conexion = openBD();
    // $sentenciaTxt = "select contra from juego.usuario where correo = :email";
    $sentenciaTxt = "select contra from juego.usuario where correo = '".$email."'";
    $sentencia = $conexion->prepare($sentenciaTxt);
    print_r($sentencia);
    // $sentencia->bindParam(':email', $email);
    $sentencia -> execute();
    $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    $conexion = closeBD();
    return $resultado[0];
  }
  function getIDByEmails($email){
    $conexion = openBD();
    $sentenciaTxt = "select user_id from juego.usuario where correo = :email";
    $sentencia = $conexion->prepare($sentenciaTxt);
    $sentencia->bindParam(':email', $email);
    $sentencia -> execute();
    $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    $conexion = closeBD();
    return $resultado[0];
  }
  function getPointsAndNames(){
    $conexion = openBD();
    $sentenciaTxt = "select nom, puntos  from juego.usuario ORDER BY puntos ASC";
    $sentencia = $conexion->prepare($sentenciaTxt);
    $sentencia->bindParam(':email', $email);
    $sentencia -> execute();
    $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    $conexion = closeBD();
    return $resultado[0];
  }
?>