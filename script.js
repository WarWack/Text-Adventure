 /*
        1. p5.js DOM elements – https://p5js.org/learn/dom.html
        2. Particle Systems (The Coding Train) – https://www.youtube.com/watch?v=17WoOqgXsRM
        3. p5.Vector and motion – https://p5js.org/reference/#/p5.Vector/random2D
      */

        let nameInput, fireButton, explosionSlider;
        let particles = [];
  
        function setup() {
          createCanvas(1250, 900);
          background(200);
  
          //box for type
          createP('type that type in yeo');
          nameInput = createInput();
  
          // how big boom is
          createP('Explosion intensity:');
          explosionSlider = createSlider(5, 100, 20);
  
          // Create a button that triggers the fireworks
          fireButton = createButton('KABOOM BUTTON');
          fireButton.mousePressed(triggerExplosion);
        }
  
        function draw() {
          background(0, 25); // fade effect for trails
  
          // particle update
          for (let p of particles) {
            p.update();
            p.show();
          }
  
          // particle fade
          particles = particles.filter(p => !p.isDone());
        }
  
        // screen reset on click
        function mousePressed() {
          background(0);
        }
  
        // start when button is clicked
        function triggerExplosion() {
          let name = nameInput.value();
          let explosionSize = explosionSlider.value();
  
          // Create one particle per character
          for (let i = 0; i < name.length; i++) {
            let x = random(width);
            let y = random(height);
            particles.push(new Particle(x, y, name[i], explosionSize));
          }
        }
  
        class Particle {
          constructor(x, y, letter, explosionSize) {
            this.pos = createVector(x, y);
            this.vel = p5.Vector.random2D().mult(random(1, explosionSize / 10));
            this.acc = createVector(0, 0.05); // simulate gravity
            this.lifetime = 255;
            this.letter = letter;
          }
  
          update() {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.lifetime -= 4;
          }
  
          isDone() {
            return this.lifetime < 0;
          }
  
          show() {
            fill(255, this.lifetime);
            textSize(24);
            textAlign(CENTER, CENTER);
            text(this.letter, this.pos.x, this.pos.y);
          }
        }