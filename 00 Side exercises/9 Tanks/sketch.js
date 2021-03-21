//#region variables
let collisionClass;
let collision = false;
let sine;

// let terrain = [];
let terrain;

let environment;
let m1a2Body;
let m1a2Turret;
let m1a2Cannon;

let box1;
let box2;


let m1a2BodyTexture;
let m1a2TurretTexture;
let m1a2CannonTexture;

let howitzerBody;
let howitzerTurret
let howitzerCannon;
let howitzerRadar;

let sky1;
let sand1;
let brick;

let tree1;
let tree2;
let tree3;

let complexTree = {
  model: {
    body: ``,
    leaves: ``,
    flowers: ``,
  },
  texture: {
    body: ``,
    leaves: ``,
    flowers: ``,
  }
}

let AI = {
  forward: false,
  backward: false,
  rotateLeft: false,
  rotateRight: false,

  turretLeft: false,
  turretRight: false,

  cannonUp: false,
  cannonDown: false,
}


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
let shellHESHtexture;

let tankRadius;

let otherTanks = [];

let shells = [];

let lockOn = false;
let materialVariables = {

}

class Box {
  constructor(x, y, z, sizeX=1000, sizeY=100, sizeZ=200) {
    this.pos = createVector(x, y, z); //POSITION
    this.sizeX = sizeX;  //SIZE
    this.sizeY = sizeY;
    this.sizeZ = sizeZ;
  }
  show() {
    push()
    rotateX(PI/2)
    translate(this.pos.x, this.pos.y, this.pos.z)
    box(this.sizeX,this.sizeY,this.sizeZ)
    pop()
  }
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

    this.rot = createVector();
    this.ang = createVector();
    this.acc2 = createVector();

    this.radius = radius;

    this.dirX;
    this.dirY;

    this.acc.add(this.gravity[0], this.gravity[1], this.gravity[2]);

    this.setCollision = true;
    this.colided = false;

    this.AIActive = `AIDisabled`;

    this.playerTank = false;
    this.mass = 1;

