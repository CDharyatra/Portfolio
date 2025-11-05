// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    // Keep navbar pure black always - no transparency or effects
    navbar.style.background = '#000000';
    navbar.style.boxShadow = 'none';
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.tech-item, .project-card, .timeline-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});


// Smart typing effect that preserves HTML formatting
function smartTypeWriter(element, speed = 80) {
    const fullText = "Hi, I'm Dharyatra Chauhan";
    const nameStart = fullText.indexOf("Dharyatra Chauhan");
    let i = 0;
    
    element.innerHTML = '';
    
    function type() {
        if (i <= fullText.length) {
            let displayText = '';
            
            if (i <= nameStart) {
                // Before the name - just regular text
                displayText = fullText.substring(0, i);
            } else {
                // Include the name with gradient styling
                const beforeName = fullText.substring(0, nameStart);
                const nameLength = "Dharyatra Chauhan".length;
                const nameProgress = Math.min(i - nameStart, nameLength);
                const nameText = "Dharyatra Chauhan".substring(0, nameProgress);
                
                if (nameProgress > 0) {
                    displayText = beforeName + '<span class="gradient-text">' + nameText + '</span>';
                } else {
                    displayText = beforeName;
                }
            }
            
            element.innerHTML = displayText;
            
            if (i < fullText.length) {
                i++;
                setTimeout(type, speed);
            } else {
                // Typing complete - hide cursor after a delay
                setTimeout(() => {
                    element.classList.add('typing-complete');
                }, 1000);
            }
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setTimeout(() => {
            smartTypeWriter(heroTitle, 100);
        }, 500);
    }
});

// Tech stack items hover effect
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:chauhandharyatra@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Thank you! Your email client should open now.', 'success');
    
    // Reset form
    this.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}


// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight > window.innerHeight / 2) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #60a5fa !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
        font-family: 'Inter', sans-serif;
        transition: opacity 0.5s ease;
    `;
    
    const loaderSpinner = `
        <style>
            .loader-content {
                text-align: center;
            }
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255,255,255,0.3);
                border-top: 3px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', loaderSpinner);
    document.body.appendChild(loader);
    
    // Remove loader after 2 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 2000);
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(135deg, #60a5fa, #a855f7);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Dynamic Particle System for Hero Background
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.life = Math.random() * 100;
        // Initialize with default values, will be reset properly in createParticles
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.size = 1;
        this.opacity = 0.5;
    }
    
    reset(logicalWidth, logicalHeight) {
        this.x = Math.random() * logicalWidth;
        this.y = Math.random() * logicalHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update(logicalWidth, logicalHeight) {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        
        // Wrap around edges (using logical dimensions)
        if (this.x < 0) this.x = logicalWidth;
        if (this.x > logicalWidth) this.x = 0;
        if (this.y < 0) this.y = logicalHeight;
        if (this.y > logicalHeight) this.y = 0;
        
        // Fade in and out
        this.opacity = 0.5 + 0.3 * Math.sin(this.life * 0.02);
    }
    
    draw() {
        this.ctx.save();
        this.ctx.globalAlpha = this.opacity;
        
        // Outer glow
        this.ctx.fillStyle = `rgba(96, 165, 250, ${this.opacity * 0.3})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner core
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
    }
}

// Initialize particle system for entire website
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    let isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 120;
    
    // Get device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    
    // Store logical dimensions (CSS dimensions, not physical pixels)
    let logicalWidth = window.innerWidth;
    let logicalHeight = window.innerHeight;
    
    function resizeCanvas() {
        // Set actual size in memory (scaled for device pixel ratio)
        logicalWidth = window.innerWidth;
        logicalHeight = window.innerHeight;
        
        canvas.width = logicalWidth * dpr;
        canvas.height = logicalHeight * dpr;
        
        // Scale the canvas back down using CSS
        canvas.style.width = logicalWidth + 'px';
        canvas.style.height = logicalHeight + 'px';
        
        // Reset transform and scale the drawing context
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }
    
    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            const particle = new Particle(canvas);
            particle.reset(logicalWidth, logicalHeight);
            particles.push(particle);
        }
    }
    
    function drawConnections() {
        ctx.save();
        
        // Different connection distance for mobile (less cluttered)
        const connectionDistance = isMobile ? 80 : 120;
        const maxAlpha = isMobile ? 0.3 : 0.5;
        const lineWidth = isMobile ? 1 : 1.5;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const alpha = (connectionDistance - distance) / connectionDistance * maxAlpha;
                    
                    ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
                    ctx.lineWidth = lineWidth;
                    ctx.globalAlpha = 1;
                    
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        ctx.restore();
    }
    
    function animate() {
        // Clear with proper scaling
        const width = window.innerWidth;
        const height = window.innerHeight;
        ctx.clearRect(0, 0, width, height);
        
        // Get scroll position for dynamic effects
        const scrollY = window.pageYOffset;
        const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight);
        
        // Update particles with scroll influence
        particles.forEach((particle, index) => {
            particle.update(logicalWidth, logicalHeight);
            
            // Add subtle scroll-based movement (reduced on mobile)
            const scrollIntensity = isMobile ? 0.05 : 0.1;
            particle.x += Math.sin(scrollProgress * Math.PI * 2 + index * 0.1) * scrollIntensity;
            particle.y += Math.cos(scrollProgress * Math.PI * 2 + index * 0.15) * scrollIntensity;
        });
        
        // Draw connections first (so they appear behind particles)
        drawConnections();
        
        // Draw particles on top
        particles.forEach(particle => {
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Initialize
    resizeCanvas();
    createParticles();
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        const nowMobile = window.innerWidth < 768;
        
        resizeCanvas();
        
        // Adjust particle count based on new window size
        const newParticleCount = nowMobile ? 35 : 120;
        
        if (particles.length < newParticleCount) {
            // Add more particles
            for (let i = particles.length; i < newParticleCount; i++) {
                particles.push(new Particle(canvas));
            }
        } else if (particles.length > newParticleCount) {
            // Remove excess particles
            particles.splice(newParticleCount);
        }
        
        // Reset existing particles with logical dimensions
        particles.forEach(particle => particle.reset(logicalWidth, logicalHeight));
        
        // Update mobile flag
        isMobile = nowMobile;
    });
}

// Start particle system when page loads
document.addEventListener('DOMContentLoaded', initParticleSystem);

// Floating elements animation
document.addEventListener('DOMContentLoaded', () => {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = element.dataset.speed || 1;
        let position = 0;
        
        setInterval(() => {
            position += speed * 0.5;
            element.style.transform = `translateY(${Math.sin(position * 0.01) * 20}px) translateX(${Math.cos(position * 0.008) * 15}px)`;
        }, 50);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform += ` translateY(${scrolled * speed * 0.1}px)`;
    });
});


