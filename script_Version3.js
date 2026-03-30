/* ============================================
   THEME TOGGLE FUNCTIONALITY
   ============================================ */
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    htmlElement.classList.add('dark-mode');
}

// Listen for toggle changes
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark-mode');
        const newTheme = htmlElement.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
    });

    // Keyboard shortcut: Alt + D untuk toggle dark mode
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 'd') {
            themeToggle.click();
        }
    });
}

// ============================================
// NAVBAR HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================
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

// ============================================
// NAVBAR ACTIVE LINK STATE
// ============================================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
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

// ============================================
// SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.project-card, .stat-card, .skill-category, .contact-item, .timeline-content, .testimonial-card'
);

animateElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.animationDelay = `${index * 0.05}s`;
    observer.observe(element);
});

// ============================================
// FORM VALIDATION
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const projectType = document.getElementById('projectType');
        const message = document.getElementById('message');
        
        // Reset errors
        resetErrors();
        
        // Validate fields
        let isValid = true;
        
        // Name validation
        if (!name.value.trim()) {
            showError('name', 'Name is required');
            isValid = false;
        } else if (name.value.trim().length < 3) {
            showError('name', 'Name must be at least 3 characters');
            isValid = false;
        }
        
        // Email validation
        if (!email.value.trim()) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        }
        
        // Subject validation
        if (!subject.value.trim()) {
            showError('subject', 'Subject is required');
            isValid = false;
        } else if (subject.value.trim().length < 5) {
            showError('subject', 'Subject must be at least 5 characters');
            isValid = false;
        }
        
        // Project type validation
        if (!projectType.value) {
            showError('projectType', 'Please select a project type');
            isValid = false;
        }
        
        // Message validation
        if (!message.value.trim()) {
            showError('message', 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If valid, show success message
        if (isValid) {
            showSuccessMessage();
            contactForm.reset();
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}Error`);
    
    if (field && errorElement) {
        field.parentElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function resetErrors() {
    document.querySelectorAll('.form-error').forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
    `;
    successDiv.textContent = '✓ Message sent successfully! Thank you for contacting me.';
    
    document.body.appendChild(successDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

// ============================================
// PROJECTS FILTER
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
            backToTop.style.animation = 'fadeInUp 0.3s ease-out';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.animation = 'fadeOut 0.6s ease-out forwards';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 600);
        }, 1200);
    }
});

// ============================================
// HERO CANVAS ANIMATION
// ============================================
const heroCanvas = document.getElementById('heroCanvas');

if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    
    function resizeCanvas() {
        heroCanvas.width = heroCanvas.offsetWidth;
        heroCanvas.height = heroCanvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particles for canvas animation
    const particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * heroCanvas.width;
            this.y = Math.random() * heroCanvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0) this.x = heroCanvas.width;
            if (this.x > heroCanvas.width) this.x = 0;
            if (this.y < 0) this.y = heroCanvas.height;
            if (this.y > heroCanvas.height) this.y = 0;
        }
        
        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============================================
// SKILL BARS ANIMATION
// ============================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `progressLoad ${1.5 + Math.random()}s ease-out forwards`;
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ============================================
// STAT CARDS COUNTER ANIMATION
// ============================================
const statCards = document.querySelectorAll('.stat-card');

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('stat-animated');
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.3 });

statCards.forEach(card => {
    countObserver.observe(card);
});

// ============================================
// PREVENT ZOOM ON DOUBLE CLICK
// ============================================
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ============================================
// SMOOTH LOADING ANIMATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Disable theme transition on initial load
    const htmlElement = document.documentElement;
    htmlElement.style.transition = 'none';
    
    setTimeout(() => {
        htmlElement.style.transition = '';
    }, 100);
});

// ============================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    // Tab navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('click', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// MOBILE MENU CLOSE ON ORIENTATION CHANGE
// ============================================
window.addEventListener('orientationchange', () => {
    if (hamburger) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// ADD ANIMATIONS KEYFRAMES VIA JS
// ============================================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes progressLoad {
        from {
            width: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// ============================================
// PERFORMANCE: LAZY LOAD IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('%c Portfolio Loaded Successfully! 🚀', 'font-size: 20px; color: #6366f1; font-weight: bold;');