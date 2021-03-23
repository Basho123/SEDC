//#region variables
let collisionClass;
let collision = false;
let sine;

const globalExistenceDistanceLimit = 25000;
const globalBoundry = 8000;

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


let randomState = {
  randomNumber: Math.random() * 10000,
  randomStateArray: [true, false],

  randomState1: false,
  randomState2: false,
  randomState3: false,
  randomState4: false,
  randomState5: false,
  randomState6: false,
  randomState7: false,
  randomState8: false,
  randomState9: false,
  randomState10: false,
}
let { randomStateArray, randomState1, randomState2, randomState3, randomState4, randomState5, randomState6, randomState7, randomState8, randomState9, randomState10 } = randomState;

setInterval(() => {
  let randomNumber = Math.random() * 100
  if (randomNumber < 5) {
    randomState1 = true;
    setTimeout(() => { randomState1 = false }, randomNumber * 100)
  }
}, 100)
setInterval(() => { randomState2 = randomStateArray[Math.floor(Math.random() * 2)] }, 500)
setInterval(() => { randomState3 = randomStateArray[Math.floor(Math.random() * 2)] }, 1000)
setInterval(() => { randomState4 = randomStateArray[Math.floor(Math.random() * 2)] }, 2000)
setInterval(() => { randomState5 = randomStateArray[Math.floor(Math.random() * 2)] }, 4000)
setInterval(() => { randomState6 = randomStateArray[Math.floor(Math.random() * 2)] }, 6000)
setInterval(() => { randomState7 = randomStateArray[Math.floor(Math.random() * 2)] }, 7000)
setInterval(() => { randomState8 = randomStateArray[Math.floor(Math.random() * 2)] }, 8000)
setInterval(() => { randomState9 = randomStateArray[Math.floor(Math.random() * 2)] }, 9000)
setInterval(() => { randomState10 = randomStateArray[Math.floor(Math.random() * 2)] }, 12000)
// console.log(randomNumber.three);
//#endregion
//#endregion

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
  constructor(positionX, positionY, positionZ, sizeX = 100, sizeY = 100, sizeZ = 100, color = [255, 255, 255], radius = 100) {
    super();
    this.pos = createVector(positionX, positionY, positionZ);
    this.vel = createVector();
    this.acc = createVector();

    this.rot = createVector();
    this.ang = createVector();
    this.acc2 = createVector();

    this.size = createVector(sizeX, sizeY, sizeZ)
    this.collisionColor = color;
    this.collisionOffset = createVector();

    this.radius = radius;
    this.r = radius;

    this.dirX;
    this.dirY;

    this.acc.add(this.gravity[0], this.gravity[1], this.gravity[2]);

    this.setCollision = true;
    this.colided = false;

    this.AIActive = false;
    this.id = random(999999999)

    this.objectType = `undefined`;
    this.playerTank = false;
    this.mass = 1;

    this.isTank = false;

    this.maxSpeed = 4;
    this.maxForce = 0.25;

    this.isDead = false;

  }

  showCollisionBox() {
    push()
    fill(this.collisionColor)
    translate(this.pos.x + this.collisionOffset.x, this.pos.y + this.collisionOffset.y, this.pos.z + this.collisionOffset.z)
    // rotateY(-this.rot.x/100)
    box(this.size.x, this.size.y, this.size.z)
    pop()
  }

  seek(target) {
    let force = p5.Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    // force.limit(this.maxForce);
    this.applyForce(force);
  }
  applyForce(force) {
    this.acc.add(force);
  }
  playerControlled() {
    if (this.isDead === false) {
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
    } else null;
  }



  updateOther() {
    if (this.AIActive === false)
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

  measureDistance() {
    if (this.objects.length > 0) {
      for (let i = 0; i < this.objects.length; i++) {
        for (let g = i + 1; g < this.objects.length; g++) {
          if (this.objects[i].playerTank && this.objects[g].isTank) {
            let distance = dist(
              this.objects[i].pos.x,
              this.objects[i].pos.y,
              this.objects[i].pos.z,
              this.objects[g].pos.x,
              this.objects[g].pos.y,
              this.objects[g].pos.z);

              //THIS CORRECTS THE ENEMY TANK VERTICAL AIM
            if (distance < (this.objects[i].radius + this.objects[g].radius) * 10) {
              this.objects[g].turretAng.x = -distance/15000
            }
          }
        }
      }
    }
  }
  static intersects(
    firstRectPosX, firstRectPosY, firstRectPosZ, firstRectWidth, firstRectHeight, firstRectDepth,
    secondRectPosX, secondRectPosY, secondRectPosZ, secondRectWidth, secondRectHeight, secondRectDepth
  ) {
    let rightSideFirst = firstRectPosX + firstRectWidth / 2;
    let leftSideFirst = firstRectPosX - firstRectWidth / 2;
    let bottomSideFirst = firstRectPosY + firstRectHeight / 2;
    let topSideFirst = firstRectPosY - firstRectHeight / 2;
    let frontSideFirst = firstRectPosZ + firstRectDepth / 2; //DEPTH
    let backSideFirst = firstRectPosZ - firstRectDepth / 2; //DEPTH

    let rightSideSecond = secondRectPosX + secondRectWidth / 2;
    let leftSideSecond = secondRectPosX - secondRectWidth / 2;
    let bottomSideSecond = secondRectPosY + secondRectHeight / 2;
    let topSideSecond = secondRectPosY - secondRectHeight / 2;
    let frontSideSecond = secondRectPosZ + secondRectDepth / 2; //DEPTH
    let backSideSecond = secondRectPosZ - secondRectDepth / 2; //DEPTH

    if (
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


  collision() {
    if (this.objects.length > 0) {
      for (let i = 0; i < this.objects.length; i++) {
        for (let g = i + 1; g < this.objects.length; g++) {
          //CHECK IF OBJECT IS IN GLOBAL EXISTENCE BOUNDARIES FIRST


          if (
            this.objects[g].pos.x > globalExistenceDistanceLimit ||
            this.objects[g].pos.y >= 100 || //GROUND
            this.objects[g].pos.z > globalExistenceDistanceLimit ||
            this.objects[g].pos.x < -globalExistenceDistanceLimit ||
            this.objects[g].pos.y < -globalExistenceDistanceLimit ||
            this.objects[g].pos.z < -globalExistenceDistanceLimit) {
            this.objects.splice(g, 1);
            break;
          }

          else if (this.objects[i].isTank === true) {
            this.objects[i].pos.x < -globalBoundry ? this.objects[i].pos.x += 10
              : this.objects[i].pos.x > globalBoundry ? this.objects[i].pos.x -= 10 : null;

            this.objects[i].pos.z < -globalBoundry ? this.objects[i].pos.z += 10
              : this.objects[i].pos.z > globalBoundry ? this.objects[i].pos.z -= 10 : null;

          }

          //COLLISION CHECK STARTS
          if (this.objects[i].setCollision && this.objects[g].setCollision) {
            let intersect = Collision.intersects(
              this.objects[i].pos.x + this.objects[i].collisionOffset.x,
              this.objects[i].pos.y + this.objects[i].collisionOffset.y,
              this.objects[i].pos.z + this.objects[i].collisionOffset.z,
              this.objects[i].size.x,
              this.objects[i].size.y,
              this.objects[i].size.z,
              this.objects[g].pos.x + this.objects[g].collisionOffset.x,
              this.objects[g].pos.y + this.objects[g].collisionOffset.y,
              this.objects[g].pos.z + this.objects[g].collisionOffset.z,
              this.objects[g].size.x,
              this.objects[g].size.y,
              this.objects[g].size.z
            )
            //IF CHECK PASSES AND ID OF OBJECT IS NOT SELF(SHELLS COLLIDING WITH PARENT OBJECT)
            if (intersect === true && this.objects[i].id !== this.objects[g].id) {
              // this.objects[g].showCollisionBox();
              // this.objects[i].showCollisionBox();

              //#region 1. TANK SHELL INTERACTS WITH OBJECTS             
              if ((this.objects[g] instanceof Shell)) {
                this.objects[i].vel.limit(1000);

                this.objects[i].vel.x = this.objects[g].vel.x / this.objects[i].mass / 50
                this.objects[i].vel.z = this.objects[g].vel.z / this.objects[i].mass / 50

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
              } else null;
              //#endregion

              //#region 2. TANK DUMMY SCANNERS

              //#region 2.1 BODY TANK DUMMY CHECK

              if ((this.objects[g] instanceof DummyShellBody)) {
                if ((this.objects[i] instanceof YellowTree)) {
                }
                else if ((this.objects[i] instanceof Tank))
                  this.objects[i].turretAng.y = -this.objects[i].rot.x / 100

              }
              //#endregion
              //#endregion

              //#region 2.2 TURRET TANK DUMMY CHECK
              if ((this.objects[g] instanceof DummyShellTurret)) {
                if ((this.objects[i].playerTank === true)) {
                  this.objects.forEach((tank) => {
                    if (tank.id === this.objects[g].id && tank.objectType == `tank`) {
                      tank.fire();
                    }
                    else null;
                  })

                } else continue;

                this.objects.splice(g, 1);

              }
              //#endregion 

              // #region 3. TANK INTERACTS WITH OBJECTS

              if ((this.objects[i] instanceof Tank)) {

                this.objects[i].vel.x /= this.objects[g].mass
                this.objects[i].vel.y /= this.objects[g].mass
                this.objects[i].vel.z /= this.objects[g].mass

                //NONSTICK BOUNCE EFFECT
                this.objects[g].pos.x -= ((this.objects[i].pos.x - this.objects[g].pos.x) / 500)
                this.objects[g].pos.y -= ((this.objects[i].pos.y - this.objects[g].pos.y) / 500)
                this.objects[g].pos.z -= ((this.objects[i].pos.z - this.objects[g].pos.z) / 500)

                //#region 3.1 TANK INTERACTS WITH TREE
                if ((this.objects[g] instanceof Tree)) {
                  this.objects[g].rot.z += ((1 / (this.objects[g].mass - 1)) / 400) * 1 + this.objects[g].rot.z / 20

                  if (this.objects[g].rot.z > 1.5) {
                    this.objects[g].setCollision = false;

                    this.objects[g].vel.x = 0;
                    this.objects[g].vel.y = 0;
                    this.objects[g].vel.z = 0;
                    //this.objects.splice(g, 1);
                  }
                }
                //#endregion


              }
              // endregion 

            }
            else null;
          }
          else null;
        }
      }
    }
    else null;
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
    sphere(((width + height) / 2) * 20, 24, 24);

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
    this.scale = random(1, 100)
    // this.scale =1;

    this.setCollision = false;
    this.model = model;

  }
  show() {
    push();
    translate(this.pos.x, this.pos.y + 100 + this.scale / 4, this.pos.z);
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


    // this.radius = 100;

    this.scale = random(0.05, 0.5)
    this.colided = false;


    this.size.x = 75 * this.scale;;
    this.size.y = 2000 * this.scale;
    this.size.z = 75 * this.scale;

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

    this.size.x = 10;
    this.size.y = 100;
    this.size.z = 100;

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
    super(x, y, z);

    this.randomNumber = random(100);


    this.size.x = 100;
    this.size.y = 110;
    this.size.z = 100;

    this.collisionOffset.y = 90;

    this.radius = 80;
    this.mass = 20; // MINIMUM 1, MAXIMUM ~20
    // this.size = createVector();w    

    this.turretAng = createVector()
    this.turretVel = createVector()
    this.turretAcc = createVector()

    this.driverName = driverName;
    this.playerTank = playerTank;
    this.objectType = `tank`;
    this.AIActive = AIActive;

    this.scale = 0.65;
    this.isTank = true;

    this.id = `${this.playerTank ? `PlayerTank_ID` : `AITank_ID`}${random(0, 999999999)}`

    if (this.playerTank === false) {
      setInterval(() => {
        this.scanTurret();
      }, 1000)
    }

    this.ai = {
      forward: false,
      backward: false,
      rotateLeft: false,
      rotateRight: false,

      turretLeft: true,
      turretRight: false,

      cannonUp: true,
      cannonDown: false,
    }
    this.randomState = {
      randomNumber: Math.random() * 10000,
      randomStateArray: [true, false],

      randomState1: false,
      randomState2: false,
      randomState3: false,
      randomState4: false,
      randomState5: false,
      randomState6: false,
      randomState7: false,
      randomState8: false,
      randomState9: false,
      randomState10: false,
    }

    setInterval(() => {
      let randomNumber = Math.random() * 100
      if (randomNumber < 5) {
        this.randomState.randomState1 = true;
        setTimeout(() => { this.randomState.randomState1 = false }, randomNumber * 100)
      }
    }, 100)

    setInterval(() => {
      let randomNumber = Math.random() * 100
      if (randomNumber < 10) {
        this.randomState.randomState2 = true;
        setTimeout(() => { this.randomState.randomState1 = false }, randomNumber * 100)
      }
    }, 1000)

    setInterval(() => { this.randomState.randomState3 = randomStateArray[Math.floor(Math.random() * 2)] }, 1000)
    setInterval(() => { this.randomState.randomState4 = randomStateArray[Math.floor(Math.random() * 2)] }, 2000)
    setInterval(() => { this.randomState.randomState5 = randomStateArray[Math.floor(Math.random() * 2)] }, 4000)
    setInterval(() => { this.randomState.randomState6 = randomStateArray[Math.floor(Math.random() * 2)] }, 6000)
    setInterval(() => { this.randomState.randomState7 = randomStateArray[Math.floor(Math.random() * 2)] }, 7000)
    setInterval(() => { this.randomState.randomState8 = randomStateArray[Math.floor(Math.random() * 2)] }, 8000)
    setInterval(() => { this.randomState.randomState9 = randomStateArray[Math.floor(Math.random() * 2)] }, 9000)
    setInterval(() => { this.randomState.randomState10 = randomStateArray[Math.floor(Math.random() * 2)] }, 12000)
    // this.setAI();
  }

  show() {
    //CALCULATE COLLISION BOX CHANGE ON ROTATION
    let angleConvert = map(this.rot.x, -312.5, 312.5, -3.125, 3.125)
    angleConvert < 0 ? angleConvert *= -1 : null;

    this.size.x = sin(angleConvert) * 150 + 100
    this.size.z = -sin(angleConvert) * 130 + 210

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

    // rotate(this.vel.heading())

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
  AIControlled() {
    this.ai.cannonUp ? this.turretAcc.x -= 0.0005 : this.turretVel.x /= 1.1;     // AI CANNON UP
    this.ai.cannonDown ? this.turretAcc.x += 0.0005 : this.turretVel.x /= 1.1;   // AI CANNON DOWN

    this.ai.turretLeft ? this.turretAcc.y += 0.005 : this.turretVel.y /= 5;      // AI TURRET LEFT
    this.ai.turretRight ? this.turretAcc.y -= 0.005 : this.turretVel.y /= 5;     // AI TURRET RIGHT

    this.ai.rotateLeft ? this.acc2.x -= 0.5 : this.ang.x /= 1.1                  // AI ROTATE LEFT    
    this.ai.rotateRight ? this.acc2.x += 0.5 : this.ang.x /= 1.1                 // AI ROTATE RIGHT

    if (this.ai.forward === true) {                                                  // AI FORWARD
      this.acc.z = -this.dirY
      this.acc.x = this.dirX;
    } else {
      this.vel.z /= 1.1;
      this.vel.x /= 1.1;
    }

    if (this.ai.backward) {                  // AI BACKWARD
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

  setAI() {

    this.ai.forward = this.randomState.randomState3;

    this.randomState.randomState10 === false
      ? this.ai.rotateLeft = this.randomState.randomState1
      : this.ai.rotateRight = this.randomState.randomState1;

    this.randomState.randomState10 === false
      ? this.ai.turretRight = this.randomState.randomState6
      : this.ai.turretLeft = this.randomState.randomState6;


  }

  fire() {
    if (!this.isDead) {
      Shell.isFired(
        this.pos.x,
        this.pos.y,
        this.pos.z,
        -this.turretAng.y * 100,
        this.turretAng.x,
        this.rot.z,
        this.playerTank,
        `HESH`,
        this.id,
      )
    }
  }
  scanTurret() {
    if (!this.isDead) {
      DummyShellTurret.isFired(
        this.pos.x,
        this.pos.y,
        this.pos.z,
        -this.turretAng.y * 100,
        this.turretAng.x,
        this.rot.z,
        this.playerTank,
        `TURRET_DUMMY`,
        this.id
      )
    }
  }
  scanBody() {
    if (!this.isDead) {
      DummyShellBody.isFired(
        this.pos.x,
        this.pos.y,
        this.pos.z,
        this.rot.x,
        this.rot.y,
        this.rot.z,
        this.playerTank,
        `BODY_DUMMY`,
        this.id
      )
    }
  }

}
class Shell extends Tank {
  constructor(x, y, z, rotX, turretAngX, rotZ, playerTank, type = `HESH`, id) {
    super();
    this.pos.x = x;
    this.pos.y = y + 50;
    this.pos.z = z;

    this.id = id;
    this.isTank = false;

    this.collisionOffset.y = -10;
    this.objectType = `shell`;

    this.size.x = 10;
    this.size.y = 10;
    this.size.z = 10;

    this.rot.x = rotX;
    this.turretAng.x = turretAngX; //VERTICAL TURRET POSITION
    this.rot.z = rotZ;
    this.AIActive = false;
    this.radius = 10;

    this.vel.limit(1000)

    this.vel.y = (this.turretAng.x * 80) - 5;

    this.type = type;

    this.playerShell = playerTank;

    this.setCollision = true;
  }

  show() {
    // this.pos.y =  this.pos.y - 60
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
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

  static isFired(x, y, z, rotX, rotY, rotZ, playerTank, type = `HESH`, id) {
    collisionClass.objects.push(new Shell(x, y, z, rotX, rotY, rotZ, playerTank, type = `HESH`, id))
  }
}
class DummyShellTurret extends Tank {
  constructor(x, y, z, rotX, turretAngX, rotZ, playerTank, type = `DUMMY`, id) {
    super(x, y + 50, z);

    this.collisionOffset.y = -10;

    this.size.x = 100;
    this.size.y = 100;
    this.size.z = 100;
    this.rot.x = rotX;
    this.turretAng.x = turretAngX; //VERTICAL TURRET POSITION
    this.rot.z = rotZ;

    this.AIActive = false;
    this.isTank = false;

    this.id = id;

    this.objectType = `dummyShellTurret`;

    this.radius = 10;

    this.vel.limit(1000)

    this.vel.y = (this.turretAng.x * 80) - 5;

    this.type = type;

    this.playerShell = playerTank;

    this.setCollision = true;
  }

  show() {
    // this.pos.y =  this.pos.y - 60
    // push();
    // translate(this.pos.x, this.pos.y, this.pos.z);
    // rotateY(-this.rot.x / 100);
    // rotateX(this.vel.y / 75)
    // scale(1);
    // color(255);
    // box(100, 100)
    // ambientMaterial(100);
    // pop();

    // MULTIPLY THESE TO MAKE MISSILE PHYSICS 
    // this.acc.z = -this.dirY * 5000;
    // this.acc.x = this.dirX * 5000;

    this.vel.z = -this.dirY * 1000
    this.vel.x = this.dirX * 1000;
  }

  static isFired(x, y, z, rotX, rotY, rotZ, playerTank, type = `HESH`, id) {
    collisionClass.objects.push(new DummyShellTurret(x, y, z, rotX, rotY, rotZ, playerTank, type = `HESH`, id))
  }
}
class DummyShellBody extends Tank {
  constructor(x, y, z, rotX, turretAngX, rotZ, playerTank, type = `DUMMY`, id) {
    super(x, y + 50, z);

    this.collisionOffset.y = -10;

    this.AIActive = false;

    this.size.x = 100;
    this.size.y = 100;
    this.size.z = 100;
    this.rot.x = rotX;
    this.turretAng.x = turretAngX; //VERTICAL TURRET POSITION
    this.rot.z = rotZ;

    this.radius = 10;
    this.isTank = false;


    this.vel.limit(1000)

    this.id = id;

    this.objectType = `dummyShellBody`;

    this.vel.y = (this.turretAng.x * 80) - 5;

    this.type = type;

    this.playerShell = playerTank;

    this.setCollision = true;

    //SO IT DONT COLLIDES WITH PARENT OBJECT
    // setTimeout(() => {
    //   this.setCollision = true
    // }, 100);

  }

  show() {
    // this.pos.y =  this.pos.y - 60
    // push();
    // translate(this.pos.x, this.pos.y, this.pos.z);
    // rotateY(-this.rot.x / 100);
    // rotateX(this.vel.y / 75)
    // scale(1);
    // color(255, 0, 0);
    // box(100, 100)
    // ambientMaterial(100);
    // pop();

    // MULTIPLY THESE TO MAKE MISSILE PHYSICS 
    // this.acc.z = -this.dirY * 5000;
    // this.acc.x = this.dirX * 5000;

    this.vel.z = -this.dirY * 2000
    this.vel.x = this.dirX * 2000;
  }

  static isFired(x, y, z, rotX, rotY, rotZ, playerTank, type = `HESH`, id) {
    collisionClass.objects.push(new DummyShellBody(x, y, z, rotX, rotY, rotZ, playerTank, type = `HESH`, id))
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
  perspective(PI / 2.3, width / height, 0.01, 35000)


  //TEST /////////////////////
  ////////////////////////////////////////
  5
  // box1 = new Box(0, 0, 0, 300, 500, 400)
  // box2 = new Box(0, 0, 0, 200, 300, 700)

  ///////////////////////////////

  //CREATE ESSENTIALS
  collisionClass = new Collision();
  environment = new Environment();
  terrain = new Terrain(0, 0, 15000, 15000, sand1)
  environment.sky = new Sky(0, 0, 0);
  //CREATE PLAYER TANK
  pTank = new Tank(-300, -100, 0, true);
  collisionClass.objects.push(pTank);
  console.log(pTank);

  setInterval(() => {
    console.log(`ptankturretang`, pTank.turretAng.x);
    // console.log(`pos.x`, pTank.pos.x);
    // console.log(`pos.z`, pTank.pos.z);
  }, 2000);
  // oTank = new Tank(500, -200, 500)

  //CREATE ENEMY TANKS
  for (let tankCount = 0; tankCount < 5; tankCount++) {
    collisionClass.objects.push(new Tank(random(-2000, 2000), -100, random(-2000, 2000), false, `AI Tank`, 100, `AIActive`))
  }

  //CREATE SCENERY
  for (let grassCount = 0; grassCount < 100; grassCount++) {
    collisionClass.objects.push(new Grass(random(-5000, 5000), 0, random(-5000, 5000), PI))
  }
  for (let treeCount = 0; treeCount < 60; treeCount++) {
    collisionClass.objects.push(new YellowTree(random(-6000, 6000), 0, random(-5000, 5000)))
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

  background(125, 195, 255);
  //FRAMERATE DROPPING FOR DEBUGGING
  // frameCount(1);
  //frameRate(0.0025)  
  // THIS IS TEMPORARY
  // camera.body.eyeX = 0
  // camera.body.eyeY = -3197
  // camera.body.eyeZ = 2589
  // camera.mode = 0;
  // ////////

  // pTank.showCollisionBox();
  //LIGHT
  ambientLight(255);
  // lightFalloff(1, 0, 0);
  pointLight(250, 250, 250, pTank.pos.x - 3000, -600, pTank.pos.z + 500);


  // oTank.show();
  // oTank.updateOther();
  // oTank.edges()
  collisionClass.collision();
  collisionClass.measureDistance();
  // pointLight(250, 250, 250, pTank.pos.x-3000, -200, pTank.pos.z+500);
  // directionalLight(255, 255, 255, 0, 50, 0)
  // spotLight(0, 250, 0, locX, locY, 100, 0, 0, -1, Math.PI / 16);

  // box1.showCollisionBox();
  // box2.showCollisionBox();
  // box1.pos.x = mouseX * 3 - 1200;
  // box1.pos.z = mouseY * 3 - 1200;

  //#region CAMERA
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


  keyIsDown(100) && camera.mode === 2 ? camera.body.pan(pTank.turretVel.y) : false;
  keyIsDown(102) && camera.mode === 2 ? camera.body.pan(pTank.turretVel.y) : false;
  //#endregion

  // pTank.seek(createVector(500, 1000));

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
    if (object.AIActive === `AIActive` && object.isDead === false) {
      object.AIControlled();
      object.setAI()
    }


    object.playerTank === true ? object.playerControlled() : null;
    object.AIActive === false && object.playerTank === false ? object.updateOther() : null;

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
  // keyCode === 32 ? pTank.scanTurret(true) : null;  //SPACE KEY
  //keyCode === 32 ? pTank.scanBody(true) : null;  //SPACE KEY
}

