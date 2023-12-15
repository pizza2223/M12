<?php session_start(); ?>
<!DOCTYPE html>
<html lang="es">
<head>
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page del Juego</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Marck+Script&family=Pixelify+Sans&family=Quantico&display=swap" rel="stylesheet">
</head>
<body data-spy="scroll" data-target=".navbar" data-offset="50">
    <!-- Barra de navegación -->
    
    

<div class="procesos" id="procesos">
        <div class="container">
        
           
              <?php 
               require '../bd.php';
               if (isset($_GET['id'])) {
                     $id = $_GET['id'];
               }

              $user = getUserById($id);
              
            
              ?>
              </tbody>
            
    </div>

    

 
      


              
                </div>
              </div>
            </div>
          </div>
    </div>

    <!-- Sección de contacto -->
    <div class="container contact-section" id="contacto">
        <div class="textcontact">
            <h2>Editar usuari</h2>
            <p>Aquest és un formulari per afegir un nou usuari</p>
        </div>

        <form action="../controllers_php/updateUserController.php?id=<?php echo $id ?>" method="POST">
            <div class="form-group">
                <label for="nombre">Nom:</label>
                <input type="text" class="form-control" id="nombre" name="nom" value="<?php echo $user['nombre']; ?>">
            </div>
            <div class="form-group">
                <label for="correo">Correu:</label>
                <input type="email" class="form-control" id="correo" name="correu" value="<?php echo $user['correo']; ?>">
            </div>
            <div class="form-group">
                <label for="correo">Contrasenya:</label>
                <input type="password" class="form-control" id="contra" name="contra" value="<?php echo $user['contra']; ?>">
            </div>
            <div class="form-group">
                <label for="correo">Puntuacio:</label>
                <input type="number" class="form-control" id="puntos" name="puntos" value="<?php echo $user['puntos']; ?>">
            </div>
            <button type="submit" name="submit" class="boton">Desa</button>
            <a type="submit" href="landingAdmin.php" class="boton">Cancela</a>
        </form>
    </div>

    <!-- Pie de página -->
    <footer class="container">
        <hr>
        <p>&copy; 2023 El mon de la Laia</p>
    </footer>

    <!-- Scripts de Bootstrap y ScrollSpy -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</body>
</html>