    this.isDead = false;
  }
  applyForce(force) {
    this.acc.add(force);
  }
  playerControlled() {
    keyIsDown(104) ? this.turretAcc.x -= 0.0005 : this.turretVel.x /= 1.1; // NUM 8 KEY CANNON UP
    keyIsDown(98) ? this.turretAcc.x += 0.0005 : this.turretVel.x /= 1.1;  // NUM 2 KEY CANNON DOWN

    keyIsDown(100) ? this.turretAcc.y += 0.005 : this.turretVel.y /= 5;    // NUM 4 KEY TURRET LEFT
    keyIsDown(102) ? this.turretAcc.y -= 0.005 : this.turretVel.y /= 5;    // NUM 6 KEY TURRET RIGHT

    keyIsDown(65) ? this.acc2.x -= 0.5 : this.ang.x /= 1.1                 // A KEY TANK ROTATE LEFT    
    keyIsDown(68) ? this.acc2.x += 0.5 : this.ang.x /= 1.1                 // D KEY TANK ROTATE RIGHT

    if (keyIsDown(87)) {                  // W KEY TANK FORWARD
      this.acc.z = -this.dirY
      this.acc.x = this.dirX;
    } else {
      this.vel.z /= 1.1;
      this.vel.x /= 1.1;
    }

    if (keyIsDown(83)) {                  // S KEY TANK BACKWARD
      this.acc.z = this.dirY;
      this.acc.x = -this.dirX;
    } else {
      this.vel.z /= 1.1;
      this.vel.x /= 1.1;
    }

    this.vel.limit(30);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0);

    this.turretVel.limit(0.045);
    this.turretVel.add(this.turretAcc)
    this.turretAng.add(this.turretVel)
    this.turretAcc.set(0)

    this.rot.limit(500);
    this.ang.add(this.acc2);
    this.rot.add(this.ang);
    this.acc2.set(0);

    this.dirX = map(sin(this.rot.x / 100), 0, 628, 0, 360);
    this.dirY = map(cos(this.rot.x / 100), 0, 628, 0, 360);
  }

  AIControlled() {
    AI.cannonUp ? this.turretAcc.x -= 0.0005 : this.turretVel.x /= 1.1;     // AI CANNON UP
    AI.cannonDown ? this.turretAcc.x += 0.0005 : this.turretVel.x /= 1.1;   // AI CANNON DOWN

    AI.turretLeft ? this.turretAcc.y += 0.005 : this.turretVel.y /= 5;      // AI TURRET LEFT
    AI.turretRight ? this.turretAcc.y -= 0.005 : this.turretVel.y /= 5;     // AI TURRET RIGHT

    AI.rotateLeft ? this.acc2.x -= 0.5 : this.ang.x /= 1.1                  // AI ROTATE LEFT    
    AI.rotateRight ? this.acc2.x += 0.5 : this.ang.x /= 1.1                 // AI ROTATE RIGHT

    if (AI.forward === true) {                                                  // AI FORWARD
      this.acc.z = -this.dirY
      this.acc.x = this.dirX;
    } else {
      this.vel.z /= 1.1;
      this.vel.x /= 1.1;
    }

    if (AI.backward) {                  // AI BACKWARD
      this.acc.z = this.dirY;
      this.acc.x = -this.dirX;
    } else {
      this.vel.z /= 1.1;
      this.vel.x /= 1.1;
    }

    this.vel.limit(30);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0);

    this.turretVel.limit(0.045);
    this.turretVel.add(this.turretAcc)
    this.turretAng.add(this.turretVel)
    this.turretAcc.set(0)

    this.rot.limit(500);
    this.ang.add(this.acc2);
    this.rot.add(this.ang);
    this.acc2.set(0);

    this.dirX = map(sin(this.rot.x / 100), 0, 628, 0, 360);
    this.dirY = map(cos(this.rot.x / 100), 0, 628, 0, 360);
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

    this.dirX = map(sin(this.rot.x / 100), 0, 628, 0, 360);
    this.dirY = map(cos(this.rot.x / 100), 0, 628, 0, 360);

    this.ang.x /= 1.02
    this.ang.y /= 1.02
    this.ang.z /= 1.02

    if (this.isDead === true) {
      this.vel.x /= 1.02
      this.vel.y /= 1.02
      this.vel.z /= 1.02
    }
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

                  this.objects[i].vel.x = this.objects[g].vel.x / this.objects[i].mass / 15
                  this.objects[i].vel.z = this.objects[g].vel.z / this.objects[i].mass / 15

                  this.objects[i].vel.y = random(0, 30) + 10 / this.objects[i].mass / 5

                  this.objects[i].ang.x = 0.01 * random(1, 3)
                  this.objects[i].ang.z = 0.01 * random(1, 3)

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

                //CHECK THE COLLISION FOR TREES
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
                    this.objects[g].rot.z += ((1 / (this.objects[g].mass - 1)) / 400) * 1 + this.objects[g].rot.z / 20

                    if (this.objects[g].rot.z > 1.5) {
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

                    //WHEN WALL IS COLLIDED, IT FLIPS OVER SLOWLY
                    this.objects[g].rot.z += ((1 / (this.objects[g].mass - 1)) / 400) * 1 + this.objects[g].rot.z / 20

                    if (this.objects[g].rot.z > 1.5) {
                      this.objects[g].setCollision = false;

                      this.objects[g].vel.x = 0;
                      this.objects[g].vel.y = 0;
                      this.objects[g].vel.z = 0;
                      setTimeout(() => {
                        this.objects.splice(g, 1);
                      }, 30000)

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
                else null
              }
            }
          }
          else null
        }
      }
    }
    else null
  }
}
class Terrain extends Environment {
  constructor(positionX = 1000, positionZ = 1000, sizeX = 1000, sizeZ = 1000, texture) {
    super();

    this.positionX = positionX;
    this.positionZ = positionZ;
    this.sizeX = sizeX;
    this.sizeZ = sizeZ;

    this.scale = scale;

    this.texture = texture;

    this.objects = {
      grass: [],
    }
  }

