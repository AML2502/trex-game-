var trex, trex_running, trex_collided,CloudsGroup,count, ObstaclesGroup;
var ground, invisibleGround, groundImage,C,o1,o2,o3,o4,o5,o6;
var gamestate,gameOver,restart,GO,R, highscore;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  C = loadImage ("cloud.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  GO=loadImage("gameOver.png");
  R=loadImage("restart.png");
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(C);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 220;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand){
        
      case 1: obstacle.addImage(o1);
              break;
      case 2: obstacle.addImage(o2);
              break;
      case 3: obstacle.addImage(o3);
              break;
      case 4: obstacle.addImage(o4);
              break;
      case 5: obstacle.addImage(o5);
              break;
      case 6: obstacle.addImage(o6);
              break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 120;
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
  gamestate = 1;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  if (highscore<count){
    highscore=count;
    
  }
  count = 0;
  
}

function setup() {
  createCanvas(600, 200);
  highscore=0;
  count=0;
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  CloudsGroup=new Group ();
  ObstaclesGroup=new Group ();
  
  gamestate=1 ;
  
   gameOver = createSprite(300,100);
   restart = createSprite(300,140);
  gameOver.addImage(GO);
  gameOver.scale = 0.5;
  restart.addImage(R);
  restart.scale = 0.5;

}

function draw() {
  background("turquoise");
  if(mousePressedOver(restart)) {
    reset();
  }
  text("Score: "+ count, 500, 50);
  if (highscore>0){
     text("HighScore: "+ highscore, 300, 50);
  }
  if (gamestate===1){
    count = count+Math.round(getFrameRate()/40);
    spawnClouds () ;
    spawnObstacles ();
    if(keyDown("space")&& trex.y>=161) {
      trex.velocityY = -15;
    }
    //console.log(trex.y);
    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(ObstaclesGroup.isTouching(trex)){
      gamestate = 0 ;
      
    }
    gameOver.visible = false;
    restart.visible = false;
  }
  else {
   gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    //trex.setAnimation("trex_collided");
    trex.changeAnimation("colided",trex_collided);
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
     
    
    
    
    
    
  }
  
  
  
  trex.collide(invisibleGround);
  drawSprites();
}