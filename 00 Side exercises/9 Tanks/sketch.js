//#region variables

let collision = false;
let sine;

let sky1;
let sand1;
let brick;
let tree1;
let barbedWire;
let grass;
let grassTexture;
let tree1Texture;

let tree1Array = [];
let walls = [];
let grassArray = [];

// 

let rotX = 0;
let rotXSpeed = 5;

let rotY = 0;
let rotYSpeed = 5;




let brickSlices = 200;

let tankModel;
let t34Texture;
// let playerT34 = [];

// let tank = [];





// let moveX;
// let moveY;

let tankRadius;

let otherTanks = [];

let lockOn = false;
let materialVariables = {

}


//#region CAMERA
class Camera {
  constructor() {
    this.body = 0;
    this.mode = 2;

    this.xPosition = 0;
    this.xPositionSpeed = 0;

    this.yPosition = 0;
    this.yPositionSpeed = 0;

    this.zPosition = 0;
    this.zPositionSpeed = 0;
  }
}
let camera = new Camera()
//#endregion


//#region ENVIRONMENT 

class Environment {
  constructor() {
    this.gravity = [0, 0.981, 0];
    this.sky = [];
  }
}

class Elements {
  constructor(x, y, z, radius) {
    this.pos = createVector(x, y, z);
    this.vel = createVector();
    this.acc = createVector();

    this.ang = createVector(0, 0, 0);
    this.acc2 = createVector();

    this.rot = createVector();
    this.radius = radius;

    this.dirX;
    this.dirY;

    this.acc.add(environment.gravity[0], environment.gravity[1], environment.gravity[2]);

    this.colided = false;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  updatePlayer() {
    if (keyIsDown(104)) {
      this.acc.z = -this.dirY;
      this.acc.x = this.dirX;

    } else {
      this.vel.z /= 1.1;
      this.vel.x /= 1.1;
    }

    if (keyIsDown(101)) {
      this.acc.z = this.dirY;
      this.acc.x = -this.dirX;
    } else {
      this.vel.z /= 1.1;
      this.vel.x /= 1.1;
    }

    if (keyIsDown(102)) {
      this.acc2.x = 5
    }
    else { this.acc2.x = 0 }

    if (keyIsDown(100)) {
      this.acc2.x = -5;
    }

    this.vel.limit(100);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0);

    this.rot.limit(500);
    this.ang.add(this.acc2);
    this.rot.add(this.ang);
    this.acc2.set(0);

    this.dirX = map(-sin(this.ang.x / 100), 0, 628, 0, 360);
    this.dirY = map(-cos(this.ang.x / 100), 0, 628, 0, 360);

    camDirX = this.dirX;
  }

  updateOther() {
    this.vel.limit(100);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0);
    this.rot.limit(500);
    this.ang.add(this.acc2);
    this.rot.add(this.ang);
    this.acc2.set(0);
  }

  edges() {
    if (this.pos.y >= 0) {
      this.pos.y = 0;
      this.vel.y *= -0.5;
    }
  }

  // show() {

  //   push();  
  //   this.ang.x > 625 || this.ang.x < -625 ? this.ang.x = 0 : false;

  //   translate(this.pos.x, this.pos.y + 100, this.pos.z);
  //   rotateY(-this.ang.x / 100);
  //   // rotate(1)

  //   if (this.pos.x > camera.xPosition + 300) { camera.xPosition = camera.xPosition - this.vel.x / 2.5 }
  //   if (this.pos.x < camera.xPosition - 300) { camera.xPosition = camera.xPosition - this.vel.x / 2.5 }

  //   if (this.pos.z > camera.zPosition + 100) { camera.zPosition = camera.zPosition - this.vel.z / 2 }
  //   if (this.pos.z < camera.zPosition - 100) { camera.zPosition = camera.zPosition - this.vel.z / 2 }

  //   rotateZ(PI);
  //   scale(25);
  //   //box(100);
  //   noStroke();
  //   ambientMaterial(100);
  //   texture(t34Texture);
  //   model(tankModel);
  //   pop();

  // }

  //   collision(walls) {
  //     let distance = dist(this.pos.x, this.pos.z, walls.xPos, walls.yPos);
  //     // console.log(distance);
  //     if (distance < this.radius + walls.radius) {
  //       this.colided = true;
  //       this.pos.x = this.pos.x + (this.pos.x - walls.xPos) / 25;
  //       this.pos.z = this.pos.z + (this.pos.z - walls.yPos) / 25;
  //     } else {
  //       this.colided = false;
  //     }
  //   }

  // }
}


