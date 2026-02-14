// Hero animation (already exists)
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBtns = document.querySelectorAll('.hero-btn');
    const heroImg = document.querySelector('.hero-img');

    heroTitle.style.opacity = '1';
    heroSubtitle.style.opacity = '1';
    heroImg.style.opacity = '1';
    heroBtns.forEach(btn => btn.style.opacity = '1');
});

// 3D Parallax effect for hero
const heroContainer = document.querySelector('.hero-image-container');
const heroImage = document.querySelector('.hero-img');

heroContainer.addEventListener('mousemove', (e) => {
    const rect = heroContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    heroImage.style.transform = `translateY(-5px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

heroContainer.addEventListener('mouseleave', () => {
    heroImage.style.transform = `translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)`;
});

// Animate feature & testimonial cards on scroll
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .testimonial-card').forEach(card => {
    observer.observe(card);
});


/* ============================================
   TESTIMONIALS SECTION JS
   Only modify this section for testimonial animation
============================================ */

const testimonialCards = document.querySelectorAll('#testimonials .testimonial-card');

const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('fade-in-up');
        }
    });
}, { threshold: 0.2 });

testimonialCards.forEach(card => {
    testimonialObserver.observe(card);
});



// Fade-in for features, testimonials, products
const fadeElements = document.querySelectorAll('.feature-card, .testimonial-card, .product-card');

function handleFadeIn() {
    const triggerBottom = window.innerHeight * 0.85;
    fadeElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            el.classList.add('fade-in-up');
        }
    });
}
window.addEventListener('scroll', handleFadeIn);
window.addEventListener('load', handleFadeIn);

// Auto-slide carousel
var productsCarousel = document.querySelector('#productsCarousel');
var carousel = new bootstrap.Carousel(productsCarousel, {
    interval: 4000,
    ride: 'carousel'
});

// Scroll-triggered fade-in for Contact Section
document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll('#contact .fade-in-up');

    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});


const canvas = document.getElementById('blobCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();

window.addEventListener('resize', resizeCanvas);

const particles = [];
const particleCount = 25;

// Generate particles
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 20 + Math.random() * 40,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
        color: `rgba(245,231,222,${0.4 + Math.random()*0.3})`
    });
}

const canvas = document.getElementById('blobCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particles = [];
const numParticles = 25;

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 15 + Math.random() * 30;
        this.dx = (Math.random() - 0.5) * 1.5;
        this.dy = (Math.random() - 0.5) * 1.5;
        this.color = 'rgba(245,231,222,0.6)';
    }
    draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, this.radius*0.2, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(245,231,222,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
    }
    update() {
        if(this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if(this.y < 0 || this.y > canvas.height) this.dy *= -1;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

// Init particles
for(let i=0;i<numParticles;i++){
    particles.push(new Particle());
}

// Animate
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => p.update());
    requestAnimationFrame(animate);
}
animate();
