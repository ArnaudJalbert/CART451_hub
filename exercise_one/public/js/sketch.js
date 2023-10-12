let particleSystem;
let slider;
let currentYear;
let F1DriversActiveYears;
let particleSize;

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

  // keeping track of the visualized year
  currentYear = slider.value();

  // particles setup
  particleSystem = new ParticleSystem();
  particleSize = 10;

  // setting the initional particles
  await particleSystem.setParticles(currentYear);

  slider.elt.addEventListener("mouseup", () => {
    particleSystem.setParticles();
  });
}

async function draw() {
  // background setup
  background(200);
  particleSystem.show();

  fill("black");
  strokeWeight(0);
  textSize(25);
  text(
    `Formula 1 Drivers Active for at least ${currentYear} year(s)`,
    10,
    window.innerHeight - 15,
  );
  fill("#F18F01");
  ellipse((13 * window.innerWidth) / 32, window.innerHeight - 20, 20);
  fill("#000000");
  textSize(20);
  text(
    "= F1 Champion",
    (13 * window.innerWidth) / 32 + 10,
    window.innerHeight - 15,
  );
  fill("#EF959D");
  ellipse((17 * window.innerWidth) / 32, window.innerHeight - 20, 20);
  fill("#000000");
  textSize(20);
  text(
    "= Pole Sitter+Winner",
    (17 * window.innerWidth) / 32 + 10,
    window.innerHeight - 15,
  );
  fill("#99C24D");
  ellipse((22 * window.innerWidth) / 32, window.innerHeight - 20, 20);
  fill("#000000");
  textSize(20);
  text(
      "= Winner",
      (22 * window.innerWidth) / 32 + 10,
      window.innerHeight - 15,
  );

  fill("#41BBD9");
  ellipse((24.5 * window.innerWidth) / 32, window.innerHeight - 20, 20);
  fill("#000000");
  textSize(20);
  text(
      "= Pole Sitter",
      (24.5 * window.innerWidth) / 32 + 10,
      window.innerHeight - 15,
  );

  fill("#555B6E");
  ellipse((27.5 * window.innerWidth) / 32, window.innerHeight - 20, 20);
  fill("#000000");
  textSize(20);
  text(
      "= No Pole/Win",
      (27.5 * window.innerWidth) / 32 + 10,
      window.innerHeight - 15,
  );
}

// inspired by: https://p5js.org/examples/simulate-particle-system.html
class Particle {
  constructor(driver) {
    this.x = Math.random() * (window.innerWidth - 40) + 20;
    this.y = Math.random() * (window.innerHeight - 100) + 50;
    this.driver = driver;
  }

  show() {
    // checking if they are a champion
    if (this.driver.Champion === "True") {
      fill("#F18F01");
    }
    // race winner and pole sitter
    else if (this.driver.Race_Wins > 0 && this.driver.Pole_Positions > 0) {
      fill("#EF959D");
    } else if (this.driver.Race_Wins > 0) {
      fill("#99C24D");
    }
    // checking if they are a pole sitter
    else if (this.driver.Pole_Positions > 0) {
      fill("#41BBD9");
    } else {
      fill("#555B6E");
    }
    ellipse(this.x, this.y, particleSize);
  }

  animate() {
    this.x = this.x + (Math.random() * 0.4 - 0.2);
    this.y = this.y + (Math.random() * 0.4 - 0.2);
  }
}

class ParticleSystem {
  constructor() {
    this.particles = Array();
    this.F1Drivers = Array();
  }

  addParticle(F1Driver) {
    this.particles.push(new Particle(F1Driver));
  }

  clearParticles() {
    this.particles = Array();
  }

  async setParticles() {
    this.clearParticles();
    currentYear = slider.value();
    // get the f1 drivers data
    this.F1Drivers = await getF1DriversActiveYears(currentYear);
    for (const F1Driver of this.F1Drivers) {
      particleSystem.addParticle(F1Driver);
    }
    particleSize = 838 / this.F1Drivers.length + 20;
    console.log(particleSize);
  }

  show() {
    for (const particle of this.particles) {
      particle.animate();
      particle.show();
    }
  }
}
