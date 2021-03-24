function intersects(
  firstRectPosX, firstRectPosY, firstRectPosZ, firstRectWidth, firstRectHeight, firstRectDepth,
  secondRectPosX, secondRectPosY, secondRectPosZ, secondRectWidth, secondRectHeight, secondRectDepth
) {
  // UNCOMMENT THE COMMENTED FILES TO CHECK THE CORNERS OF 2 DIMENSIONS, 
  // PART 1 CORNER

  // let topLeftFirst = [];
  // let topRightFirst = [];
  // let bottomLeftFirst = [];
  // let bottomRightFirst = [];

  // let topLeftSecond = [];
  // let topRightSecond = [];
  // let bottomLeftSecond = [];
  // let bottomRightSecond = [];

  rightSideFirst = firstRectPosX + firstRectWidth / 2;
  leftSideFirst = firstRectPosX - firstRectWidth / 2;
  bottomSideFirst = firstRectPosY + firstRectHeight / 2;
  topSideFirst = firstRectPosY - firstRectHeight / 2;
  frontSideFirst = firstRectPosZ + firstRectDepth / 2; //DEPTH
  backSideFirst = firstRectPosZ - firstRectDepth / 2; //DEPTH

  rightSideSecond = secondRectPosX + secondRectWidth / 2;
  leftSideSecond = secondRectPosX - secondRectWidth / 2;
  bottomSideSecond = secondRectPosY + secondRectHeight / 2;
  topSideSecond = secondRectPosY - secondRectHeight / 2;
  frontSideSecond = secondRectPosZ + secondRectDepth / 2; //DEPTH
  backSideSecond = secondRectPosZ - secondRectDepth / 2; //DEPTH


  //PART 2 CORNER
  // topLeftFirst = [firstRectPosX - firstRectWidth / 2, firstRectPosY - firstRectHeight / 2]
  // topRightFirst = [firstRectPosX + firstRectWidth / 2, firstRectPosY - firstRectHeight / 2]
  // bottomLeftFirst = [firstRectPosX - firstRectWidth / 2, firstRectPosY + firstRectHeight / 2]
  // bottomRightFirst = [firstRectPosX + firstRectWidth / 2, firstRectPosY + firstRectHeight / 2]

  // topLeftSecond = [secondRectPosX - secondRectWidth / 2, secondRectPosY - secondRectHeight / 2]
  // topRightSecond = [secondRectPosX + secondRectWidth / 2, secondRectPosY - secondRectHeight / 2]
  // bottomLeftSecond = [secondRectPosX - secondRectWidth / 2, secondRectPosY + secondRectHeight / 2]
  // bottomRightSecond = [secondRectPosX + secondRectWidth / 2, secondRectPosY + secondRectHeight / 2]

  if (
    //PART 3 CORNER
    // bottomLeftFirst[0] < topRightSecond[0] && bottomLeftFirst[1] > topRightSecond[1] &&
    // bottomLeftFirst[0] > topLeftSecond[0] && bottomLeftFirst[1] > topLeftSecond[1] &&
    // bottomLeftFirst[0] < bottomRightSecond[0] && bottomLeftFirst[1] < bottomRightSecond[1] &&
    // bottomLeftFirst[0] > bottomLeftSecond[0] && bottomLeftFirst[1] < bottomLeftSecond[1] ||

    // topLeftFirst[0] < bottomRightSecond[0] && topLeftFirst[1] < bottomRightSecond[1] &&
    // topLeftFirst[0] < topRightSecond[0] && topLeftFirst[1] > topRightSecond[1] &&
    // topLeftFirst[0] > bottomLeftSecond[0] && topLeftFirst[1] < bottomLeftSecond[1] &&
    // topLeftFirst[0] > topLeftSecond[0] && topLeftFirst[1] > topLeftSecond[1] ||

    // topRightFirst[0] > bottomLeftSecond[0] && topRightFirst[1] < bottomLeftSecond[1] &&
    // topRightFirst[0] > topLeftSecond[0] && topRightFirst[1] > topLeftSecond[1] &&
    // topRightFirst[0] < topRightSecond[0] && topRightFirst[1] > topRightSecond[1] &&
    // topRightFirst[0] < bottomRightSecond[0] && topRightFirst[1] < bottomRightSecond[1] ||

    // bottomRightFirst[0] > topLeftSecond[0] && bottomRightFirst[1] > topLeftSecond[1] &&
    // bottomRightFirst[0] > bottomLeftSecond[0] && bottomRightFirst[1] < bottomLeftSecond[1] &&
    // bottomRightFirst[0] < topRightSecond[1] && bottomRightFirst[1] > topRightSecond[1] &&
    // bottomRightFirst[0] < bottomRightSecond[1] && bottomRightFirst[1] < bottomRightSecond[1] ||


    // bottomLeftSecond[0] < topRightFirst[0] && bottomLeftSecond[1] > topRightFirst[1] &&
    // bottomLeftSecond[0] > topLeftFirst[0] && bottomLeftSecond[1] > topLeftFirst[1] &&
    // bottomLeftSecond[0] < bottomRightFirst[0] && bottomLeftSecond[1] < bottomRightFirst[1] &&
    // bottomLeftSecond[0] > bottomLeftFirst[0] && bottomLeftSecond[1] < bottomLeftFirst[1] ||

    // topLeftSecond[0] < bottomRightFirst[0] && topLeftSecond[1] < bottomRightFirst[1] &&
    // topLeftSecond[0] < topRightFirst[0] && topLeftSecond[1] > topRightFirst[1] &&
    // topLeftSecond[0] > bottomLeftFirst[0] && topLeftSecond[1] < bottomLeftFirst[1] &&
    // topLeftSecond[0] > topLeftFirst[0] && topLeftSecond[1] > topLeftFirst[1] ||

    // topRightSecond[0] > bottomLeftFirst[0] && topRightSecond[1] < bottomLeftFirst[1] &&
    // topRightSecond[0] > topLeftFirst[0] && topRightSecond[1] > topLeftFirst[1] &&
    // topRightSecond[0] < topRightFirst[0] && topRightSecond[1] > topRightFirst[1] &&
    // topRightSecond[0] < bottomRightFirst[0] && topRightSecond[1] < bottomRightFirst[1] ||

    // bottomRightSecond[0] > topLeftFirst[0] && bottomRightSecond[1] > topLeftFirst[1] &&
    // bottomRightSecond[0] > bottomLeftFirst[0] && bottomRightSecond[1] < bottomLeftFirst[1] &&
    // bottomRightSecond[0] < topRightFirst[1] && bottomRightSecond[1] > topRightFirst[1] &&
    // bottomRightSecond[0] < bottomRightFirst[1] && bottomRightSecond[1] < bottomRightFirst[1] ||

    rightSideFirst > leftSideSecond &&
    leftSideFirst < rightSideSecond &&
    bottomSideFirst > topSideSecond && 
    topSideFirst < bottomSideSecond &&
    frontSideFirst > backSideSecond &&
    backSideFirst < frontSideSecond
  ) {
    return true;
  }
  return false;
}