class Bank extends Elements {
  constructor() {
    super();
  }
}

//#endregion


class Collision extends Environment {
  constructor() {
    super()
    this.objects = [];
  }

  collision() {
    if (this.objects.length > 0) {
      for (let i = 0; i < this.objects.length; i++) {
        for (let g = i + 1; g < this.objects.length; g++) {
          let distance = dist(this.objects[i].pos.x, this.objects[i].pos.y, this.objects[i].pos.z, this.objects[g].pos.x, this.objects[g].pos.y, this.objects[g].pos.z);

          if (distance < this.objects[i].radius + this.objects[g].radius) {

            this.objects[i].colided = true;
            this.objects[g].colided = true;

            this.objects[i].pos.x = this.objects[i].pos.x + (this.objects[i].pos.x - this.objects[g].pos.x) / 25;
            this.objects[i].pos.y = this.objects[i].pos.y + (this.objects[i].pos.y - this.objects[g].pos.y) / 25;
            this.objects[i].pos.z = this.objects[i].pos.z + (this.objects[i].pos.z - this.objects[g].pos.z) / 25;

          }
          else {
            this.objects[i].colided = false;
            this.objects[g].colided = false;
          }
        }
      }



    }

  }
}

class Terrain extends Environment {
  constructor() {
    super();

    this.objects = {
      grass: [],
    }
  }

  show() {
    //background(200, 240, 255);
    //clear();
    push()
    translate(0, 100, 0)
    rotateX(PI / 2);
    ambientMaterial(0);
    texture(sand1);
    noStroke();
    plane(width * 10, height * 10);

    //console.log(frameCount);

    pop();
    //   
  }

}
class Grass {
  constructor(x = 0, y = -100, z = 0, rotateX = PI, rotateY = 0, model = grass) {
    this.pos = createVector(x, y, z)
    this.rotateX = rotateX;
    this.rotateY = rotateY;
    this.radius = 1;
    this.scale = random(1, 30)

    this.model = model;

  }
  show() {
    push();

    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateY(this.rotateY);
    rotateX(this.rotateX)

    scale(this.scale);
    noStroke();
    // ambientMaterial(0);
    texture(grassTexture);
    model(this.model);
    noFill();
    pop();
  }
}

class Tree {
  constructor(x = 0, y = -100, z = 0, rotateX = PI, rotateY = 0, rotateZ = 0, model = tree1, texture = tree1Texture) {
    this.pos = createVector(x, y, z)

    this.rotateX = rotateX;
    this.rotateY = random(0, 4);
    this.rotateZ = rotateZ;
    this.radius = 50;
    this.playerTank = false;

    this.scale = random(0.05, 0.5)
    this.model = model;
    this.texture = texture;
    this.colided = false;

    collisionClass.objects.push(this);

  }
  show() {
    push();

    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateX(this.rotateX);
    rotateY(this.rotateY);
    rotateZ(this.rotateZ);


    scale(this.scale);
    noStroke();
    // ambientMaterial(0);
    texture(this.texture);
    model(this.model);
    noFill();
    pop();
  }
}

class Sky extends Environment {
  constructor(x = 0, y = 0, z = 0, textureFileUrl = sky1) {
    super();
    this.position = createVector(x, y, z)
    this.textureFileUrl = textureFileUrl;
  }

  show() {
    push();

    translate(this.position.x, this.position.y, this.position.z);
    // rotateZ(PI/2);
    noStroke();
    texture(this.textureFileUrl);
    sphere(8000, 24, 24);
    noFill();
    pop();
  }
  // show() {

  // }
}
class Walls extends Environment {
  constructor(xPos = 0, yPos = 0, rotateY = 0, texture = brick) {
    super();
    this.xPos = xPos;
    this.yPos = yPos;
    this.rotateY = rotateY;
    this.length = 200;
    this.width = 5;
    this.radius = 100;

    this.texture = texture;

  }
  show() {

    push();
    //rotateZ(PI/2);
    translate(this.xPos, 50, this.yPos);
    rotateY(this.rotateY);
    noStroke();
    ambientMaterial(0);
    texture(this.texture);
    box(10, 100, 200);
    noFill();
    pop();
  }

  // collision(object) {
  //   let distance = dist(this.xPos, this.yPos, object.pos.x, object.pos.z);
  //   if (distance < this.radius + object.radius) {
  //     collision = true;
  //   } else {
  //     collision = false;
  //   }
  // }

