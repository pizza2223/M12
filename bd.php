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
  function getPointsByUser($id){
    $conexion = openBD();
    $sentenciaTxt = "select puntos from juego.usuario where user_id =".$id;
    $sentencia = $conexion->prepare($sentenciaTxt);
    $sentencia -> execute();
    $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    $conexion = closeBD();
    return $resultado[0];
  }
  function getUserById($id){
    $conexion = openBD();
    $sentenciaTxt = "select * from juego.usuario where user_id =".$id;
    $sentencia = $conexion->prepare($sentenciaTxt);
    $sentencia -> execute();
    $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    $conexion = closeBD();
    return $resultado[0];
  }

  //INSERTS
  function insertObjectCollectedByUser($idObj, $user){
    $conexion = openBD();
    $sentenciaTxt = "insert into usuario_tiene_objetos (user_id, obj_id) values (:user, :id)";
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
    $sentenciaTxt = "update usuario set puntos = :puntos WHERE user_id = :user";
    $sentencia = $conexion->prepare($sentenciaTxt);
    $sentencia->bindParam(':user', $user);
    $sentencia->bindParam(':puntos', $puntos);
    $sentencia -> execute();
    $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    $conexion = closeBD();
    return $resultado;
  } 
  function updateUser($nombre, $correo, $contrasenya, $puntos, $id){
    $conexion = openBD();
    $sentenciaTxt = "update usuario set puntos = :puntos, nombre = :nombre, correo = :correo, contra = :contrasenya WHERE user_id = :user";
    $sentencia = $conexion->prepare($sentenciaTxt);
    $sentencia->bindParam(':nombre', $nombre);
    $sentencia->bindParam(':correo', $correo);
    $sentencia->bindParam(':contrasenya', $contrasenya);
    $sentencia->bindParam(':puntos', $puntos);
    $sentencia->bindParam(':user', $id);
    $sentencia -> execute();
    $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    $conexion = closeBD();
    return $resultado;
  }
  function insertUser($nom, $correu, $contra, $puntos){
    $conexion = openBD();
    $sentenciaTxt = "insert into juego.usuario (nombre, correo, contra, puntos) values (:nom, :correu, :contra, :puntos)";
    $sentencia = $conexion->prepare($sentenciaTxt);
    $sentencia->bindParam(':nom', $nom);
    $sentencia->bindParam(':correu', $correu);
    $sentencia->bindParam(':contra', $contra);
    $sentencia->bindParam(':puntos', $puntos);
    $sentencia -> execute();
    $conexion = closeBD();
  }
  function deleteUserById($id){
    $conexion = openBD();
    $sentenciaTxt = "delete from juego.usuario where user_id =".$id;
    $sentencia = $conexion->prepare($sentenciaTxt);
    $sentencia -> execute();
    $conexion = closeBD();
  }

  

?>