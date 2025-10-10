// ===== Progress Bar =====
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

// ===== Navigation =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Active Navigation Link =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Typing Effect =====
const texts = [
    'Analyste Statisticien',
    'Data Scientist',
    'Machine Learning Engineer',
    'Data Analyst',
    'Python Developer'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const typingText = document.getElementById('typing-text');
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

setTimeout(typeText, 1000);

// ===== Scroll Animations (AOS) =====
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
            element.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== Skills Animation =====
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const isVisible = barTop < window.innerHeight - 100;
        
        if (isVisible && bar.style.width === '0px' || bar.style.width === '') {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        }
    });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ===== Smooth Scroll =====
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

// ===== Contact Form =====
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!name || !email || !subject || !message) {
        formStatus.style.display = 'block';
        formStatus.className = 'error';
        formStatus.innerHTML = `
            <i class="fas fa-exclamation-circle"></i> 
            Veuillez remplir tous les champs du formulaire.
        `;
        return;
    }
    
    formStatus.style.display = 'block';
    formStatus.className = 'success';
    formStatus.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i> 
        Envoi en cours...
    `;
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            formStatus.className = 'success';
            formStatus.innerHTML = `
                <i class="fas fa-check-circle"></i> 
                ${result.message}
            `;
            
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        } else {
            throw new Error(result.message || 'Erreur lors de l\'envoi');
        }
    } catch (error) {
        formStatus.className = 'error';
        formStatus.innerHTML = `
            <i class="fas fa-exclamation-circle"></i> 
            ${error.message || 'Erreur lors de l\'envoi du message. Veuillez réessayer.'}
        `;
    }
});

// ===== Particles Animation =====
function createParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        heroParticles.appendChild(particle);
    }
}

const floatKeyframes = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(20px, -30px) scale(1.2);
            opacity: 0.6;
        }
        50% {
            transform: translate(-20px, -60px) scale(0.8);
            opacity: 0.4;
        }
        75% {
            transform: translate(30px, -30px) scale(1.1);
            opacity: 0.5;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = floatKeyframes;
document.head.appendChild(styleSheet);

createParticles();

// ===== Project Card Click Effect =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const projectTitle = this.querySelector('h3').textContent;
        console.log(`Project clicked: ${projectTitle}`);
        
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});


// ===== Intersection Observer for Advanced Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===== Easter Egg: Console Message =====
console.log('%c👋 Bonjour!', 'font-size: 24px; color: #00d4ff; font-weight: bold;');
console.log('%cVous êtes curieux, c\'est une bonne qualité pour un développeur!', 'font-size: 14px; color: #8892b0;');
console.log('%cSi vous souhaitez collaborer, contactez-moi: fred.njomani@ensea.edu.ci', 'font-size: 14px; color: #00d4ff;');

// ===== Performance Optimization: Lazy Loading =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Add Loading Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.add('visible');
        }
    }, 100);
});

// ===== Dynamic Year for Footer =====
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-content p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
}
