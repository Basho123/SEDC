// Steering Behavior
// Seek a target
class Obstacle extends p5.Vector {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
  }

  show() {
    fill(127);
    stroke(255);
    strokeWeight(4);
    circle(this.x, this.y, this.r * 2);
  }

}

// A function to get the normal point from a point (p) to a line segment (a-b)
// This function could be optimized to make fewer new Vector objects
function getNormalPoint(p, a, v) {
  // Vector from a to p
  let ap = p5.Vector.sub(p, a);
  // Vector from a to b
  v.normalize(); // Normalize the line
  // Project vector "diff" onto line by using the dot product
  v.mult(ap.dot(v));
  let normalPoint = p5.Vector.add(a, v);
  return normalPoint;
}



class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.25;
    this.r = 16;
    this.seeingDistance = 100;


  }

  avoid(obstacle) {
    let normal = getNormalPoint(
      obstacle.copy(),
      this.pos.copy(),
      this.vel.copy()
    );
    stroke(255);
    line(normal.x, normal.y, obstacle.x, obstacle.y);
    let d1 = p5.Vector.dist(normal, obstacle);
    const end = p5.Vector.add(
      this.pos,
      this.vel.copy().setMag(this.seeingDistance)
    );
    let d2 = p5.Vector.dist(end, obstacle);

    // TODO: look at casting ray for vector + circle intersection
    if (d1 - 150 < obstacle.r && d2 < obstacle.r) {
      fill(255, 0, 0);

      // apply the steering force!
      let force = p5.Vector.sub(end, obstacle);
      force.setMag(this.maxForce);
      this.applyForce(force);

    } else {
      fill(0, 255, 0);
    }
    noStroke();
    circle(normal.x, normal.y, 24);
  }

  seek(target) {
    let force = p5.Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.applyForce(force);
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }

  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }



  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    noFill();
    stroke(255);
    rect(0, -this.r / 2, this.seeingDistance, this.r);
    pop();
  }
}

let vehicle;
let target;
let obstacles = [];

//#region SETUP
function setup() {
  createCanvas(600, 600);
  vehicle = new Vehicle(0, 200);
  vehicle.vel.set(4, 0);
  obstacles[0] = new Obstacle(400, 250, 100);
}
//#endregion



//#region DRAW
function draw() {
  background(0);
  for (let obstacle of obstacles) {
    obstacle.show();
  }
  vehicle.avoid(obstacles[0]);


  //vehicle.seek(createVector(mouseX, mouseY));

  vehicle.edges();
  vehicle.update();
  vehicle.show();
}
//#endregion