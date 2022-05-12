var PLAY = 1;
var END = 0;
var gameState = PLAY;

var unicorn, unicornRunning;
var ground, groundImage;
var cactus, cactusGroup;

function preload() {
  
  unicornRunning = loadAnimation("unicorn1.png", "unicorn2.png", "unicorn3.png");
  unicornCollided = loadAnimation("unicorn1.png");
   
  groundImage = loadImage("ground.png");
  
  cactusImage = loadImage("cactus.png");

   gameOverImg = loadImage("gameover.jpg");
  restartImg = loadImage("restart.jpg");

  
}

function setup() {
  createCanvas(500, 230);

  ground = createSprite(200,240);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -5;

  unicorn = createSprite(200, 100, 20, 50);
  unicorn.addAnimation("running", unicornRunning);
  unicorn.addAnimation("collided", unicornCollided)
  unicorn.scale = 0.5;
  unicorn.x = 50; 
  
 invisibleGround = createSprite(230, 130, 400, 10);
  invisibleGround.visible = false;

    gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300, 140);
  restart.addImage(restartImg);

  gameOver.scale = 0.1;
  restart.scale = 0.05;
  
  unicorn.setCollider("rectangle", 0, 0, 250, 100);
  unicorn.debug = false;
  

  cactusGroup = new Group();
  
  score = 0;
  
}

function draw() {
   background("skyblue");
   fill("blue");
   text("SCORE: " + score, 20, 20);
  
  
  if (gameState === PLAY) {
    gameOver.visible = false;
    restart.visible = false;
   
   score = score + Math.round(frameRate()/60);
   
    if (keyDown("space") && unicorn.y >= 100) {
    unicorn.velocityY = -12;
    }
    
    unicorn.velocityY = unicorn.velocityY + 0.8;
  

    if (ground.x < 0) {
    ground.x = ground.width / 2;
    }

    spawnCactus();
 
   
 
    if(unicorn.isTouching(cactusGroup)){  
      gameState = END;

    }
    
  }
     if (gameState === END){
      
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    unicorn.velocityY = 0;

    
    unicorn.changeAnimation("collided", unicornCollided);

    
    cactusGroup.setLifetimeEach(-1);

    cactusGroup.setVelocityXEach(0);

  }
 
  
   unicorn.collide(invisibleGround);
  
  drawSprites();
} 

function spawnCactus() {

  if (frameCount % 100 === 0) {
    cactus = createSprite(230, 175, 400, 10);
    cactus.x = Math.round(random(200, 250));
    cactus.addImage(cactusImage);
    cactus.velocityX = -10;
    cactus.scale = 0.5;
    cactusGroup.add(cactus)

   cactus.setCollider("rectangle", 0, 0, 10, 250);
  cactus.debug = false;

    
    
    cactus.lifetime = 100;
  
  }
}





