const MAX_ACCELERATION = 5;
const MID_ACCELERATION = 3;

let balls_arr;
const N_BALLS = 30;
const MAX_R = 30;
const MIN_R = 10;



function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(30);

  balls_arr = [];
  accel = [1, -1];

  for (let i = 0; i < N_BALLS; i++) {
    let pos = createVector(random(5, window.innerWidth), random(50, window.innerHeight));
    //let pos = createVector(400 + 200 * i, 200);
    let r = Math.floor(random(MIN_R, MAX_R));
    balls_arr.push(new Ball(pos, r, i));
    //console.log(i + " : " + balls_arr[i].r);
  }

}

function draw() {
  background(20, 40, 60);
  // let c = color(182, 206, 219);
  // fill(c);
  // stroke(182, 206, 219);

  for (let i = 0; i < N_BALLS; i++) {
    //balls_arr[i].run();
    balls_arr[i].update();
    collisions_update();
    balls_arr[i].draw();
  }
  //circle(x, 30, 20);
}


let Ball = function (pos, R, i) {

  this.r = R;
  this.position = pos.copy();
  let x_accel = Math.floor(random(-MAX_ACCELERATION, MAX_ACCELERATION));
  let y_accel = Math.floor(random(-MAX_ACCELERATION, MAX_ACCELERATION));
  if (x_accel == 0 && y_accel == 0) {
    x_accel = 2;
    x_accel = 3;
  }
  this.acceleration = createVector(x_accel, y_accel);
  //this.velocity = Math.sqrt(x_accel**2 + y_accel**2);

  // if (i == 0) {
  //   this.acceleration = createVector(2, 1);
  // }
  // else {
  //   this.acceleration = createVector(-2, 1);
  // }

  //this.acceleration = createVector(i * 2 + i, 0);
  //this.velocity = Math.sqrt((i * 2 + i) ** 2);

};

Ball.prototype.run = function () {
  this.update();
  this.draw();
}

Ball.prototype.update = function () {
  this.position.x += this.acceleration.x;
  this.position.y += this.acceleration.y;

  if (this.position.x > window.innerWidth && this.acceleration.x > 0) {
    this.position.x = 0;
  }

  if (this.position.x < -MAX_R && this.acceleration.x < 0) {
    this.position.x = window.innerWidth;
  }

  if (this.position.y > window.innerHeight && this.acceleration.y > 0) {
    this.position.y = 0;
  }

  if (this.position.y < - MAX_R && this.acceleration.y < 0) {
    this.position.y = window.innerHeight;
  }

  //collision_updates();

}

Ball.prototype.draw = function () {
  //if (this.position.y > window.innerHeight / 4) {
  let variant = this.position.y / window.innerHeight * 206;
  c = color(182, 206 - variant, 219);
  fill(c);
  stroke(182, 206 - variant, 219);
  // }
  // else {
  //   c = color(182, 206, 219);
  //   fill(c);
  //   stroke(182, 206, 219);
  // }

  circle(this.position.x, this.position.y, 2 * this.r);
}

function collisions_update() {
  for (let i = 0; i < N_BALLS - 1; i++) {
    for (let j = i + 1; j < N_BALLS; j++) {
      let ab = Math.sqrt((balls_arr[i].position.x - balls_arr[j].position.x) ** 2 + (balls_arr[i].position.y - balls_arr[j].position.y) ** 2); //distance between the centers
      if (ab <= balls_arr[i].r + balls_arr[j].r) {
        //console.log(i + " : " + balls_arr[i].position.x + " , " + balls_arr[i].position.y);
        //console.log(j + " : " + balls_arr[j].position.x + " , " + balls_arr[j].position.y);

        let d = [balls_arr[i].position.x - balls_arr[j].position.x, balls_arr[i].position.y - balls_arr[j].position.y];
        let l = Math.sqrt((balls_arr[i].acceleration.x ** 2 + balls_arr[i].acceleration.y ** 2) / ((balls_arr[i].position.x - balls_arr[j].position.x) ** 2 + (balls_arr[i].position.y - balls_arr[j].position.y) ** 2));
        d[0] = d[0] * l;
        d[1] = d[1] * l;
        //console.log("l is : " + l);
        balls_arr[i].acceleration.x += d[0];
        balls_arr[i].acceleration.y += d[1];
        if (balls_arr[i].acceleration.x > MAX_ACCELERATION) balls_arr[i].acceleration.x = MID_ACCELERATION;
        else if (balls_arr[i].acceleration.x < -MAX_ACCELERATION) balls_arr[i].acceleration.x = -MID_ACCELERATION;

        if (balls_arr[i].acceleration.y > MAX_ACCELERATION) balls_arr[i].acceleration.y = MID_ACCELERATION;
        else if (balls_arr[i].acceleration.y < -MAX_ACCELERATION) balls_arr[i].acceleration.y = -MID_ACCELERATION;


        d = [balls_arr[j].position.x - balls_arr[i].position.x, balls_arr[j].position.y - balls_arr[i].position.y];
        l = Math.sqrt((balls_arr[i].acceleration.x ** 2 + balls_arr[i].acceleration.y ** 2) / ((balls_arr[j].position.x - balls_arr[i].position.x) ** 2 + (balls_arr[j].position.y - balls_arr[i].position.y) ** 2));
        d[0] = d[0] * l;
        d[1] = d[1] * l;

        balls_arr[j].acceleration.x += d[0];
        balls_arr[j].acceleration.y += d[0];

        if (balls_arr[j].acceleration.x > MAX_ACCELERATION) balls_arr[j].acceleration.x = MID_ACCELERATION;
        else if (balls_arr[j].acceleration.x < -MAX_ACCELERATION) balls_arr[j].acceleration.x = -MID_ACCELERATION;

        if (balls_arr[j].acceleration.y > MAX_ACCELERATION) balls_arr[j].acceleration.y = MID_ACCELERATION;
        else if (balls_arr[j].acceleration.y < -MAX_ACCELERATION) balls_arr[j].acceleration.y = -MID_ACCELERATION;

        //break;
      }
    }
  }
}


//(x-x0)^2 + (y-y0)^2 = r^2