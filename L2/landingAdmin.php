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
    <script src="script.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page del Juego</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Marck+Script&family=Pixelify+Sans&family=Quantico&display=swap" rel="stylesheet">
</head>
<body data-spy="scroll" data-target=".navbar" data-offset="50">
    <!-- Barra de navegación -->
    <nav class="navbar navbar-expand-lg navbar-light" style="position: fixed; width: 100%;" >
        <a class="navbar-brand" href="#">
            <img class="animate__animated animate__fadeInLeft"; src="img/navbar-logo.png" alt="Logo" style="width: 85px;"> 
        </a>        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            
        </button>
        <h1 class="titulopagina animate__animated animate__zoomInLeft"; >El món de la Laia</h1>
        <div class="collapse navbar-collapse text-light justify-content-end" id="navbarNav">
            <ul class="navbar-nav animate__animated animate__zoomInRight">
                <li class="nav-item">
                    <a class="nav-link" href="#inicio">Inici</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#minijuegos">Minijocs</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#procesos">Sobre el projecte</a>
              </li>
                <li class="nav-item">
                  <a class="nav-link" href="#nosaltres">Nosaltres</a>
              </li>
                <li class="nav-item">
                    <a class="nav-link" href="#contacto">Contacte</a>
                </li>
                
            </ul>
        </div>
    </nav>
    

<div class="procesos" id="procesos">
        <div class="container">
            <h1 class="project-name">Usuari</h1>
            <table class="table">
          
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Usuari</th>
                  <th scope="col">Ranking</th>
                  <th scope="col">Objectes col·leccionats</th>
                </tr>
              </thead>
              <tbody>
              <?php 
               require '../bd.php';
              $rankingList = getPointsAndNames();
                $rowNum =  1;
              foreach($rankingList as $row){
                $id = $row['user_id'];
                $rutas = getObjByUser((int) $id);
                 echo "<tr>
                 <th scope='row'>".$rowNum."</th>";
                 if((int) $_SESSION['user_id'] == (int) $id){
                  echo "<td style='color: green;'>".$row['nombre']."</td>";
                 } 
                 else {
                  echo "<td>".$row['nombre']."</td>";
                 }
                
                echo "<td>".$row['puntos']."</td>".
                 "<td>";

                 foreach($rutas as $r){
                  
                 echo "<img src='/M12/L2/img/objetos/".$r['obj_id'].".png"."' alt='Description of the image'>";
                
             
            }
            echo "</td>"."</tr>";
               $rowNum++;
          }  

              ?>
              </tbody>
            </table>

    </div>

    

 
      


              
                </div>
              </div>
            </div>
          </div>
    </div>

    <!-- Sección de contacto -->
    <div class="container contact-section" id="contacto">
        <div class="textcontact">
            <h2>Afegeix usuari</h2>
            <p>Aquest és un formulari per afegir un nou usuari</p>
        </div>

        <form>
            <div class="form-group">
                <label for="nombre">Nom:</label>
                <input type="text" class="form-control" id="nombre" placeholder="Tu nombre">
            </div>
            <div class="form-group">
                <label for="correo">Correu:</label>
                <input type="email" class="form-control" id="correo" placeholder="tucorreo@example.com">
            </div>
            <div class="form-group">
                <label for="correo">Contrasenya:</label>
                <input type="password" class="form-control" id="correo" placeholder="tucorreo@example.com">
            </div>
        
            <button type="submit" class="boton">Afegir nou usuari</button>
        </form>
    </div>

    <!-- Pie de página -->
    <footer class="container">
        <hr>
        <p>&copy; 2023 El mon de la Laia</p>
    </footer>

    <!-- Scripts de Bootstrap y ScrollSpy -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