  // wallX(slices = 200, xPos = 0, yPos = 0, d = brick, e = PI / 2) {
  //   //   slices = number of slices
  //   //   xPos = horizontal pos
  //   //   yPos = vertical pos
  //   //   d = material
  //   //   e = rotation

  //   slices = slices * brickSlices
  //   for (let i = 0; i < slices; i += 200) {
  //     let w = new Walls(i - xPos, yPos, d, e);
  //     walls.push(w);

  //     // w.show();
  //     // w.collision(pTank);
  //   }
  // }

}
//#endregion

//#region PRELOAD
//PRELOAD ALL DATA
function preload() {
  sky1 = loadImage("files/background/sky20.jpg");
  sand1 = loadImage("files/background/sand2.jpg");
  brick = loadImage("files/background/brick.jpg");
  tankModel = loadModel("files/models/t34.obj");
  tree1 = loadModel("files/models/scenery/trees/tree1noleaves.obj");
  // wire = loadModel("files/models/scenery/objects/barbedWire.obj");

  // grass = loadModel("files/models/scenery/grass/Grass.obj");
  grass = loadModel("files/models/scenery/grass/spiderPlant_nt.obj");

  // tankModel = loadModel("files/models/tankModels/M1A1/M1A1.obj");
  // tankModel = loadModel("files/models/scenery/objects/sandBag.obj");

  t34Texture = loadImage("files/textures/t34Texture.jpg");
  grassTexture = loadImage("files/models/scenery/grass/spiderPlant_nt/Spider_leaf_clean.png");
  tree1Texture = loadImage("files/models/scenery/trees/tree1noleaves/tree1.jpg");
}
//#endregion

//#region SETUP
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  camera.body = createCamera();

  environment.sky = new Sky(0, 0, 0);
  let bank = new Bank()
  console.log(bank);

  for (let tankCount = 0; tankCount < 5; tankCount++) {
    otherTanks.push(new Tank(-100, -100, -500 - (tankCount * 500)))
  }

  for (let grassCount = 0; grassCount < 100; grassCount++) {
    grassArray.push(new Grass(random(-3000, 3000), 110, random(-3000, 3000), PI))
  }

  for (let treeCount = 0; treeCount < 30; treeCount++) {
    tree1Array.push(new Tree(random(-5000, 5000), 110, random(-3000, 3000), PI))
  }
  // otherTanks = new Tank(-100, -100, -500)
  // otherTanks2 = new Tank(-100, -100, -1000)
  console.log();
  pTank = new Tank(-300, -100, 0, true);

  let horizontalWallPosition = 3000;
  let verticalWallPosition = -900;

  for (let blocks = 1; blocks < 100; blocks++) {
    let piArray = [PI, PI / 2];
    let randomPi = piArray[Math.floor(Math.random() * 2)]

    if (randomPi == PI) {
      let phaseShifter = [-1, 1];
      let randomPhase = phaseShifter[Math.floor(Math.random() * 2)]
      horizontalWallPosition += 500 * (Math.random() + 0.1) * randomPhase;
      walls.push(new Walls(horizontalWallPosition, verticalWallPosition, PI / 2))
    }
    else {
      let phaseShifter = [-1, 1];
      let randomPhase = phaseShifter[Math.floor(Math.random() * 2)]
      verticalWallPosition += 500 * (Math.random() + 0.1) * randomPhase
      walls.push(new Walls(horizontalWallPosition, verticalWallPosition, PI))
    }
  }
}
//#endregion

