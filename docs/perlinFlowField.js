class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxspeed = 4;
        this.prevPos = this.pos.copy();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    follow(vectors) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    show() {
        stroke(107, 119, 255, 8);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }

    updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }

    }

}



let inc = 0.1;
let scl = 30;
let cols, rows;
let zoff = 0;
let particles = [];
let flowfield;


function setup() {
    const perlin = createCanvas(window.innerWidth, window.innerHeight);
    perlin.parent('landingCanvasContainer');
    cols = floor(window.innerWidth / scl);
    rows = floor(window.innerHeight / scl);
    let numParticles = 300;

    flowfield = new Array(cols * rows);
    for (let i = 0; i < numParticles; i++) {
        particles[i] = new Particle();
    }
    background(0);
    const el = document.querySelector('#landingLightsWrapper');
    const title1 = document.querySelector('.landing .logoText');
    const title2 = document.querySelector('.landing .logoTextTesseract');
    const titleEl = document.querySelector('.big');
    let out = '';

    let lightsNumber = Math.floor(window.innerWidth / 100);
    const circleSize = window.innerWidth / 10
    for (let i = 0; i < lightsNumber; i++) {
        out += `<svg class='landingLights' height='${circleSize}' viewBox='0 0 50 50' width='90'><g><circle class='lights' cx='25' cy='25' r='20' stroke-width='0' fill='#000' /></g></svg>`
    }
    el.innerHTML = out;
    const lights = document.querySelectorAll('.lights');

    function converge(x, i) {
        let out = 0;
        for (let l = 1; l <= i; l++) {
            out += x / (1.5 * l)
        }
        return out;
    }

    for (let i = 0; i < Math.floor(lightsNumber * 11 / 20); i++) {
        setTimeout(() => {
            lights[i].setAttribute('fill', '#fff');
        }, converge(1000, i))
    }

    for (let i = Math.floor(lightsNumber * 11 / 20); i < lightsNumber; i++) {
        setTimeout(() => {
            lights[i].setAttribute('fill', '#6b77ff');
        }, converge(1000, i))
    }

    setTimeout(() => {
        title2.classList.add('logoTextTesseractTransparent');
    }, converge(1000, lightsNumber - 1) - 20)

    setTimeout(() => {
        title1.classList.add('logoTextWhite');
        title2.classList.add('logoTextTesseractGradient');
        document.querySelector('#landingLogo svg g').classList.add('landingLogoVisible');
        titleEl.classList.add('big2');
        if (usePerlinFallback) {
            document.querySelector('.landingCanvasOverlay').style.background = 'radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgb(7, 0, 31) 100%), url(static/img/perlinFallback.png)'
            document.querySelector('.landingCanvasOverlay').classList.add('perlinFallback')
        }
        setTimeout(() => {
            el.innerHTML = '';
        }, 200)
    }, converge(1000, lightsNumber - 1))

    setTimeout(() => {
        document.querySelector('.doubleDown').classList.add('doubleDown2');
    }, 5000);
}

let fps = [];
let countFps = true;
let usePerlinFallback = false;
let looping = true;
let perlinAnimComp = false;
let timeElapsed = 0;
let start = performance.now();
let perlinRunTime = 30000;
if (window.innerWidth < 600) {
    perlinRunTime = 10000;
}


function draw() {
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            let index = x + y * cols;
            let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
            let v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowfield[index] = v;
            xoff += inc;
            stroke(0, 50);
        }
        yoff += inc;
        zoff += 0.0003;
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }
    if (performance.now() - start > perlinRunTime) {
        noLoop();
        // document.removeEventListener('scroll', smth);
        perlinAnimComp = true;
        looping = false;
    }
    if (countFps) {
        fps.push(Math.floor(frameRate()));
    }
    if (fps.length > 9) {
        let sum = 0;
        for (let i in fps) {
            sum += fps[i]
        }
        sum /= 10
        // console.log(sum);
        if (sum < 20) {
            console.log('got a weakling');
            usePerlinFallback = true;
            noLoop();
        }
        fps = [];
        countFps = false;
    }
    // console.log(frameRate())
}


function smth() {
    if (window.innerHeight > window.scrollY) {
        if (!looping && !usePerlinFallback && !perlinAnimComp) {
            start = performance.now() - timeElapsed;
            looping = true;
            loop();
        }
    } else {
        if (looping && !usePerlinFallback) {
            timeElapsed = performance.now() - start;
            // console.log(timeElapsed);
            document.querySelector('.doubleDown').style.display = 'none';
            looping = false;
            try{noLoop()}catch{}
        } else if (usePerlinFallback || perlinAnimComp) {
            document.querySelector('.doubleDown').style.display = 'none';
            document.removeEventListener('scroll', smth);
        }
    }
}
document.addEventListener('scroll', smth);