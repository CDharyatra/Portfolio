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

// Initialize Lenis Smooth Scroll
let lenis;

// Comprehensive device and platform detection
const userAgent = navigator.userAgent || navigator.vendor || window.opera;
const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
const isAndroid = /Android/.test(userAgent);
const isTablet = /iPad/.test(userAgent) || (isAndroid && !/Mobile/.test(userAgent));
const isMobileDevice = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
const isFirefox = /Firefox/i.test(userAgent);
const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);

function initSmoothScroll() {
    // Detect if device supports smooth scrolling well
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Platform-specific optimizations
    const shouldUseLenis = !isMobileDevice && !prefersReducedMotion;
    const duration = isMobileDevice ? 1.0 : (isSafari ? 1.1 : 1.2); // Slightly faster on Safari
    
    // Disable CSS scroll-behavior when using Lenis (it conflicts)
    if (shouldUseLenis) {
        document.documentElement.style.scrollBehavior = 'auto';
    }
    
    if (shouldUseLenis && typeof Lenis !== 'undefined') {
        try {
            lenis = new Lenis({
                duration: duration,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: isSafari ? 0.9 : 1, // Slightly less on Safari for better feel
                smoothTouch: false, // Native scrolling on mobile is better
                touchMultiplier: 2,
                infinite: false,
            });

            function raf(time) {
                if (lenis) {
                    lenis.raf(time);
                    requestAnimationFrame(raf);
                }
            }

            requestAnimationFrame(raf);
            
            // Mark that Lenis is active
            document.documentElement.classList.add('lenis-active');
            
            // Ensure Lenis can control scrolling properly
            // Some setups require this, but we'll keep native scroll for better compatibility
            // lenis.scrollTo(0); // Reset scroll position
            
            // Set up all scroll-dependent functions with Lenis
            lenis.on('scroll', () => {
                updateNavbar();
                updateActiveNavLink();
            });
            
            // Force an initial scroll update to ensure Lenis is working
            setTimeout(() => {
                if (lenis) {
                    const currentScroll = window.pageYOffset || window.scrollY;
                    if (currentScroll > 0) {
                        // Lenis is working
                        lenis.scrollTo(currentScroll, { immediate: true });
                    }
                }
            }, 100);
            
            // Monitor if user tries to scroll but page doesn't move (indicates Lenis issue)
            let lastScrollTime = Date.now();
            let lastScrollPosition = window.pageYOffset || window.scrollY || 0;
            let scrollAttempts = 0;
            
            // Listen for wheel events to detect scroll attempts
            const wheelHandler = (e) => {
                if (!lenis) return;
                
                const currentScroll = window.pageYOffset || window.scrollY || 0;
                const timeSinceLastScroll = Date.now() - lastScrollTime;
                
                // If user scrolled but position didn't change after 500ms, Lenis might be broken
                if (timeSinceLastScroll > 500 && Math.abs(currentScroll - lastScrollPosition) < 1) {
                    scrollAttempts++;
                    if (scrollAttempts >= 3) {
                        console.warn('Lenis appears to be blocking scroll, disabling it');
                        if (lenis && lenis.destroy) {
                            try {
                                lenis.destroy();
                            } catch(e) {}
                        }
                        lenis = null;
                        document.documentElement.classList.remove('lenis-active');
                        document.documentElement.style.scrollBehavior = 'smooth';
                        window.removeEventListener('wheel', wheelHandler);
                        window.addEventListener('scroll', updateNavbar, { passive: true });
                        window.addEventListener('scroll', updateActiveNavLink, { passive: true });
                    }
                } else {
                    scrollAttempts = 0;
                    lastScrollPosition = currentScroll;
                }
                lastScrollTime = Date.now();
            };
            
            window.addEventListener('wheel', wheelHandler, { passive: true });
            
            // Also set a timeout - if Lenis doesn't work after 2 seconds, disable it
            setTimeout(() => {
                if (!lenis) return;
                // Check if we can still scroll
                const canScroll = document.documentElement.scrollHeight > window.innerHeight;
                if (canScroll) {
                    // Try a test scroll
                    const testScroll = Math.min(100, document.documentElement.scrollHeight - window.innerHeight);
                    lenis.scrollTo(testScroll, { immediate: false, duration: 0.1 });
                    
                    setTimeout(() => {
                        const actualScroll = window.pageYOffset || window.scrollY || 0;
                        // If we tried to scroll but didn't move much, Lenis isn't working
                        if (actualScroll < 50 && canScroll) {
                            console.warn('Lenis scroll test failed, using native scroll');
                            if (lenis && lenis.destroy) {
                                try {
                                    lenis.destroy();
                                } catch(e) {}
                            }
                            lenis = null;
                            document.documentElement.classList.remove('lenis-active');
                            document.documentElement.style.scrollBehavior = 'smooth';
                            window.removeEventListener('wheel', wheelHandler);
                            window.addEventListener('scroll', updateNavbar, { passive: true });
                            window.addEventListener('scroll', updateActiveNavLink, { passive: true });
                        }
                    }, 300);
                }
            }, 2000);
        } catch (error) {
            console.error('Error initializing Lenis:', error);
            lenis = null;
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    } else {
        // Fallback: ensure native smooth scrolling works (desktop) or instant (mobile)
        lenis = null;
        if (isMobileDevice) {
            // Mobile: instant scrolling for better responsiveness
            document.documentElement.style.scrollBehavior = 'auto';
            document.documentElement.setAttribute('data-mobile', 'true');
        } else {
            // Desktop: smooth scrolling
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    }

    // Smooth scrolling for navigation links (works on all platforms)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (lenis && !isMobileDevice) {
                    // Use Lenis smooth scroll on desktop
                    lenis.scrollTo(target, {
                        offset: -70,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                } else {
                    // Native scroll on mobile/tablet - instant for better UX
                    const offset = isTablet ? -80 : -70;
                    if (isMobileDevice) {
                        // Mobile: instant scroll for better responsiveness
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'auto' // Instant on mobile
                        });
                    } else {
                        // Tablet/Desktop: smooth scroll
                        try {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                            // Additional offset for fixed navbar
                            setTimeout(() => {
                                window.scrollBy(0, offset);
                            }, 100);
                        } catch (err) {
                            // Fallback for older browsers
                            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            }
        });
    });
}

