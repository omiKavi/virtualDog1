var dog;
var dogImg;
var dogHappy;
var database;
var foodS;

function preload()
{
  dogImg = loadImage("sprites/dogImg.png");
  dogHappy = loadImage("sprites/dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);
  dog = createSprite(200,200, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.1;

  foodStock=database.ref('Food');
  foodStock.on("value" , readStock);

}

function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }
  
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
   text("Food Left: " + foodS, 160, 100);

   stroke("white");
   textSize(10);
   fill("white");
    text("Note: Press the Up Arrow to feed the Dog! " ,150, 50);
 
}

function readStock(data){
  foodS = data.val();
}


function writeStock(x){
// value of food if (food)x<= 0 (never reach negative no.)
if(x<=0){
  x = 0;
} 
// value of food will reduce by one if x>0
else{
  x = x-1;
}

database.ref('/').update({
  Food:x
})
}