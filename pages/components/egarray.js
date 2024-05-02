export const egArray = [
    {
      value: "Conway's Game of Life",
      prompt: "Conway's Game of Life",
      code: `function setup() {
          createCanvas(400, 400);
          background(255);
          frameRate(10);
          cells = Array(floor(width / 20));
          for (let i = 0; i < cells.length; i++) {
            cells[i] = Array(floor(height / 20));
            for (let j = 0; j < cells[i].length; j++) {
              cells[i][j] = floor(random(2));
            }
          }
        }
        function draw() {
          background(255);
          for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
              let x = i * 20;
              let y = j * 20;
              if (cells[i][j] == 1) {
                fill(0);
                stroke(0);
                rect(x, y, 20, 20);
              }
            }
          }
          let nextGen = Array(cells.length);
          for (let i = 0; i < cells.length; i++) {
            nextGen[i] = Array(cells[i].length);
            for (let j = 0; j < cells[i].length; j++) {
              let state = cells[i][j];
              let neighbours = countNeighbours(cells, i, j);
              if (state == 0 && neighbours == 3) {
                nextGen[i][j] = 1;
              } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
                nextGen[i][j] = 0;
              } else {
                nextGen[i][j] = state;
              }
            }
          }
          cells = nextGen;
        }
        function countNeighbours(cells, x, y) {
          let sum = 0;
          for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
              let col = (x + i + cells.length) % cells.length;
              let row = (y + j + cells[0].length) % cells[0].length;
              sum += cells[col][row];
            }
          }
          sum -= cells[x][y];
          return sum;
        }`
    },
    {
      value: "2D flocking animation",
      prompt: "2D flocking animation",
      code: `const flock = [];
  
      function setup() {
        createCanvas(800, 600);
        
        for(let i = 0; i < 100; i++) {
          flock.push(new Boid());
        }
      }
      
      function draw() {
        background(255);
        
        for(let boid of flock) {
          boid.flock(flock);
          boid.update();
          boid.edges();
          boid.show();
        }
      }
      
      class Boid {
        constructor() {
          this.position = createVector(random(width), random(height));
          this.velocity = p5.Vector.random2D();
          this.velocity.setMag(random(2, 4));
          this.acceleration = createVector();
          this.maxForce = 0.2;
          this.maxSpeed = 4;
        }
        
        flock(boids) {
          let alignment = createVector();
          let cohesion = createVector();
          let separation = createVector();
          
          let perceptionRadius = 50;
          let total = 0;
          
          for(let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            
            if(other != this && distance < perceptionRadius) {
              alignment.add(other.velocity);
              cohesion.add(other.position);
              separation.add(p5.Vector.sub(this.position, other.position));
              total++;
            }
          }
          
          if(total > 0) {
            alignment.div(total);
            alignment.setMag(this.maxSpeed);
            alignment.sub(this.velocity);
            alignment.limit(this.maxForce);
            
            cohesion.div(total);
            cohesion.sub(this.position);
            cohesion.setMag(this.maxSpeed);
            cohesion.sub(this.velocity);
            cohesion.limit(this.maxForce);
            
            separation.div(total);
            separation.setMag(this.maxSpeed);
            separation.sub(this.velocity);
            separation.limit(this.maxForce);
          }
          
          this.acceleration.add(alignment);
          this.acceleration.add(cohesion);
          this.acceleration.add(separation);
        }
        
        update() {
          this.velocity.add(this.acceleration);
          this.velocity.limit(this.maxSpeed);
          this.position.add(this.velocity);
          this.acceleration.mult(0);
        }
        
        show() {
          strokeWeight(8);
          stroke(55, 139, 255);
          point(this.position.x, this.position.y);
        }
        
        edges() {
          if(this.position.x > width) this.position.x = 0;
          else if(this.position.x < 0) this.position.x = width;
          
          if(this.position.y > height) this.position.y = 0;
          else if(this.position.y < 0) this.position.y = height;
        }
      }`
    },
    {
      value: "3D forms panning",
      prompt: "Panning around a 3d scene with spheres, cubes, pyramids",
      code: `const spheres = [];
      const cubes = [];
      const pyramids = [];
      
      function setup() {
        createCanvas(400, 400, WEBGL);
        for (let i = 0; i < 5; i++) {
          spheres.push(new Sphere(random(-100, 100), random(-100, 100), random(-100, 100)));
          cubes.push(new Cube(random(-100, 100), random(-100, 100), random(-100, 100)));
          pyramids.push(new Pyramid(random(-100, 100), random(-100, 100), random(-100, 100)));
        }
      }
      
      function draw() {
        background(200);
        noStroke();
        lights();
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);
        for (let i = 0; i < 5; i++) {
          spheres[i].show();
          cubes[i].show();
          pyramids[i].show();
        }
      }
      
      class Sphere {
        constructor(x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;
        }
        show() {
          push();
          translate(this.x, this.y, this.z);
          sphere(20);
          pop();
        }
      }
      
      class Cube {
        constructor(x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;
        }
        show() {
          push();
          translate(this.x, this.y, this.z);
          box(40);
          pop();
        }
      }
      
      class Pyramid {
        constructor(x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;
        }
        show() {
          push();
          translate(this.x, this.y, this.z);
          beginShape();
          vertex(0, -20, 0);
          vertex(10, 10, -10);
          vertex(-10, 10, -10);
          endShape(CLOSE);
          pop();
        }
      }`
    },
    {
      value: "Radial lines on click",
      prompt: "A line in a random direction starts from where the user presses",
      code: `function setup() {
        createCanvas(400, 400);
      }
      
      function draw() {
        strokeWeight(2);
        if (mouseIsPressed) {
          let angle = random(0, 360);
          let dx = cos(angle);
          let dy = sin(angle);
          line(mouseX, mouseY, mouseX + dx * 50, mouseY + dy * 50);
        }
      }`
    },
    {
      value: "Gravity balls on click",
      prompt: "every click creates a bouncing ball that eventually rests on the floor",
      code: `function setup() {
        createCanvas(400,400);
        rectMode(CENTER);
      }
      
      let balls = [];
      
      function draw() {
        background(200);
        for(let ball of balls) {
          ball.show();
          ball.move();
          ball.bounce();
          ball.stop();
        }
      }
      
      function mousePressed() {
        balls.push(new Ball(mouseX,mouseY,random(10,30)));
      }
      
      class Ball {
        constructor(x,y,r) {
          this.pos = createVector(x,y);
          this.vel = createVector(random(-3,3),random(-8,-3));
          this.acc = createVector(0,0.1);
          this.r = r;
          this.rest = false;
        }
        
        show() {
          strokeWeight(2);
          stroke(0);
          fill(255,0,0);
          ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
        }
        
        move() {
          if(!this.rest) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
          }
        }
        
        bounce() {
          if(this.pos.y+this.r > height) {
            this.vel.y *= -0.8;
            this.pos.y = height-this.r;
          }
        }
        
        stop() {
          if(this.vel.y < 0.1 && this.pos.y+this.r >= height) {
            this.rest = true;
            this.vel = createVector(0,0);
            this.acc = createVector(0,0);
          }
        }
      }`
    },
    {
      value: "Bouncing balls on click",
      prompt: "bouncing balls everywhere",
      code: `let balls = [];

      function setup() {
        createCanvas(windowWidth, windowHeight);
      }
      
      function draw() {
        background(220);
      
        for (let i = 0; i < balls.length; i++) {
          balls[i].update();
          balls[i].show();
        }
      }
      
      class Ball {
        constructor(x, y, speedX, speedY, size) {
          this.x = x;
          this.y = y;
          this.speedX = speedX;
          this.speedY = speedY;
          this.size = size;
        }
      
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
      
          if (this.x < 0 || this.x > width) {
            this.speedX *= -1;
          }
          if (this.y < 0 || this.y > height) {
            this.speedY *= -1;
          }
        }
      
        show() {
          noStroke();
          fill(random(255), random(255), random(255));
          ellipse(this.x, this.y, this.size);
        }
      }
      
      function mousePressed() {
        balls.push(new Ball(mouseX, mouseY, random(-10, 10), random(-10, 10), random(20, 50)));
      }`
    },
    {
      value: "Color noise static",
      prompt: "CRT TV static",
      code: `const numRects = 500;
      const rectWidth = 2;
      const rectHeight = 2;
      let rects = [];
      
      function setup() {
        createCanvas(windowWidth, windowHeight);
        for (let i = 0; i < numRects; i++) {
          rects.push({
            x: random(width),
            y: random(height),
            r: random(255),
            g: random(255),
            b: random(255)
          });
        }
        background(0);
      }
      
      function draw() {
        for (let i = 0; i < numRects; i++) {
          noStroke();
          fill(rects[i].r, rects[i].g, rects[i].b);
          rect(rects[i].x, rects[i].y, rectWidth, rectHeight);
          if (random(100) < 1) {
            rects[i].x = random(width);
            rects[i].y = random(height);
          }
        }
      }`
    },
    {
      value: "Zen ripples",
      prompt: "perlin noise moving ripples, super zen",
      code: `const ripples = [];
  
      function setup() {
        createCanvas(windowWidth, windowHeight);
        stroke(255);
        noFill();
        for (let i = 0; i < 10; i++) {
          ripples.push(new Ripple(random(width), random(height)));
        }
      }
      
      function draw() {
        background(0);
        for (let i = 0; i < ripples.length; i++) {
          ripples[i].update();
          ripples[i].display();
        }
      }
      
      class Ripple {
        constructor(x, y) {
          this.pos = createVector(x, y);
          this.r = 50;
          this.maxR = 500;
        }
      
        update() {
          this.r += noise(frameCount / 100, this.pos.y / 100) * 5;
          if (this.r > this.maxR) {
            this.r = 0;
            this.pos.x = random(width);
            this.pos.y = random(height);
          }
        }
      
        display() {
          ellipse(this.pos.x, this.pos.y, this.r, this.r / 2);
        }
      }`
    },
  ];