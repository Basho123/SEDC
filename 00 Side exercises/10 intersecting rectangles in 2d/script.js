let posx,posy, size
let times = 0

let color = 0;

let topLeftFirst = [];
let topRightFirst = [];
let bottomLeftFirst = [];
let bottomRightFirst = [];

let topLeftSecond = [];
let topRightSecond = [];
let bottomLeftSecond = [];
let bottomRightSecond = [];

function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);
  firstRectPosX =0
  firstRectPosY = 0
  
  firstRectWidth = 100;
  firstRectHeight = 50;
  
  secondRectPosX = 0
  secondRectPosY = 0
  
  secondRectWidth = 200;
  secondRectHeight = 25;
  
  
  
  
  // meSize = 100;
  
}

function draw() {
	background(255);
	rectMode(CENTER);
// translate(-windowWidth/2,-windowHeight/2)
  
  
  
  
  firstRectPosX = mouseX-windowWidth/2;
  firstRectPosY = mouseY-windowHeight/2;  
    push()
    fill(color)
  translate(firstRectPosX,0,firstRectPosY)
	plane(firstRectWidth,firstRectHeight)
    pop()
  
    push()
   fill(color)
 translate(secondRectPosX,0,secondRectPosY)
	plane(secondRectWidth,secondRectHeight);
 
	pop()
  
  rightSideFirst = firstRectPosX + firstRectWidth/2;  
  leftSideFirst = firstRectPosX - firstRectWidth/2;
  bottomSideFirst = firstRectPosY + firstRectHeight/2;
  topSideFirst = firstRectPosY - firstRectHeight/2;
  
  
  
  rightSideSecond = secondRectPosX + secondRectWidth/2;
  leftSideSecond = secondRectPosX - secondRectWidth/2;
  bottomSideSecond = secondRectPosY +secondRectHeight/2;
  topSideSecond = secondRectPosY - secondRectHeight/2;
  
  
  topLeftFirst = [firstRectPosX - firstRectWidth/2,firstRectPosY-firstRectHeight/2]
  topRightFirst = [firstRectPosX + firstRectWidth/2,firstRectPosY-firstRectHeight/2]
  bottomLeftFirst = [firstRectPosX - firstRectWidth/2,firstRectPosY+firstRectHeight/2]
  bottomRightFirst = [firstRectPosX + firstRectWidth/2,firstRectPosY+firstRectHeight/2]
  
  topLeftSecond = [secondRectPosX - secondRectWidth/2,secondRectPosY-secondRectHeight/2]
  topRightSecond = [secondRectPosX + secondRectWidth/2,secondRectPosY-secondRectHeight/2]
  bottomLeftSecond = [secondRectPosX - secondRectWidth/2,secondRectPosY+secondRectHeight/2]
  bottomRightSecond = [secondRectPosX + secondRectWidth/2,secondRectPosY+secondRectHeight/2]
  
    if(
      bottomLeftFirst[0] < topRightSecond[0]    && bottomLeftFirst[1] > topRightSecond[1]     && 
      bottomLeftFirst[0] > topLeftSecond[0]     && bottomLeftFirst[1] > topLeftSecond[1]      &&
      bottomLeftFirst[0] < bottomRightSecond[0] && bottomLeftFirst[1] < bottomRightSecond[1]  &&
      bottomLeftFirst[0] > bottomLeftSecond[0]  && bottomLeftFirst[1] < bottomLeftSecond[1]   ||
      
      topLeftFirst[0] < bottomRightSecond[0]    && topLeftFirst[1] < bottomRightSecond[1]     &&
      topLeftFirst[0] < topRightSecond[0]       && topLeftFirst[1] > topRightSecond[1]        &&
      topLeftFirst[0] > bottomLeftSecond[0]     && topLeftFirst[1] < bottomLeftSecond[1]      &&
      topLeftFirst[0] > topLeftSecond[0]        && topLeftFirst[1] > topLeftSecond[1]         ||
      
      topRightFirst[0] > bottomLeftSecond[0]    && topRightFirst[1] < bottomLeftSecond[1]     &&
      topRightFirst[0] > topLeftSecond[0]       && topRightFirst[1] > topLeftSecond[1]        &&
      topRightFirst[0] < topRightSecond[0]      && topRightFirst[1] > topRightSecond[1]       &&
      topRightFirst[0] < bottomRightSecond[0]   && topRightFirst[1] < bottomRightSecond[1]    ||
      
      bottomRightFirst[0] > topLeftSecond[0]    && bottomRightFirst[1] > topLeftSecond[1]     &&
      bottomRightFirst[0] > bottomLeftSecond[0] && bottomRightFirst[1] < bottomLeftSecond[1]  &&
      bottomRightFirst[0] < topRightSecond[1]   && bottomRightFirst[1] > topRightSecond[1]    &&
      bottomRightFirst[0] < bottomRightSecond[1]&& bottomRightFirst[1] < bottomRightSecond[1] ||        
      
      
      bottomLeftSecond[0] < topRightFirst[0]    && bottomLeftSecond[1] > topRightFirst[1]     && 
      bottomLeftSecond[0] > topLeftFirst[0]     && bottomLeftSecond[1] > topLeftFirst[1]      &&
      bottomLeftSecond[0] < bottomRightFirst[0] && bottomLeftSecond[1] < bottomRightFirst[1]  &&
      bottomLeftSecond[0] > bottomLeftFirst[0]  && bottomLeftSecond[1] < bottomLeftFirst[1]   ||
      
      topLeftSecond[0] < bottomRightFirst[0]    && topLeftSecond[1] < bottomRightFirst[1]     &&
      topLeftSecond[0] < topRightFirst[0]       && topLeftSecond[1] > topRightFirst[1]        &&
      topLeftSecond[0] > bottomLeftFirst[0]     && topLeftSecond[1] < bottomLeftFirst[1]      &&
      topLeftSecond[0] > topLeftFirst[0]        && topLeftSecond[1] > topLeftFirst[1]         ||
      
      topRightSecond[0] > bottomLeftFirst[0]    && topRightSecond[1] < bottomLeftFirst[1]     &&
      topRightSecond[0] > topLeftFirst[0]       && topRightSecond[1] > topLeftFirst[1]        &&
      topRightSecond[0] < topRightFirst[0]      && topRightSecond[1] > topRightFirst[1]       &&
      topRightSecond[0] < bottomRightFirst[0]   && topRightSecond[1] < bottomRightFirst[1]    ||
      
      bottomRightSecond[0] > topLeftFirst[0]    && bottomRightSecond[1] > topLeftFirst[1]     &&
      bottomRightSecond[0] > bottomLeftFirst[0] && bottomRightSecond[1] < bottomLeftFirst[1]  &&
      bottomRightSecond[0] < topRightFirst[1]   && bottomRightSecond[1] > topRightFirst[1]    &&
      bottomRightSecond[0] < bottomRightFirst[1]&& bottomRightSecond[1] < bottomRightFirst[1] ||
      
      rightSideFirst > leftSideSecond  && 
      leftSideFirst  < rightSideSecond &&
      bottomSideFirst > topSideSecond &&
      topSideFirst < bottomSideSecond
      
      
      
      ){
    color = 255
  }
  else color = 0;
}