  show() {
    push();
    translate(this.positionX, 100, this.positionZ)
    rotateX(PI / 2);
    ambientMaterial(0);
    texture(this.texture);
    noStroke();
    plane(this.sizeX, this.sizeZ);
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
    sphere(((width + height) / 2) * 5, 24, 24);

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

//#region TREES
class Tree extends Elements {
  constructor(x = 0, y = -100, z = 0, rotateX = PI, rotateY = 0, rotateZ = 0) {
    super(x, y, z);

    this.rot.x = rotateX;
    this.rot.y = random(0, 4);
    this.rot.z = rotateZ;

    this.radius = 100;

    this.scale = random(0.05, 0.5)
    this.colided = false;

    this.texture = ``;
    this.model = ``;

    this.mass = 5 + this.scale;
  }
}

class YellowTree extends Tree {
  constructor(x, y, z) {
    super();
    this.pos.x = x;
    this.pos.y = y;
    this.pos.z = z;
    this.model = model;
    this.texture = texture;
  }
  show() {
    //BODY
    push();
    translate(this.pos.x, this.pos.y + 110, this.pos.z);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    scale(this.scale);
    noStroke();
    texture(complexTree.texture.body);
    model(complexTree.model.body);
    noFill();
    pop();

    //LEAVEAS
    push();
    translate(this.pos.x, this.pos.y + 110, this.pos.z);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    scale(this.scale);
    noStroke();
    texture(complexTree.texture.leaves);
    model(complexTree.model.leaves);
    noFill();
    pop();

    //FLOWERS
    push();
    translate(this.pos.x, this.pos.y + 110, this.pos.z);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    scale(this.scale);
    noStroke();
    ambientMaterial(255, 255, 0);
    // texture(complexTree.texture.flowers);
    model(complexTree.model.flowers);
    noFill();
    pop();
  }
}

class PalmTree extends Tree {
  constructor(x, y, z) {
    super();
    this.pos.x = x;
    this.pos.y = y;
    this.pos.z = z;
    this.model = model;
    this.texture = texture;
  }
  show() {
    //BODY
    push();
    translate(this.pos.x, this.pos.y + 110, this.pos.z);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    scale(this.scale);
    noStroke();
    texture(complexTree.texture.body);
    model(complexTree.model.body);
    noFill();
    pop();

    //LEAVEAS
    push();
    translate(this.pos.x, this.pos.y + 110, this.pos.z);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    scale(this.scale);
    noStroke();
    texture(complexTree.texture.leaves);
    model(complexTree.model.leaves);
    noFill();
    pop();

    //FLOWERS
    push();
    translate(this.pos.x, this.pos.y + 110, this.pos.z);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    scale(this.scale);
    noStroke();
    ambientMaterial(255, 255, 0);
    // texture(complexTree.texture.flowers);
    model(complexTree.model.flowers);
    noFill();
    pop();
  }
}


//#endregion
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
}
class Tank extends Elements {
  constructor(x, y, z, playerTank = false, driverName = `AI`, radius, AIActive = `AIDisabled`) {
    super(x, y, z, radius);

    this.radius = 80;
    this.mass = 20; // MINIMUM 1, MAXIMUM ~20

    this.turretAng = createVector()
    this.turretVel = createVector()
    this.turretAcc = createVector()

    this.driverName = driverName;
    this.playerTank = playerTank;

    this.AIActive = AIActive;

    this.scale = 0.6;
  }

  show() {
    if (this.rot.x > 312.5) {
      this.rot.x = -312.5
    }
    else if (this.rot.x <= -312.5) {
      this.rot.x = 312.5
    }

    if (this.turretAng.y > 3.125) {
      this.turretAng.y = -3.125
    }
    else if (this.turretAng.y <= -3.125) {
      this.turretAng.y = 3.125
    }


    //BODY
    push();
    translate(this.pos.x, this.pos.y + 100, this.pos.z);
    rotateY(-this.rot.x / 100);
    rotateZ(PI);
    rotateY(-PI / 2 + this.ang.y)
    rotateZ(this.ang.z);
    scale(this.scale);
    noStroke();
    ambientMaterial(100);
    texture(m1a2BodyTexture);
    model(m1a2Body);
    pop();

    //TURRET
    push();
    translate(this.pos.x, this.pos.y + 100, this.pos.z);
    // this.turretAng.x += -movedX * 0.002 //MOVE BY MOUSE
    rotateY(PI / 2 + this.ang.y + this.turretAng.y);
    rotateZ(this.ang.z + PI);
    scale(this.scale);
    noStroke();
    ambientMaterial(100);
    texture(m1a2TurretTexture);
    model(m1a2Turret);
    pop();

    //  CANNON
    push();
    translate(this.pos.x, this.pos.y + 100, this.pos.z);
    rotateY(PI / 2 + this.turretAng.y);
    rotateZ(this.ang.z + PI + this.turretAng.x);

    this.turretAng.x > 0.03 ? this.turretAng.x = 0.03 :
      this.turretAng.x < -0.15 ? this.turretAng.x = -0.15 : null

    scale(this.scale);
    noStroke();
    ambientMaterial(100);
    texture(t34Texture);
    model(m1a2Cannon);
    pop();
  }

