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

//SELECTS

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
    $sentenciaTxt = "select nombre, puntos, user_id  from juego.usuario ORDER BY puntos ASC";
    $sentencia = $conexion->prepare($sentenciaTxt);
    $sentencia -> execute();
    $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    $conexion = closeBD();
    return $resultado;
  }
  function getObjByUser($id){
    $conexion = openBD();
    $sentenciaTxt = "select * from juego.usuario_tiene_objetos where user_id =".$id;
    $sentencia = $conexion->prepare($sentenciaTxt);
    $sentencia -> execute();
    $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    $conexion = closeBD();
    return $resultado;
  }

  //INSERTS
  function insertObjectCollectedByUser($idObj, $user){
    $conexion = openBD();
    $sentenciaTxt = "insert (user_id, obj_id) values (:user, :id)";
    $sentencia = $conexion->prepare($sentenciaTxt);
    $sentencia->bindParam(':user', $user);
    $sentencia->bindParam(':id', $idObj);
    $sentencia -> execute();
    $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    $conexion = closeBD();
    return $resultado;
  } 
  function updatePoints($puntos, $user){
    $conexion = openBD();
    $sentenciaTxt = "update users set puntos = :puntos WHERE user_id = :user";
    $sentencia = $conexion->prepare($sentenciaTxt);
    $sentencia->bindParam(':user', $user);
    $sentencia->bindParam(':puntos', $puntos);
    $sentencia -> execute();
    $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    $conexion = closeBD();
    return $resultado;
  } 


  

?>