// Initialize smooth scroll when DOM is ready
// Use a small delay to ensure Lenis library is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if Lenis is available, if not wait a bit
    if (typeof Lenis === 'undefined') {
        // Wait for Lenis to load (it's loaded from CDN)
        let attempts = 0;
        const checkLenis = setInterval(() => {
            attempts++;
            if (typeof Lenis !== 'undefined' || attempts > 20) {
                clearInterval(checkLenis);
                initSmoothScroll();
            }
        }, 100);
    } else {
        initSmoothScroll();
    }
});

// Navbar background change on scroll (works with both Lenis and native scroll)
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Keep navbar pure black always - no transparency or effects
        navbar.style.background = '#000000';
        navbar.style.boxShadow = 'none';
    }
}

// Use Lenis scroll event if available, otherwise native scroll
if (typeof Lenis !== 'undefined' && !isMobileDevice) {
    // Will be set up after Lenis initializes
} else {
    window.addEventListener('scroll', updateNavbar, { passive: true });
}

// Enhanced Intersection Observer for smooth scroll-triggered animations
// Respect user's motion preferences for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const animationDelay = prefersReducedMotion ? 0 : 100; // No delay if reduced motion

const observerOptions = {
    threshold: isMobileDevice ? 0.05 : 0.1, // Lower threshold on mobile for earlier trigger
    rootMargin: isMobileDevice ? '0px 0px 0px 0px' : '0px 0px -100px 0px' // No negative margin on mobile
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add delay based on index for staggered animation (unless reduced motion)
            setTimeout(() => {
                entry.target.classList.add('animate-in');
            }, prefersReducedMotion ? 0 : index * animationDelay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for fade-in
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Observe tech items, project cards, and timeline items
    const animateElements = document.querySelectorAll('.tech-item, .project-card, .timeline-item');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Fallback: If Intersection Observer doesn't work on mobile, show elements after a delay
    // This ensures content is always visible even if observer fails
    if (isMobileDevice) {
        setTimeout(() => {
            const hiddenElements = document.querySelectorAll('.tech-item:not(.animate-in), .project-card:not(.animate-in), .timeline-item:not(.animate-in)');
            hiddenElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate-in');
                }, index * 50); // Staggered but faster on mobile
            });
        }, 500); // Give observer a chance first, then fallback
    }
    
    // Additional check: ensure project cards are visible on mobile even if observer fails
    setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card');
        const visibleCards = document.querySelectorAll('.project-card.animate-in');
        if (projectCards.length > 0 && visibleCards.length === 0 && isMobileDevice) {
            // Observer didn't trigger, manually show cards
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 100);
            });
        }
    }, 1000);
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


