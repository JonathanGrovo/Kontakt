// setup
//canvas object
let canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let gradient = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height);

//define color gradient for particles
gradient.addColorStop(0, 'rgba( 114, 137, 218, 1)');
gradient.addColorStop(0.8, 'rgba( 114, 137, 218, 1)');
gradient.addColorStop(1, 'rgba( 114, 137, 218, 0)');

//particles and lines are filled in according to color gradient
ctx.fillStyle = gradient;
ctx.strokeStyle = gradient;



// handles window resizing
function resizeCanvas() {
    // canvas width and height are set to new window width and height
    canvas.width  = document.documentElement.clientWidth; // ensures theres no horizontal scrollbar
    canvas.height = window.innerHeight

    // recreate canvas gradiewnt
    gradient = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height);

    // recreate gradient stop values
    gradient.addColorStop(0, 'rgba( 114, 137, 218, 1)');
    gradient.addColorStop(0.8, 'rgba( 114, 137, 218, 1)');
    gradient.addColorStop(1, 'rgba( 114, 137, 218, 0)');

    // reset where effect takes place
    effect.width = canvas.width;
    effect.height = canvas.height;

    // color of dots and lines set back to original colors
    ctx.fillStyle = gradient;
    ctx.strokeStyle = gradient;
}

class Particle {
    constructor(effect){
        this.effect = effect;
        // sets particle size randomly
        this.radius = Math.random() * 3 + 1;
        // sets particle position in window randomly
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        // sets particle velocity randomly
        this.vx = (Math.random() * 1 - 0.5) * 0.2;
        this.vy = (Math.random() * 1 - 0.5) * 0.2;
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        // this.opacity used for opacity property
        context.fillStyle = `rgba( 114, 137, 218, ${this.opacity * context.globalAlpha})`;
        context.fill();
    }
    update(){
        this.x += this.vx;
        if (this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;
        this.y += this.vy;
        if (this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1;
    }
}

class Effect {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 150;
        this.globalAlpha = 0; // initial opacity
        this.createParticles();
    }
    createParticles(){
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this));
        }
    }
    handleParticles(context){
        // gradually increase global alpha
        if (this.globalAlpha < 1) {
            this.globalAlpha += 0.001; // rate at which global alpha increases
            context.globalAlpha = this.globalAlpha; // context global alpha change
        } else {
            context.globalAlpha = 1; // ensure the global alpha of context is 1
        }

        this.connectParticles(context);
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        })
    }
    connectParticles(context){
        const maxDistance = 150;
        for (let a = 0; a < this.particles.length; a++){
            for (let b = a; b < this.particles.length; b++){
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const distance = Math.hypot(dx, dy);
                if (distance < maxDistance){
                    context.save();
                    // opacity is dependent on both distance and current global alpha value
                    const opacity = (1 - (distance/maxDistance)) * context.globalAlpha;
                    context.globalAlpha = opacity;
                    context.beginPath();
                    context.moveTo(this.particles[a].x, this.particles[a].y);
                    context.lineTo(this.particles[b].x, this.particles[b].y);
                    context.stroke();
                    context.restore();
                }
            }
        }
    }
}
const effect = new Effect(canvas);
effect.handleParticles(ctx);

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}

//listens for window resize event
window.addEventListener('resize', () => {
    resizeCanvas();
})

//listens for scroll event
window.addEventListener('scroll', () => {
    resizeCanvas();
})

animate();