  fire() {
    Shell.isFired(
      this.pos.x,
      this.pos.y,
      this.pos.z,
      -this.turretAng.y * 100,
      this.turretAng.x,
      this.rot.z,
      this.playerTank
    )
  }

}
class Shell extends Tank {
  constructor(x, y, z, rotX, turretAngX, rotZ, playerTank, type = `HESH`) {
    super();
    this.pos.x = x;
    this.pos.y = y;
    this.pos.z = z;

    this.rot.x = rotX;
    this.turretAng.x = turretAngX; //VERTICAL TURRET POSITION
    this.rot.z = rotZ;

    this.radius = 10;

    this.vel.limit(1000)

    this.vel.y = (this.turretAng.x * 80) - 5;
    console.log(this.turretAng.x);

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
    translate(this.pos.x, this.pos.y + 60, this.pos.z);
    rotateY(-this.rot.x / 100);
    rotateX(this.vel.y / 75)
    scale(1);
    noStroke();
    ambientMaterial(100);
    texture(shellHESHtexture);
    model(shellHESH);
    pop();

    // MULTIPLY THESE TO MAKE MISSILE PHYSICS 
    // this.acc.z = -this.dirY*100;
    // this.acc.x = this.dirX*100;

    this.vel.z = -this.dirY * 200
    this.vel.x = this.dirX * 200;
  }