// Active navigation link highlighting (works with both Lenis and native scroll)
function updateActiveNavLink() {
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
}

// Set up active nav link updates
if (typeof Lenis !== 'undefined' && !isMobileDevice) {
    // Will be set up after Lenis initializes
} else {
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
}

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

// Enhanced scroll effects with platform optimization
function initScrollEffects() {
    // Parallax intensity - reduced on mobile/tablet for better performance
    const parallaxIntensity = isMobileDevice ? 0.1 : (isTablet ? 0.15 : 0.2);
    const titleParallaxIntensity = isMobileDevice ? 10 : (isTablet ? 15 : 20);
    
    // Reduce effects on iOS for better performance
    const shouldReduceEffects = isIOS || isMobileDevice;
    
    function updateScrollEffects() {
        const scroll = window.pageYOffset || window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scroll / docHeight : 0;
        
        // Update scroll progress bar
        progressBar.style.width = (progress * 100) + '%';
        
        // Parallax for hero content (reduced on mobile)
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scroll < window.innerHeight) {
            const heroProgress = scroll / window.innerHeight;
            heroContent.style.transform = `translateY(${scroll * parallaxIntensity}px)`;
            heroContent.style.opacity = Math.max(0.5, 1 - heroProgress * 0.3);
        }
        
        // Subtle parallax for section titles (reduced on mobile/tablet)
        if (!shouldReduceEffects) { // Only on desktop for better mobile performance
            document.querySelectorAll('.section-title').forEach((title) => {
                const rect = title.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const titleProgress = (windowHeight - rect.top) / windowHeight;
                    const offset = Math.sin(titleProgress * Math.PI) * titleParallaxIntensity;
                    title.style.transform = `translateY(${offset}px)`;
                }
            });
        }
    }
    
    if (lenis && !isMobileDevice) {
        // Use Lenis scroll event on desktop - this is the correct way
        lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
            // Update scroll progress bar using Lenis progress
            progressBar.style.width = (progress * 100) + '%';
            
            // Parallax for hero content using Lenis scroll value
            const heroContent = document.querySelector('.hero-content');
            if (heroContent && scroll < window.innerHeight) {
                const heroProgress = scroll / window.innerHeight;
                heroContent.style.transform = `translateY(${scroll * parallaxIntensity}px)`;
                heroContent.style.opacity = Math.max(0.5, 1 - heroProgress * 0.3);
            }
            
            // Subtle parallax for section titles (desktop only)
            if (!shouldReduceEffects) {
                document.querySelectorAll('.section-title').forEach((title) => {
                    const rect = title.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    if (rect.top < windowHeight && rect.bottom > 0) {
                        const titleProgress = (windowHeight - rect.top) / windowHeight;
                        const offset = Math.sin(titleProgress * Math.PI) * titleParallaxIntensity;
                        title.style.transform = `translateY(${offset}px)`;
                    }
                });
            }
        });
    } else {
        // Use native scroll event on mobile (optimized for performance)
        let ticking = false;
        let lastScrollTop = 0;
        
        const mobileScrollHandler = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Only update if scroll position actually changed (reduces work)
                    const currentScroll = window.pageYOffset || window.scrollY || 0;
                    if (Math.abs(currentScroll - lastScrollTop) > 1) {
                        updateScrollEffects();
                        lastScrollTop = currentScroll;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', mobileScrollHandler, { passive: true });
        
        // Initial call
        updateScrollEffects();
    }
}

// Initialize scroll effects after page is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initScrollEffects, 100);
});


