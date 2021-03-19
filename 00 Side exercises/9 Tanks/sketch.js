//#region variables
let collisionClass;
let collision = false;
let sine;

let terrain = [];

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

let rotX = 0;
let rotXSpeed = 5;

let rotY = 0;
let rotYSpeed = 5;

let brickSlices = 200;

let tankModel;
let t34Texture;

let shellHESH;

let tankRadius;

let otherTanks = [];

let shells = [];

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
    this.sky;
  }
}
class Elements extends Environment {
  constructor(x, y, z, radius) {
    super();
    this.pos = createVector(x, y, z);
    this.vel = createVector();
    this.acc = createVector();

    this.ang = createVector(0, 0, 0);
    this.acc2 = createVector();

    this.rot = createVector();
    this.radius = radius;

    this.dirX;
    this.dirY;

    this.acc.add(this.gravity[0], this.gravity[1], this.gravity[2]);

    this.setCollision = true;
    this.colided = false;

    this.playerTank = false;
    this.mass = 1;

    this.isDead = false;
  }
  applyForce(force) {
    this.acc.add(force);
  }
  playerControlled() {
    if (keyIsDown(104)) {
      this.acc.z = -this.dirY
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
    else {
      this.acc2.x = 0
    }

    if (keyIsDown(100)) {
      this.acc2.x = -5;
    }

    this.vel.limit(30);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0);

    this.rot.limit(500);
    this.ang.add(this.acc2);
    this.rot.add(this.ang);
    this.acc2.set(0);

    this.dirX = map(sin(this.ang.x / 100), 0, 628, 0, 360);
    this.dirY = map(cos(this.ang.x / 100), 0, 628, 0, 360);
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

    this.dirX = map(sin(this.ang.x / 100), 0, 628, 0, 360);
    this.dirY = map(cos(this.ang.x / 100), 0, 628, 0, 360);
  }

  edges() {
    if (this.pos.y >= 0) {
      this.pos.y = 0;
      this.vel.y *= -0.5;
    }
  }
}
class Collision extends Environment {
  constructor() {
    super()
    this.objects = [];
  }

