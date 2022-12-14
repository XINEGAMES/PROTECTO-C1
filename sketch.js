//Crear la pelota, playerPaddle y computerPaddle como objetos sprite.
var ball = createSprite(200,200,10,10);
ball.setanimation("ball");

var playerPaddle = createSprite(380,200,10,70);
playerPaddle.setAnimation(player);
var computerPaddle = createSprite(10,200,10,70);
compPaddle.setAnimation("robot");

//Variable para almacenar los distintos estados del juego.
var gameState = "serve";

//Variables para mantener el puntaje.
var compScore = 0;
var playerScore = 0;


function draw() {
  //Limpiar la pantalla.
  background("white");
  if(ball.isTouching(computerPaddle)|| ball.isTouching(playerPaddle)){
    playSound("assets/hit.mp3", false);
  }
  
  //Coloca el texto informativo en el centro.
  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }
   
  //Mostrar puntaje.
  text(compScore, 170,20);
  text(playerScore, 230,20);
  
  //Hacer que la paleta del jugador se mueva con la posición Y del mouse.
  playerPaddle.y = World.mouseY;
  
  //AI para la paleta de la computadora.
  //Haz que se mueva con la posición y de la bola.
  computerPaddle.y = ball.y;
  
  //Dibuja la línea en el centro.
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
  
 
  
  //Crear límites de borde.
  //Hacer que la pelota rebote con los bordes superiores e inferiores.
  createEdgeSprites();
  
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
 
  
  //Servir la pelota cuando el espacio es presionado. 
  if (keyDown("space") &&  gameState === "serve") {
    serve();
    gameState = "play";
  }
  
 
  //Restaura la pelota al centro si esta cruza la pantalla.
  if(ball.x > 400 || ball.x <0) {
    
    if(ball.x > 400) {
      compScore = compScore + 1;
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    reset();
    gameState = "serve";
  }
  
  if (playerScore === 5 || compScore === 5){
    gameState = "over";
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  drawSprites();
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}