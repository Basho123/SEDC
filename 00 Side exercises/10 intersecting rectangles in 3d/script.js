function intersects(
  firstRectPosX, firstRectPosY, firstRectPosZ, firstRectWidth, firstRectHeight, firstRectDepth,
  secondRectPosX, secondRectPosY, secondRectPosZ, secondRectWidth, secondRectHeight, secondRectDepth
) {
  // UNCOMMENT THE COMMENTED FILES TO CHECK THE CORNERS OF 2 DIMENSIONS, 
  // PART 1 CORNER

  let topLeftFirst = [];
  let topRightFirst = [];
  let bottomLeftFirst = [];
  let bottomRightFirst = [];

  let topLeftSecond = [];
  let topRightSecond = [];
  let bottomLeftSecond = [];
  let bottomRightSecond = [];

  // rightSideFirst = firstRectPosX + firstRectWidth / 2;
  // leftSideFirst = firstRectPosX - firstRectWidth / 2;
  // bottomSideFirst = firstRectPosY + firstRectHeight / 2;
  // topSideFirst = firstRectPosY - firstRectHeight / 2;
  // frontSideFirst = firstRectPosZ + firstRectDepth / 2; //DEPTH
  // backSideFirst = firstRectPosZ - firstRectDepth / 2; //DEPTH

  // rightSideSecond = secondRectPosX + secondRectWidth / 2;
  // leftSideSecond = secondRectPosX - secondRectWidth / 2;
  // bottomSideSecond = secondRectPosY + secondRectHeight / 2;
  // topSideSecond = secondRectPosY - secondRectHeight / 2;
  // frontSideSecond = secondRectPosZ + secondRectDepth / 2; //DEPTH
  // backSideSecond = secondRectPosZ - secondRectDepth / 2; //DEPTH

  // PART 2 CORNER
  topLeftFirst = [firstRectPosX - firstRectWidth / 2, firstRectPosY - firstRectHeight / 2]
  topRightFirst = [firstRectPosX + firstRectWidth / 2, firstRectPosY - firstRectHeight / 2]
  bottomLeftFirst = [firstRectPosX - firstRectWidth / 2, firstRectPosY + firstRectHeight / 2]
  bottomRightFirst = [firstRectPosX + firstRectWidth / 2, firstRectPosY + firstRectHeight / 2]

  topLeftSecond = [secondRectPosX - secondRectWidth / 2, secondRectPosY - secondRectHeight / 2]
  topRightSecond = [secondRectPosX + secondRectWidth / 2, secondRectPosY - secondRectHeight / 2]
  bottomLeftSecond = [secondRectPosX - secondRectWidth / 2, secondRectPosY + secondRectHeight / 2]
  bottomRightSecond = [secondRectPosX + secondRectWidth / 2, secondRectPosY + secondRectHeight / 2]

  if (
    // PART 3 CORNER
    bottomLeftFirst[0] < topRightSecond[0] && bottomLeftFirst[1] > topRightSecond[1] &&
    bottomLeftFirst[0] > topLeftSecond[0] && bottomLeftFirst[1] > topLeftSecond[1] &&
    bottomLeftFirst[0] < bottomRightSecond[0] && bottomLeftFirst[1] < bottomRightSecond[1] &&
    bottomLeftFirst[0] > bottomLeftSecond[0] && bottomLeftFirst[1] < bottomLeftSecond[1] ||

    topLeftFirst[0] < bottomRightSecond[0] && topLeftFirst[1] < bottomRightSecond[1] &&
    topLeftFirst[0] < topRightSecond[0] && topLeftFirst[1] > topRightSecond[1] &&
    topLeftFirst[0] > bottomLeftSecond[0] && topLeftFirst[1] < bottomLeftSecond[1] &&
    topLeftFirst[0] > topLeftSecond[0] && topLeftFirst[1] > topLeftSecond[1] ||

    topRightFirst[0] > bottomLeftSecond[0] && topRightFirst[1] < bottomLeftSecond[1] &&
    topRightFirst[0] > topLeftSecond[0] && topRightFirst[1] > topLeftSecond[1] &&
    topRightFirst[0] < topRightSecond[0] && topRightFirst[1] > topRightSecond[1] &&
    topRightFirst[0] < bottomRightSecond[0] && topRightFirst[1] < bottomRightSecond[1] ||

    bottomRightFirst[0] > topLeftSecond[0] && bottomRightFirst[1] > topLeftSecond[1] &&
    bottomRightFirst[0] > bottomLeftSecond[0] && bottomRightFirst[1] < bottomLeftSecond[1] &&
    bottomRightFirst[0] < topRightSecond[0] && bottomRightFirst[1] > topRightSecond[1] &&
    bottomRightFirst[0] < bottomRightSecond[0] && bottomRightFirst[1] < bottomRightSecond[1] ||


    bottomLeftSecond[0] < topRightFirst[0] && bottomLeftSecond[1] > topRightFirst[1] &&
    bottomLeftSecond[0] > topLeftFirst[0] && bottomLeftSecond[1] > topLeftFirst[1] &&
    bottomLeftSecond[0] < bottomRightFirst[0] && bottomLeftSecond[1] < bottomRightFirst[1] &&
    bottomLeftSecond[0] > bottomLeftFirst[0] && bottomLeftSecond[1] < bottomLeftFirst[1] ||

    topLeftSecond[0] < bottomRightFirst[0] && topLeftSecond[1] < bottomRightFirst[1] &&
    topLeftSecond[0] < topRightFirst[0] && topLeftSecond[1] > topRightFirst[1] &&
    topLeftSecond[0] > bottomLeftFirst[0] && topLeftSecond[1] < bottomLeftFirst[1] &&
    topLeftSecond[0] > topLeftFirst[0] && topLeftSecond[1] > topLeftFirst[1] ||

    topRightSecond[0] > bottomLeftFirst[0] && topRightSecond[1] < bottomLeftFirst[1] &&
    topRightSecond[0] > topLeftFirst[0] && topRightSecond[1] > topLeftFirst[1] &&
    topRightSecond[0] < topRightFirst[0] && topRightSecond[1] > topRightFirst[1] &&
    topRightSecond[0] < bottomRightFirst[0] && topRightSecond[1] < bottomRightFirst[1] ||

    bottomRightSecond[0] > topLeftFirst[0] && bottomRightSecond[1] > topLeftFirst[1] &&
    bottomRightSecond[0] > bottomLeftFirst[0] && bottomRightSecond[1] < bottomLeftFirst[1] &&
    bottomRightSecond[0] < topRightFirst[0] && bottomRightSecond[1] > topRightFirst[1] &&
    bottomRightSecond[0] < bottomRightFirst[0] && bottomRightSecond[1] < bottomRightFirst[1]

    // ||

    // rightSideFirst > leftSideSecond &&
    // leftSideFirst < rightSideSecond &&
    // bottomSideFirst > topSideSecond && 
    // topSideFirst < bottomSideSecond &&
    // frontSideFirst > backSideSecond &&
    // backSideFirst < frontSideSecond
  ) {
    return true;
  }
  return false;
}