  collision() {
    if (this.objects.length > 0) {
      for (let i = 0; i < this.objects.length; i++) {
        for (let g = i + 1; g < this.objects.length; g++) {

          if (this.objects[i].setCollision === true && this.objects[g].setCollision === true) {

            //IF SHELL FALLS ON GROUND TO SELF-DESTRY
            if ((this.objects[g] instanceof Shell) && this.objects[g].pos.y >= 0) {
              this.objects.splice(g, 1);
              grassArray.splice(0, 1)
              continue;
            }
            else {
              let distance = dist(this.objects[i].pos.x, this.objects[i].pos.y, this.objects[i].pos.z, this.objects[g].pos.x, this.objects[g].pos.y, this.objects[g].pos.z);
              if (distance < (this.objects[i].radius + this.objects[g].radius) * 1.05) {
                
                //IF SHELL HITS TARGET
                if ((this.objects[g] instanceof Shell)) {
                 
                  this.objects[i].vel.x = this.objects[g].vel.x/this.objects[i].mass/5
                  this.objects[i].vel.z = this.objects[g].vel.z/this.objects[i].mass/5
                
                  this.objects[i].vel.y = random(0,100)+20/this.objects[i].mass/5

                  this.objects[i].ang.y = random(0,300)+100;
                  this.objects[i].ang.x = -random(0,300)-100;
                  this.objects[i].ang.z = -random(0,300)-100;

                  this.objects[i].isDead = true;
                  this.objects[g].isDead = true;
 
                  this.objects[i].setCollision = false;
                  
                  //SHELL IS ALWAYS SECOND OBJECT BECAUSE IS CREATED LATER IN ARRAY
                  this.objects.splice(g, 1);
                  

                  //TIMEOUT TO SPLICE THE OBJECT FROM THE ARRAY AFTER SOME ANIMATION
                  setTimeout(() => {
                  this.objects.splice(i, 1);

                  }, 3000)

                  continue;
                }

                else if ((this.objects[i] instanceof Tank) === (this.objects[g] instanceof Tank)) {
                  this.objects[i].colided = true;
                  this.objects[g].colided = true;

                  this.objects[i].vel.x /= this.objects[g].mass
                  this.objects[i].vel.y /= this.objects[g].mass
                  this.objects[i].vel.z /= this.objects[g].mass


                  if (distance < (this.objects[i].radius + this.objects[g].radius)) {
                    this.objects[g].vel.x = this.objects[i].vel.x * this.objects[g].mass
                    this.objects[g].vel.y = this.objects[i].vel.y * this.objects[g].mass
                    this.objects[g].vel.z = this.objects[i].vel.z * this.objects[g].mass
                  }
                  //THIS HELPS SO THE TANKS DONT STICK
                  this.objects[g].pos.x -= ((this.objects[i].pos.x - this.objects[g].pos.x) / 500)
                  this.objects[g].pos.y -= ((this.objects[i].pos.y - this.objects[g].pos.y) / 500)
                  this.objects[g].pos.z -= ((this.objects[i].pos.z - this.objects[g].pos.z) / 500)
                }

                //CHECK THE COLLISION FOR THREES
                if ((this.objects[i] instanceof Tree) || (this.objects[g] instanceof Tree)) {
                  this.objects[i].colided = true;
                  this.objects[g].colided = true;

                  this.objects[i].vel.x /= this.objects[g].mass
                  this.objects[i].vel.y /= this.objects[g].mass
                  this.objects[i].vel.z /= this.objects[g].mass

                  if (distance < (this.objects[i].radius + this.objects[g].radius)) {
                    this.objects[g].vel.x = this.objects[i].vel.x * this.objects[g].mass
                    this.objects[g].vel.y = this.objects[i].vel.y * this.objects[g].mass
                    this.objects[g].vel.z = this.objects[i].vel.z * this.objects[g].mass

                    //WHEN TREE IS COLLIDED, IT FLIPS OVER, AND THERE IS A DIFFERENCE BETWEEN LARGE AND SMALL TREE BECAUSE OF MASS, AND IF THE TREE IS FLIPPED OVER LOT, I FLIPS EVEN FASTER
                    this.objects[g].rotateZ += ((1 / (this.objects[g].mass - 1)) / 400) * 1 + this.objects[g].rotateZ / 20


                    if (this.objects[g].rotateZ > 1.5) {
                      this.objects[g].setCollision = false;

                      this.objects[g].vel.x = 0;
                      this.objects[g].vel.y = 0;
                      this.objects[g].vel.z = 0;
                      //this.objects.splice(g, 1);
                    }

                  }
                  //THIS HELPS SO THE TANKS DONT STICK
                  this.objects[g].pos.x -= ((this.objects[i].pos.x - this.objects[g].pos.x) / 500)
                  this.objects[g].pos.y -= ((this.objects[i].pos.y - this.objects[g].pos.y) / 500)
                  this.objects[g].pos.z -= ((this.objects[i].pos.z - this.objects[g].pos.z) / 500)
                }

                //WALLS
                if ((this.objects[i] instanceof Walls) || (this.objects[g] instanceof Walls)) {
                  this.objects[i].colided = true;
                  this.objects[g].colided = true;

                  this.objects[i].vel.x /= this.objects[g].mass
                  this.objects[i].vel.y /= this.objects[g].mass
                  this.objects[i].vel.z /= this.objects[g].mass

                  if (distance < (this.objects[i].radius + this.objects[g].radius)) {
                    this.objects[g].vel.x = this.objects[i].vel.x * this.objects[g].mass
                    this.objects[g].vel.y = this.objects[i].vel.y * this.objects[g].mass
                    this.objects[g].vel.z = this.objects[i].vel.z * this.objects[g].mass

                    //WHEN TREE IS COLLIDED, IT FLIPS OVER, AND THERE IS A DIFFERENCE BETWEEN LARGE AND SMALL TREE BECAUSE OF MASS, AND IF THE TREE IS FLIPPED OVER LOT, I FLIPS EVEN FASTER
                    this.objects[g].rotateZ += ((1 / (this.objects[g].mass - 1)) / 400) * 1 + this.objects[g].rotateZ / 20
                   
                    if (this.objects[g].rotateZ > 1.5) {
                      this.objects[g].setCollision = false;

                      this.objects[g].vel.x = 0;
                      this.objects[g].vel.y = 0;
                      this.objects[g].vel.z = 0;
                      setTimeout(()=>{
                        this.objects.splice(g, 1);
                      },30000)
                      
                    }

                  }
                  //THIS HELPS SO THE TANKS DONT STICK
                  this.objects[g].pos.x -= ((this.objects[i].pos.x - this.objects[g].pos.x) / 500)
                  this.objects[g].pos.y -= ((this.objects[i].pos.y - this.objects[g].pos.y) / 500)
                  this.objects[g].pos.z -= ((this.objects[i].pos.z - this.objects[g].pos.z) / 500)
                }
              }
              else {
                this.objects[i].colided = false;
                this.objects[g].colided = false;

                if ((this.objects[g] instanceof Shell) === false) {
                  this.objects[g].vel.x /= 1.1
                  this.objects[g].vel.y /= 1.1
                  this.objects[g].vel.z /= 1.1
                }

              }
            }            
          }
        }
      }



    }

  }
}
class Terrain extends Environment {
  constructor(x = 1000, z = 1000, texture) {
    super();

    this.x = x;
    this.z = z;

    this.texture = texture;

    this.objects = {
      grass: [],
    }
  }