  static isFired(x, y, z, rotX, rotY, rotZ, playerTank, type = `HESH`) {
    collisionClass.objects.push(new Shell(x, y, z, rotX, rotY, rotZ, playerTank, type = `HESH`))
  }
}
//#endregion

//#region PRELOAD

function preload() {
  //PRELOAD ALL DATA
  sky1 = loadImage("files/background/sky20.jpg");
  sand1 = loadImage("files/background/sand.png");
  brick = loadImage("files/background/brick.jpg");

  tankModel = loadModel("files/models/t34.obj");

  m1a2Body = loadModel("files/models/tanks/m1a2/m1a2body.obj");
  m1a2Turret = loadModel("files/models/tanks/m1a2/m1a2turret.obj");
  m1a2Cannon = loadModel("files/models/tanks/m1a2/m1a2cannon.obj");

  m1a2BodyTexture = loadImage("files/textures/m1a2texture.jpg")
  m1a2CannonTexture = loadImage("files/textures/m1a2texture.jpg")
  m1a2TurretTexture = loadImage("files/textures/m1a2texture.jpg")

  // tankModel = loadModel("files/models/t34.obj");
  tree1 = loadModel("files/models/scenery/trees/tree1noleaves.obj");
  tree2 = loadModel("files/models/scenery/trees/treeWithLeaves.obj");
  tree3 = loadModel("files/models/scenery/trees/treeBoomDobro.obj");

  complexTree.model.body = loadModel("files/models/scenery/trees/tree/treeBody.obj");
  complexTree.model.flowers = loadModel("files/models/scenery/trees/tree/treeFlowers.obj");
  complexTree.model.leaves = loadModel("files/models/scenery/trees/tree/leaves.obj");

  complexTree.texture.body = loadImage("files/models/scenery/trees/tree/treeBody/bark1.jpg");
  complexTree.texture.leaves = loadImage("files/models/scenery/trees/tree/treeBody/bladeren.jpg");
  complexTree.texture.flowers = loadImage("files/models/scenery/trees/tree/treeBody/bladeren.jpg");



  // wire = loadModel("files/models/scenery/objects/barbedWire.obj");

  // grass = loadModel("files/models/scenery/grass/Grass.obj");
  grass = loadModel("files/models/scenery/grass/spiderPlant_nt.obj");
  shellHESH = loadModel("files/models/tanks/tankShells/g1.obj");

  // tankModel = loadModel("files/models/tankModels/M1A1/M1A1.obj");
  // tankModel = loadModel("files/models/scenery/objects/sandBag.obj");

  t34Texture = loadImage("files/textures/t34Texture.jpg");
  shellHESHtexture = loadImage("files/textures/HESH.png");

  grassTexture = loadImage("files/models/scenery/grass/spiderPlant_nt/Spider_leaf_clean.png");

  tree1Texture = loadImage("files/models/scenery/trees/tree1noleaves/tree1.jpg");
  tree2Texture = loadImage("files/models/scenery/trees/treeWithLeaves/bark1.jpg");
  tree3Texture = loadImage("files/models/scenery/trees/treeBoomDobro/bladeren.jpg");


}
//#endregion

//#region SETUP
function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);

  //CREATE CAMERA
  camera.body = createCamera();

  // setInterval(() => {
  //   console.log(camera);
  // }, 1000)

  //TEST /////////////////////
  ////////////////////////////////////////

  box1 = new Box(0, 0, 0, 300,500,400)
  box2 = new Box(0, 0,0, 200,300,700)

  ///////////////////////////////

  //CREATE ESSENTIALS
  collisionClass = new Collision();
  environment = new Environment();
  terrain = new Terrain(0, 0, 15000, 15000, sand1)
  environment.sky = new Sky(0, 0, 0);

  //CREATE PLAYER TANK
  pTank = new Tank(-300, -100, 0, true);

  //CREATE ENEMY TANKS
  collisionClass.objects.push(pTank);
  for (let tankCount = 0; tankCount < 5; tankCount++) {
    collisionClass.objects.push(new Tank(-100, -100, -500 - (tankCount * 500), false, `AI Tank`, 100, `AIActive`))
  }

  //CREATE SCENERY
  for (let grassCount = 0; grassCount < 100; grassCount++) {
    collisionClass.objects.push(new Grass(random(-3000, 3000), 0, random(-3000, 3000), PI))
  }
  for (let treeCount = 0; treeCount < 30; treeCount++) {
    collisionClass.objects.push(new YellowTree(random(-5000, 5000), 0, random(-3000, 3000)))
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

//#region INTERSECTS
function intersects(
  firstRectPosX, firstRectPosY, firstRectPosZ, firstRectWidth, firstRectHeight, firstRectDepth,
  secondRectPosX, secondRectPosY, secondRectPosZ, secondRectWidth, secondRectHeight, secondRectDepth
) {
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


  // topLeftFirst = [firstRectPosX - firstRectWidth / 2, firstRectPosY - firstRectHeight / 2]
  // topRightFirst = [firstRectPosX + firstRectWidth / 2, firstRectPosY - firstRectHeight / 2]
  // bottomLeftFirst = [firstRectPosX - firstRectWidth / 2, firstRectPosY + firstRectHeight / 2]
  // bottomRightFirst = [firstRectPosX + firstRectWidth / 2, firstRectPosY + firstRectHeight / 2]

  // topLeftSecond = [secondRectPosX - secondRectWidth / 2, secondRectPosY - secondRectHeight / 2]
  // topRightSecond = [secondRectPosX + secondRectWidth / 2, secondRectPosY - secondRectHeight / 2]
  // bottomLeftSecond = [secondRectPosX - secondRectWidth / 2, secondRectPosY + secondRectHeight / 2]
  // bottomRightSecond = [secondRectPosX + secondRectWidth / 2, secondRectPosY + secondRectHeight / 2]

  if (
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

//#endregion

//#region DRAW
function draw() {

  background(125, 195, 255);
  //FRAMERATE DROPPING FOR DEBUGGING
  // frameCount(1);
  //frameRate(0.0025)  
  // THIS IS TEMPORARY
  camera.body.eyeX = 0
  camera.body.eyeY = -3197
  camera.body.eyeZ = 2589
  camera.mode = 0;
  // ////////


  //LIGHT
  ambientLight(255);
  // lightFalloff(1, 0, 0);
  pointLight(250, 250, 250, pTank.pos.x - 3000, -600, pTank.pos.z + 500);
  collisionClass.collision();
  // pointLight(250, 250, 250, pTank.pos.x-3000, -200, pTank.pos.z+500);
  // directionalLight(255, 255, 255, 0, 50, 0)
  // spotLight(0, 250, 0, locX, locY, 100, 0, 0, -1, Math.PI / 16);

  box1.show();
  box2.show();
  box1.pos.x = mouseX*3-1200;
  box1.pos.z = mouseY*3-1200;

  let i = intersects(
    box1.pos.x,
    box1.pos.y,
    box1.pos.z,
    box1.sizeX,
    box1.sizeY,
    box1.sizeZ,
    box2.pos.x,
    box2.pos.y,
    box2.pos.z,
    box2.sizeX,
    box2.sizeY,
    box2.sizeZ
    )
  console.log(i);
  //CAMERA
  //CLICK MOUSE TO LOOK AROUND
  if (lockOn) {
    camera.body.pan(-movedX * 0.002);
    camera.body.tilt(movedY * 0.002);
  }

  //MOVE AROUND WITH NUMPAD KEYS
  keyIsDown(104) ? camera.body.move(0, 0, -5) : false;  //NUM 8  FORWARD
  keyIsDown(101) ? camera.body.move(0, 0, 5) : false;   //NUM 5  BACKWARD
  keyIsDown(100) ? camera.body.move(-5, 0, 0) : false;  //NUM 4  LEFT
  keyIsDown(102) ? camera.body.move(5, 0, 0) : false;   //NUM 6  RIGHT
  keyIsDown(97) ? camera.body.move(0, 5, 0) : false;   //NUM 1  DOWN
  keyIsDown(103) ? camera.body.move(0, -5, 0) : false;   //NUM 7  UP 

  //BOUNDRY FOR FLOOR FOR THE CAMERA
  camera.body.eyeY > 0 ? camera.body.setPosition(camera.body.eyeX, 0, camera.body.eyeZ) : false;

  //FREE MOVING CAMERA CONDITIONS
  camera.mode === 0 ? camera.body.setPosition(camera.body.eyeX, camera.body.eyeY, camera.body.eyeZ) // FREE LOOK
    : camera.mode === 1 ? camera.body.setPosition(camera.body.eyeX, 0, camera.body.eyeZ) //GROUND LOOK
      : camera.mode === 2 ? camera.body.setPosition(pTank.pos.x, pTank.pos.y, pTank.pos.z) //FIRST PERSON
        : false;

  //FPS CAMERA CONDITIONS
  // keyIsDown(100) && camera.mode === 2 ? camera.body.pan(0.01) : false;
  // keyIsDown(102) && camera.mode === 2 ? camera.body.pan(-0.01) : false;

  keyIsDown(100) && camera.mode === 2 ? camera.body.pan(pTank.turretVel.y) : false;
  keyIsDown(102) && camera.mode === 2 ? camera.body.pan(pTank.turretVel.y) : false;



  //DRAW TERRAIN  
  terrain.show();

  //MOUSE PRESSED
  if (mouseIsPressed) {
    //WIND EXAMPLE
    // let wind = createVector(0.01, 0, 0);
    // pTank.applyForce(wind);
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
    object.AIActive === `AIActive`
      ? object.AIControlled() : null;

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
  if (keyIsDown(105)) {
    camera.yPositionSpeed = 5;
  }
  else { camera.yPositionSpeed = 0 }
  if (keyIsDown(99)) {
    camera.yPositionSpeed = -5;
  }
}

//#endregion






//CHANGE CAMERA
keyPressed = () => {
  keyCode === 67 ? camera.mode++ : null;  //C KEY
  camera.mode === 4 ? camera.mode = 0 : null; //RESET CAMERA TO FIRST MODE

  keyCode === 32 ? pTank.fire(true) : null;  //SPACE KEY


}