//TESTING SOMETHING

// function intersects2(
//   firstTopLeftX, firstTopLeftY, firstTopRightX, firstTopRightY, firstBottomLeftX, firstBottomLeftY, firstBottomRightX, firstBottomRightY,
//   secondTopLeftX, secondTopLeftY, secondTopRightX, secondTopRightY, secondBottomLeftX, secondBottomLeftY, secondBottomRightX, secondBottomRightY,
// ) {
//   if (
 
//   ) {
//     return true;
//   }
//   return false;
// }
// function setup() {
//   createCanvas(windowWidth, windowHeight);
// }

let color = 225;

function draw() {
  background(0);
  //TESTING SOMETHING
  firstTopLeftX = 200;
  firstTopLeftY = 200;

  firstTopRightX = 400
  firstTopRightY = 200;

  firstBottomLeftX = 190;
  firstBottomLeftY = 400;

  firstBottomRightX = 400;
  firstBottomRightY = 500;


  secondTopLeftX = 700;
  secondTopLeftY = 200;
  secondTopRightX = 800;
  secondTopRightY = 200;
  secondBottomLeftX = 600;
  secondBottomLeftY = 500;
  secondBottomRightX = 900;
  secondBottomRightY = 400;

  let rect1posX = mouseX;
  let rect1posY = mouseY;
  let rect2sizeX = 125;
  let rect2sizeY = 345;

  rectMode(CENTER);
  push()
  translate(rect1posX-firstTopLeftX,rect1posY-firstBottomRightY);
  fill(255)
  quad(firstTopLeftX, firstTopLeftY, firstTopRightX, firstTopRightY, firstBottomRightX, firstBottomRightY, firstBottomLeftX, firstBottomLeftY);
  pop();

  push()
  fill(color)
  quad(secondTopLeftX, secondTopLeftY, secondTopRightX, secondTopRightY, secondBottomRightX, secondBottomRightY, secondBottomLeftX, secondBottomLeftY);
  pop();

  // function intersects(
  //   firstRectPosX, firstRectPosY, firstRectPosZ, firstRectWidth, firstRectHeight, firstRectDepth,
  //   secondRectPosX, secondRectPosY, secondRectPosZ, secondRectWidth, secondRectHeight, secondRectDepth
  // ) {

}