  show() {
    push()
    translate(this.x, 100, this.z)
    rotateX(PI / 2);
    ambientMaterial(0);
    texture(this.texture);
    noStroke();
    plane(1000, 1000);
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
    noStroke();
    texture(this.textureFileUrl);
    sphere(((width + height) / 2) * 6, 24, 24);
    noFill();
    pop();
  }

}
class Grass extends Elements {
  constructor(x = 0, y = -100, z = 0, rotateX = PI, rotateY = 0, model = grass) {
    super(x, y, z);

    this.rotateX = rotateX;
    this.rotateY = rotateY;
    this.radius = 100;
    this.scale = random(1, 30)

    this.setCollision = false;
    this.model = model;

  }
  show() {
    push();
    translate(this.pos.x, this.pos.y + 100, this.pos.z);
    rotateY(this.rotateY);
    rotateX(this.rotateX);
    scale(this.scale);
    noStroke();
    // ambientMaterial(0);
    texture(grassTexture);
    model(this.model);
    noFill();
    pop();
  }
}
class Tree extends Elements {
  constructor(x = 0, y = -100, z = 0, rotateX = PI, rotateY = 0, rotateZ = 0, model = tree1, texture = tree1Texture) {
    super(x, y, z);
    this.rot.x = rotateX;
    this.rot.y = random(0, 4);
    this.rot.z = rotateZ;
    this.radius = 100;

    this.scale = random(0.05, 0.5)
    this.model = model;
    this.texture = texture;
    this.colided = false;

    this.mass = 5 + this.scale;
    //this.setCollision = true;


    //collisionClass.objects.push(this);

  }
  show() {
    push();
    translate(this.pos.x, this.pos.y + 110, this.pos.z);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);