//#region DRAW
function draw() {

  // frameCount(1);
  //frameRate(0.0025)
  collisionClass.collision();
  // THIS IS TEMPORARY
  // camera.body.eyeX = 0
  // camera.body.eyeY = -3197
  // camera.body.eyeZ = 2589
  // camera.mode = 0;
  ////////

  // background(150);
  ambientLight(255);



  for (let wall of walls) {
    wall.show();
  }

  for (let each of grassArray) {
    each.show();
  }

  // for (let each of tree1Array) {
  //   each.show();
  // }

  //CAMERA
  //CLICK MOUSE TO LOOK AROUND
  if (lockOn) {
    camera.body.pan(-movedX * 0.002);
    camera.body.tilt(movedY * 0.002);
  }

  // camera.body.pan(-movedX * 0.002);
  // camera.body.tilt(movedY * 0.002);

  //MOVE AROUND WITH W/S/A/D
  keyIsDown(87) ? camera.body.move(0, 0, -5) : false; //W  FORWARD
  keyIsDown(83) ? camera.body.move(0, 0, 5) : false;  //S  BACKWARD
  keyIsDown(65) ? camera.body.move(-5, 0, 0) : false; //A  LEFT
  keyIsDown(68) ? camera.body.move(5, 0, 0) : false;  //D  RIGHT
  keyIsDown(69) ? camera.body.move(0, -5, 0) : false;  //Q  DOWN
  keyIsDown(81) ? camera.body.move(0, 5, 0) : false;  //E UP 

  //BOUNDRY FOR FLOOR
  camera.body.eyeY > 0 ? camera.body.setPosition(camera.body.eyeX, 0, camera.body.eyeZ) : false;


  //FREE MOVING CAMERA
  camera.mode === 0 ? camera.body.setPosition(camera.body.eyeX, camera.body.eyeY, camera.body.eyeZ) // FREE LOOK
    : camera.mode === 1 ? camera.body.setPosition(camera.body.eyeX, 0, camera.body.eyeZ) //GROUND LOOK
      : camera.mode === 2 ? camera.body.setPosition(pTank.pos.x, 0, pTank.pos.z) //FIRST PERSON
        : false;



  //FPS CAMERA CONDITIONS
  keyIsDown(100) && camera.mode === 2 ? camera.body.pan(0.05) : false;
  keyIsDown(102) && camera.mode === 2 ? camera.body.pan(-0.05) : false;



  //DRAW TERRAIN
  terrain.show();

  // Walls.wallX(6, 0);
  keyCommands();


  if (mouseIsPressed) {
    let wind = createVector(0.01, 0, 0);
    pTank.applyForce(wind);
    //requestPointerLock();

    if (!lockOn) {
      lockOn = true;
      requestPointerLock();
    } else {
      exitPointerLock();
      lockOn = false;
    }
  }





  // playerT34.push(pTank);
  // otherTanks.update();

  // for (let tank of otherTanks) {

  //   //console.log(tank.colided);
  //   // if (tank.colided === true) {
  //   //   otherTanks.splice(tank, 1)
  //   //   break;
  //   // }
  // }

  //collisionClass.objects[i].show();

  for (let i = 0; i < collisionClass.objects.length; i++) {
    if ((collisionClass.objects[i] instanceof Tank) === true) {
      collisionClass.objects[i].applyForce(createVector(environment.gravity[0], environment.gravity[1], environment.gravity[2]));
      if (collisionClass.objects[i].playerTank === true) {
        collisionClass.objects[i].updatePlayer();
      }
      else {
        collisionClass.objects[i].updateOther();
      }
      collisionClass.objects[i].edges();
    }

    if (collisionClass.objects[i].colided === true && collisionClass.objects[i].playerTank === false) {
      collisionClass.objects.splice(i, 1);
    }
    else continue;
  }

  for (let object of collisionClass.objects) { object.show(); }


  // pTank.applyForce(createVector(environment.gravity[0], environment.gravity[1], environment.gravity[2]));
  // pTank.updatePlayer();
  // pTank.show();
  // pTank.edges();

  environment.sky.show();
  environment.sky.position.set(pTank.pos.x, 100, pTank.pos.z)






  // walls.forEach(wall => pTank.collision(wall))

  // for (let wall of walls){
  for (let wall of walls) {
    pTank.collision(wall);
    if (pTank.colided === true) {
      break;
    }
    else continue;
  }
  // console.log(walls[1]);


  // console.log(wall);
  // }
  //pTank.collision(walls[0])

  // playerT34.splice(pTank, 1)

  // console.log(pTank.colided);
  // console.log( walls.forEach(wall => pTank.collision(wall)));

}

//#endregion


//#region KEYCOMMANDS
function keyCommands() {


  if (keyIsDown(69)) {
    camera.yPositionSpeed = 5;
  }
  else { camera.yPositionSpeed = 0 }
  if (keyIsDown(81)) {
    camera.yPositionSpeed = -5;
  }


  // if (keyIsDown(101)) {
  //   rotYSpeed = 5;
  // }
  // else { rotYSpeed = 0}
  // if (keyIsDown(104)) {
  //   rotYSpeed = -5;
  // }

  //  if (keyIsDown(102)) {
  //   rotXSpeed = 5;
  // }
  // else { rotXSpeed = 0}
  // if (keyIsDown(100)) {
  //   rotXSpeed = -5;
  // }


}
//#endregion

//#region TANK
let camDirX = 0;
class Tank {

