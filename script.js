//eces bouncy ball sim
//tinkering 10

const options = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const ballCount = 50;
let balls = [];
let lastTimestamp = performance.now();

function setup(){
    canvas.width = options.width;
    canvas.height = options.height;

    for(let i = 0; i < ballCount; i++){
        let randSize = randInt(20, 100);
        let randX = randFloat(0 + randSize/2, options.width - randSize/2);
        let randY = randFloat(0 + randSize/2, options.height - randSize/2);
        let randVX = randFloat(-1, 1);
        let randVY = randFloat(-1, 1);
        let randColour = `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`;

        balls.push(new Ball(randX, randY, randSize, randVX, randVY, randColour));
    }

    requestAnimationFrame(loop);
}

//update function
function update(){
    for(let ball of balls){
        ball.update();
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let ball of balls){
    ball.draw(ctx);
    }
}

function loop(now){
    update();
    draw();
    debug(now);
    requestAnimationFrame(loop);
}

//debug
function debug(timeStamp){
    let secondsPassed = (timeStamp - lastTimestamp) / 1000;
    lastTimestamp = timeStamp;

    ctx.font = '25px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText("FPS: " + Math.round(1 / secondsPassed), 10, 30);

}

//events
window.addEventListener('load', setup);

//helper function
function randInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randFloat(min, max){
    return Math.random() * (max - min) + min;
}

//classes
class Ball{
    constructor(x, y, size, vx, vy, colour){
        this.x = x;
        this.y = y,
        this.radius = size / 2;
        this.vx = vx;
        this.vy = vy;
        this.colour = colour;
    }

    update(){
        if(
            this.x - this.radius < 0 || 
            this.x + this.radius > options.width){
            this.vx *= -1;
        }

        if(
            this.y - this.radius < 0 || 
            this.y + this.radius > options.height){
            this.vy *= -1;
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    draw(_ctx){
        _ctx.beginPath();
        _ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
        _ctx.closePath();
        _ctx.fillStyle = this.colour;
        _ctx.fill();
    }
}