    scale(this.scale);
    noStroke();
    // ambientMaterial(0);
    texture(this.texture);
    model(this.model);
    noFill();
    pop();
  }
}
class Walls extends Elements {
  constructor(x = 0, y = 50, z = 0, rotateY = 0, rotateX = 0, rotateZ = 0, texture = brick) {
    super(x, y, z);

    this.rot.x = rotateX;
    this.rot.y = rotateY;
    this.rot.z = rotateZ;

    this.length = 200;
    this.width = 5;
    this.radius = 100;
    this.mass = 20;

    this.texture = texture;
    this.setCollision = true;


  }
  show() {

    push();
    //rotateZ(PI/2);
    translate(this.pos.x, 50, this.pos.z);
    rotateY(this.rot.x);
    rotateX(this.rot.y);
    rotateZ(this.rot.z);
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
class Tank extends Elements {
  constructor(x, y, z, playerTank = false, driverName = `AI`, radius) {
    super(x, y, z, radius);

    this.radius = 80;
    this.mass = 20; // MINIMUM 1, MAXIMUM ~20

    tankRadius = this.radius;

    this.driverName = driverName;
    this.playerTank = playerTank;

    // pTank.fire()

    // collisionClass.objects.push(this);
  }

  show() {
    push();
    //limit the counter of the angle
    this.ang.x > 625 || this.ang.x < -625 ? this.ang.x = 0 : false;

    translate(this.pos.x, this.pos.y + 100, this.pos.z);
    rotateY(-this.ang.x / 100);

    if (this.pos.x > camera.xPosition + 300) { camera.xPosition = camera.xPosition - this.vel.x / 2.5 }
    if (this.pos.x < camera.xPosition - 300) { camera.xPosition = camera.xPosition - this.vel.x / 2.5 }

    if (this.pos.z > camera.zPosition + 100) { camera.zPosition = camera.zPosition - this.vel.z / 2 }
    if (this.pos.z < camera.zPosition - 100) { camera.zPosition = camera.zPosition - this.vel.z / 2 }

    rotateZ(PI);
    rotateY(PI+this.ang.y)
    rotateZ(this.ang.z);
    scale(25);
    noStroke();
    ambientMaterial(100);
    texture(t34Texture);
    model(tankModel);
    pop();
  }

  fire() {
    Shell.isFired(
      this.pos.x,
      this.pos.y,
      this.pos.z,
      this.ang.x,
      this.ang.y,
      this.ang.z,
      this.dirX,
      this.dirY,
      this.playerTank
    )
    // console.log( this.playerTank);
  }

}
class Shell extends Tank {
  constructor(x, y, z, angX, angY, angZ, dirX, dirY, playerTank, type = `HESH`) {
    super();
    this.pos.x = x;
    this.pos.y = y;
    this.pos.z = z;

    this.ang.x = angX;
    this.ang.y = angY;
    this.ang.z = angZ;

    this.radius = 10;

    this.vel.limit(1000)
    this.vel.y = -35;

    this.type = type;

    this.playerShell = playerTank;

    this.setCollision = false;

    //SO IT DONT COLLIDES WITH PARENT OBJECT
    setTimeout(() => {
      this.setCollision = true
    }, 100);

  }

  show() {
    push();
    //limit the counter of the angle
    this.ang.x > 625 || this.ang.x < -625 ? this.ang.x = 0 : false;

    translate(this.pos.x, this.pos.y + 100, this.pos.z);
    rotateY(-this.ang.x / 100);
    rotateX(this.vel.y / 75)

    if (this.pos.x > camera.xPosition + 300) { camera.xPosition = camera.xPosition - this.vel.x / 2.5 }
    if (this.pos.x < camera.xPosition - 300) { camera.xPosition = camera.xPosition - this.vel.x / 2.5 }

    if (this.pos.z > camera.zPosition + 100) { camera.zPosition = camera.zPosition - this.vel.z / 2 }
    if (this.pos.z < camera.zPosition - 100) { camera.zPosition = camera.zPosition - this.vel.z / 2 }

    scale(1);
    noStroke();
    ambientMaterial(100);
    texture(t34Texture);
    model(shellHESH);
    pop();

    // MULTIPLY THESE TO MAKE MISSILE PHYSICS 
    // this.acc.z = -this.dirY*100;
    // this.acc.x = this.dirX*100;

    this.vel.z = -this.dirY * 1000
    this.vel.x = this.dirX * 1000;
  }

  static isFired(x, y, z, angX, angY, angZ, dirX, dirY, playerTank, type = `HESH`) {
    collisionClass.objects.push(new Shell(x, y, z, angX, angY, angZ, dirX, -dirY, playerTank, type = `HESH`))
 }
}
//#endregion

//#region PRELOAD
//PRELOAD ALL DATA
function preload() {
  sky1 = loadImage("files/background/sky20.jpg");
  sand1 = loadImage("files/background/sand6.jpg");
  brick = loadImage("files/background/brick.jpg");
  tankModel = loadModel("files/models/t34.obj");
  // tankModel = loadModel("files/models/t34.obj");
  tree1 = loadModel("files/models/scenery/trees/tree1noleaves.obj");
  // wire = loadModel("files/models/scenery/objects/barbedWire.obj");

  // grass = loadModel("files/models/scenery/grass/Grass.obj");
  grass = loadModel("files/models/scenery/grass/spiderPlant_nt.obj");
  shellHESH = loadModel("files/models/tanks/tankShells/g1.obj");

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
  collisionClass = new Collision();

  for (let i = 0; i < 20; i++) {
    for (let g = 0; g < 20; g++) {
      terrain.push(new Terrain(-10000 + (i * 1000), -10000 + (g * 1000), sand1))
    }
  }
  environment.sky = new Sky(0, 0, 0);

  pTank = new Tank(-300, -100, 0, true);

  collisionClass.objects.push(pTank);
  for (let tankCount = 0; tankCount < 5; tankCount++) {
    collisionClass.objects.push(new Tank(-100, -100, -500 - (tankCount * 500)))
  }




  // for (let tankCount = 0; tankCount < 5; tankCount++) {
  //   collisionClass.objects.push(new Shell(-100, -100, -500 - (tankCount * 500)))
  // }

  for (let grassCount = 0; grassCount < 100; grassCount++) {
    collisionClass.objects.push(new Grass(random(-3000, 3000), 0, random(-3000, 3000), PI))
  }

  for (let treeCount = 0; treeCount < 30; treeCount++) {
    collisionClass.objects.push(new Tree(random(-5000, 5000), 0, random(-3000, 3000), PI))
  }

  let horizontalWallPosition = 0;
  let verticalWallPosition = 0;

  for (let blocks = 1; blocks < 20; blocks++) {
    let piArray = [PI, PI / 2];
    let randomPi = piArray[Math.floor(Math.random() * 2)]

    if (randomPi == PI) {
      let phaseShifter = [-1, 1];
      let randomPhase = phaseShifter[Math.floor(Math.random() * 2)]
      horizontalWallPosition += 1000 * (Math.random() + 0.1) * randomPhase;
      collisionClass.objects.push(new Walls(horizontalWallPosition, 50, verticalWallPosition, PI / 2))
    }
    else {
      let phaseShifter = [-1, 1];
      let randomPhase = phaseShifter[Math.floor(Math.random() * 2)]
      verticalWallPosition += 1000 * (Math.random() + 0.1) * randomPhase
      collisionClass.objects.push(new Walls(horizontalWallPosition, 50, verticalWallPosition, PI))
    }
  }

}
//#endregion

//#region DRAW
function draw() {

  background(255);
  //FRAMERATE DROPPING FOR DEBUGGING
  // frameCount(1);
  //frameRate(0.0025)  
  collisionClass.collision();

  // THIS IS TEMPORARY
  // camera.body.eyeX = 0
  // camera.body.eyeY = -3197
  // camera.body.eyeZ = 2589
  // camera.mode = 0;
  ////////
  ambientLight(255);

  // for (let wall of walls) {
  //   wall.show();
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
      : camera.mode === 2 ? camera.body.setPosition(pTank.pos.x, pTank.pos.y, pTank.pos.z) //FIRST PERSON
        : false;



  //FPS CAMERA CONDITIONS
  keyIsDown(100) && camera.mode === 2 ? camera.body.pan(0.05) : false;
  keyIsDown(102) && camera.mode === 2 ? camera.body.pan(-0.05) : false;



  //DRAW TERRAIN
  for (let plane of terrain) {
    plane.show();
  }

  //MOUSE PRESSED
  if (mouseIsPressed) {

    //WIND EXAMPLE
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


  collisionClass.objects.forEach((object) => {
    object.applyForce(createVector(environment.gravity[0], environment.gravity[1], environment.gravity[2]));
    // if((object instanceof Tank) === true){
    //   if(random(10000)<10 && object.playerTank != true){        
    //     object.fire();
    //   }
    // }

    object.playerTank === true
      ? object.playerControlled()
      : object.updateOther();
    (object instanceof Shell) === false ? object.edges() : null;
    object.show();
  })


  environment.sky.show();
  environment.sky.position.set(pTank.pos.x, 100, pTank.pos.z)
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
}
//#endregion


let environment = new Environment();



//CHANGE CAMERA
keyPressed = () => {
  keyCode === 67 ? camera.mode++ : null;  //C KEY
  camera.mode === 4 ? camera.mode = 0 : null; //RESET CAMERA TO FIRST MODE

  keyCode === 32 ? pTank.fire(true) : null;  //SPACE KEY


}

setInterval(() => {
}, 1000)