  constructor(x, y, z, playerTank = false, driverName = `AI`) {

    this.pos = createVector(x, y, z);
    //this.vel = createVector(1, -1);
    // this.vel = p5.Vector.random2D()
    // this.vel.mult(random(0, 3));
    this.vel = createVector();
    this.acc = createVector();

    this.ang = createVector(-315, 0, 0);
    this.acc2 = createVector();

    this.rot = createVector();
    this.radius = 80;

    this.dirX;
    this.dirY;

    this.driverName = driverName;
    this.playerTank = playerTank;


    tankRadius = this.radius;

    // this.x = x;
    // this.y = y;
    this.acc.add(environment.gravity[0], environment.gravity[1], environment.gravity[2]);

    this.colided = false;

    collisionClass.objects.push(this);
  }



  applyForce(force) {
    this.acc.add(force);
  }

  updatePlayer() {
    if (keyIsDown(104)) {
      this.acc.z = -this.dirY;
      this.acc.x = this.dirX;

    } else {
      this.vel.z /= 1.1;
      this.vel.x /= 1.1;
    }

    if (keyIsDown(101)) {
      this.acc.z = this.dirY;
      this.acc.x = -this.dirX;
    } else {
      this.vel.z /= 1.1;
      this.vel.x /= 1.1;
    }

    if (keyIsDown(102)) {
      this.acc2.x = 5
    }
    else { this.acc2.x = 0 }

    if (keyIsDown(100)) {
      this.acc2.x = -5;
    }

    this.vel.limit(100);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0);

    this.rot.limit(500);
    this.ang.add(this.acc2);
    this.rot.add(this.ang);
    this.acc2.set(0);


    this.dirX = map(-sin(this.ang.x / 100), 0, 628, 0, 360);
    this.dirY = map(-cos(this.ang.x / 100), 0, 628, 0, 360);

    camDirX = this.dirX;
  }

  updateOther() {
    //     let mouse = createVector(mouseX,mouseY);
    //     this.acc = p5.Vector.sub(mouse,this.pos);
    //     this.acc.setMag(0.05);
    // let control = createVector(dirX,0 ,dirY);


    //this.acc = p5.Vector.random2D()
    // this.vel = p5.Vector.sub(mouse,this.pos);
    //this.acc.setMag(0.5);



    this.vel.limit(100);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0);



    this.rot.limit(500);
    this.ang.add(this.acc2);
    this.rot.add(this.ang);
    this.acc2.set(0);


    // dirX = map(-sin(this.ang.x / 100), 0, 628, 0, 360);
    // dirY = map(-cos(this.ang.x / 100), 0, 628, 0, 360);
  }


  edges() {
    if (this.pos.y >= 0) {
      this.pos.y = 0;
      this.vel.y *= -0.5;
    }



  }



  show() {

    push();
    // console.log(this.pos.x);
    //limit the counter of the angle
    this.ang.x > 625 || this.ang.x < -625 ? this.ang.x = 0 : false;

    translate(this.pos.x, this.pos.y + 100, this.pos.z);
    rotateY(-this.ang.x / 100);
    // rotate(1)

    if (this.pos.x > camera.xPosition + 300) { camera.xPosition = camera.xPosition - this.vel.x / 2.5 }
    if (this.pos.x < camera.xPosition - 300) { camera.xPosition = camera.xPosition - this.vel.x / 2.5 }

    if (this.pos.z > camera.zPosition + 100) { camera.zPosition = camera.zPosition - this.vel.z / 2 }
    if (this.pos.z < camera.zPosition - 100) { camera.zPosition = camera.zPosition - this.vel.z / 2 }

    rotateZ(PI);
    scale(25);
    //box(100);
    noStroke();
    ambientMaterial(100);
    texture(t34Texture);
    model(tankModel);
    pop();

  }

  collision(walls) {
    let distance = dist(this.pos.x, this.pos.z, walls.xPos, walls.yPos);
    // console.log(distance);
    if (distance < this.radius + walls.radius) {
      this.colided = true;
      this.pos.x = this.pos.x + (this.pos.x - walls.xPos) / 25;
      this.pos.z = this.pos.z + (this.pos.z - walls.yPos) / 25;
    } else {
      this.colided = false;
    }
  }

}
//#endregion

let environment = new Environment();
let terrain = new Terrain();
let collisionClass = new Collision();


console.log(grassArray);
keyPressed = () => {
  keyCode === 67 ? camera.mode++ : null;
  camera.mode === 4 ? camera.mode = 0 : null;
}

// setInterval(() => {
//   console.log(Math.floor(camera.body.eyeX), Math.floor(camera.body.eyeY), Math.floor(camera.body.eyeZ));

// }, 1000)

