
var PLAY=1;
var END=0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var survive;

function preload(){
  
 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(600, 400);
  
  monkey = createSprite(50,360,20,50);
  
  monkey.addAnimation("running", monkey_running);
 
  monkey.scale = 0.1;
  
  ground = createSprite(200,380,600,20);
  //ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6 ;
  ground.visible=false;
  
  
  
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background("pink");
  text("Score: "+ score, 500,50);
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if (gameState===PLAY){
   score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -6;
  
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
    spawnbanana();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
  
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    
  }
  
  
  drawSprites();
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,365,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -6 ;
    
     obstacle.addImage(obstacleImage);
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


