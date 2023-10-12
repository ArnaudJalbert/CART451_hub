let system;
let slider;

let currentYear;
let F1DriversActiveYears;

async function getF1DriversActiveYears(year) {
  let F1DriversActiveYearsResponse = await fetch(
    `f1_drivers_years_active/years=${year}`,
  );
  return await F1DriversActiveYearsResponse.json();
}

async function setup() {
  // slider setup
  slider = createSlider(0, 20, 10, 1);
  slider.position(10, 10);
  slider.style("width", `${window.innerWidth - window.innerWidth * 0.02}px`);

  // canvas init
  createCanvas(window.innerWidth, window.innerHeight);

  currentYear = slider.value();
  F1DriversActiveYears = await getF1DriversActiveYears(currentYear);

  // particle system
  system = new ParticleSystem(
    createVector(window.innerWidth / 2, window.innerHeight / 2),
  );

  for (const F1Driver of F1DriversActiveYears) {
    system.addParticle();
  }
}

// inspired by: https://p5js.org/examples/simulate-particle-system.html

async function draw() {
  if (slider.value() !== currentYear) {
    currentYear = slider.value();
    F1DriversActiveYears = await getF1DriversActiveYears(currentYear);
    system.clear();
    for (const F1Driver of F1DriversActiveYears) {
      system.addParticle();
    }
  }
  background(100);
  system.run();
}

let Particle = function (position) {
  this.acceleration = createVector(0, 0); // Change y-component to negative for buoyant force
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.position.x = Math.random() * window.innerWidth;
  this.position.y = Math.random() * window.innerHeight;
  this.alive = true;
};

Particle.prototype.run = function () {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
};

// Method to display
Particle.prototype.display = function () {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function () {
  return this.lifespan < 0;
};

let ParticleSystem = function (position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function () {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

ParticleSystem.prototype.clear = function () {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    this.particles[i].lifespan = 0;
  }
};
