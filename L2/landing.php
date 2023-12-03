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
    <div class="inicionubesyjuego ">
    <img class="nubesinicio animate__animated animate__fadeInLeft" src="img/nubes.webp" alt="">
    <!-- Sección de inicio -->
    <div class="container-game animate__animated animate__pulse" id="inicio">
        <div class="row">
            <div class="col-md-12">
                 <!-- plane game -->
                 <div class="gameArea">
                  <img src="img/planeGame/wMap.jpg" id="worldMap" alt="">
                  <div>
                    <img src="img/planeGame/keys.gif" id="arrowKeyGif" alt="">
                  </div>
                  <div id="flagContainer">
                     <img id="flag" src="" alt="">
                  </div>
                  <div id="brazil" class="pin">
               <img src="img/planeGame/pin.png" alt="pin" class="pin">
                  </div>
                  <div id="europe" class="pin">
                     <img src="img/planeGame/pin.png" alt="pin" class="pin">
                  </div>
                  <div id="india" class="pin">
                     <img src="img/planeGame/pin.png" alt="pin" class="pin">
                  </div>
                  <div id="kenya" class="pin">
                     <img src="img/planeGame/pin.png" alt="pin" class="pin">
                  </div>
                  
                  
                               <div class="airplane" name="plane"  id="p1">
                               <img src="./img/planeGame/planeUp.png" alt="plane" class="planeImage" id="planeimg">
                               </div>
                        </div>
                        <script src="planeGameScript.js"></script>
                         <!-- end plane game -->

            </div>

        </div>

    </div>
    <img class="nubesinicio2 animate__animated animate__fadeInRight" src="img/nubes.webp" alt="">

    </div>
    

    <!-- Sección de minijuegos -->
    <div class="container-games-section" id="minijuegos">
      <h2>Minijuegos</h2>
      <br>
      <div class="row">
          <div class="col-md-3" onclick="showPopup('Brasil', 'img/portfolio/1.jpg', 'Laia se encuentra a la Tribu de Caucan Miri i haurà de ajudar-lo a comtar tots els nens de la escola per poder crear-ne la xarxa electrica.')">
              <h4>Brasil</h4>
              <img class="minijuegos" src="img/portfolio/1.jpg" alt="Minijuego 1">
              <p class="despopout">Little runners Brazil</p>
              <div class="overlay"></div>
          </div>
          <div class="col-md-3" onclick="showPopup('Kènia', 'img/', 'Descripción del Minijuego 1.')">
            <h4>Kènia</h4>
              <img class="minijuegos" src="minijuego2.jpg" alt="Minijuego 2">
              <p>Descripción del Minijuego 2.</p>
              <div class="overlay"></div>
          </div>
          <div class="col-md-3" onclick="showPopup('India', 'img/', 'Descripción del Minijuego 1.')">
            <h4>India</h4>
              <img class="minijuegos" src="minijuego3.jpg" alt="Minijuego 3">
              <p>Descripción del Minijuego 3.</p>
              <div class="overlay"></div>
          </div>
          <div class="col-md-3" onclick="showPopup('Europa', 'img/portfolio/1.jpg', 'Descripción del Minijuego 1.')">
            <h4>Europa</h4>
              <img class="minijuegos" src="minijuego4.jpg" alt="Minijuego 4">
              <p>Descripción del Minijuego 4.</p>
              <div class="overlay"></div>

          </div>
      </div>
  </div>
  <div class="popup" id="popup">
    <span onclick="closePopup()" style="cursor: pointer; position: absolute; top: 10px; right: 20px; font-size: 20px;">&times;</span>
    <h2 id="popupTitle"></h2>
    <img id="popupImage" style="max-width: 100%; max-height: 300px;">
    <p id="popupDescription"></p>
</div>

<div class="procesos" id="procesos">
        <div class="container">
            <h1 class="project-name">Ranking</h1>
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

    <div id="nosaltres" class="equipo">
        <h2>Nuestro equipo</h2>

        <div class="responsive-container-block container">            
            <div class="responsive-container-block">
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src="img/team/alex.jpg">
                  </div>
                  <p class="text-blk name">
                    Àlex Ventura
                  </p>
                  <p class="text-blk position">
                    
                  </p>
                  <p class="text-blk feature-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div class="social-icons">
                    <a href="" target="_blank">
                      <img class="Linkedinicon" src="img/linkedin.png">
                    </a>
                  </div>
                </div>
              </div>
              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src="">
                  </div>
                  <p class="text-blk name">
                    Raul Ruiz
                  </p>
                  <p class="text-blk position">
                  </p>
                  <p class="text-blk feature-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div class="social-icons">
                    <a href="" target="_blank">
                        <img class="Linkedinicon" src="img/linkedin.png">
                      </a>
                  </div>
                </div>
              </div>

              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src="">
                  </div>
                  <p class="text-blk name">
                    Malena Montecino
                  </p>
                  <p class="text-blk position">
                    
                  </p>
                  <p class="text-blk feature-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div class="social-icons">
                    <a href="" target="_blank">
                        <img class="Linkedinicon" src="img/linkedin.png">
                      </a>
                  </div>
                </div>
              </div>

              <div class="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                <div class="card">
                  <div class="team-image-wrapper">
                    <img class="team-member-image" src="">
                  </div>
                  <p class="text-blk name">
                    Jack Vickery
                  </p>
                  <p class="text-blk position">
                    
                  </p>
                  <p class="text-blk feature-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div class="social-icons">
                    <a href="" target="_blank">
                        <img class="Linkedinicon" src="img/linkedin.png">
                      </a>
                  </div>
                </div>
              </div>

 
      


              
                </div>
              </div>
            </div>
          </div>
    </div>

    <!-- Sección de contacto -->
    <div class="container contact-section" id="contacto">
        <div class="textcontact">
            <h2>Contacto</h2>
            <p>¿Tienes alguna pregunta o comentario? ¡Contáctanos!</p>
        </div>

        <form>
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" class="form-control" id="nombre" placeholder="Tu nombre">
            </div>
            <div class="form-group">
                <label for="correo">Correo Electrónico:</label>
                <input type="email" class="form-control" id="correo" placeholder="tucorreo@example.com">
            </div>
            <div class="form-group">
                <label for="mensaje">Mensaje:</label>
                <textarea class="form-control" id="mensaje" rows="5" placeholder="Escribe tu mensaje aquí"></textarea>
            </div>
            <button type="submit" class="boton">Enviar Mensaje</button>
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
