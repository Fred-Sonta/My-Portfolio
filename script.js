document.addEventListener('DOMContentLoaded', () => {

    // ===== Preloader =====
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 300); // Small delay to ensure everything is loaded
    });

    // ===== Progress Bar =====
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // ===== Sticky & Mobile Navigation =====
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // "scrolled" effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger Menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===== Active Navigation Link =====
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) { // 150px offset
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
    const typingTextEl = document.getElementById('typing-text');
    if (typingTextEl) {
        // Translated to English
        const texts = [
            'Statistical Analyst',
            'Data Science',
            'Machine Learning',
            'Deep Learning',
            'Data Analyst',
            'Python Developer',
            
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeText() {
            const currentText = texts[textIndex];
            let typeSpeed = 100;

            if (isDeleting) {
                typingTextEl.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingTextEl.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at the end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before new word
            }
            
            setTimeout(typeText, typeSpeed);
        }
        setTimeout(typeText, 1000); // Initial delay
    }

    // ===== Animations (AOS) =====
    // Initialize AOS library
    AOS.init({
        duration: 800,  // Animation duration
        once: true,     // Animation happens only once
        offset: 100,    // Offset before triggering
        easing: 'ease-in-out-cubic',
    });

    // ===== Skill Bar Animation =====
    // Use Intersection Observer for better performance
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
                observer.unobserve(bar); // Animate only once
            }
        });
    }, { threshold: 0.5 }); // Trigger at 50% visibility

    document.querySelectorAll('.skill-progress').forEach(bar => {
        skillObserver.observe(bar);
    });

    // ===== Project Filters =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Manage active class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Hide first for animation
                card.classList.add('hide');

                setTimeout(() => {
                    if (filter === 'all' || filter === category) {
                        card.classList.remove('hide');
                        card.classList.add('show');
                    } else {
                        card.classList.remove('show');
                    }
                }, 300); // Must match CSS transition
            });
        });
    });


    // ===== Theme Toggle (Light/Dark Mode) =====
    const themeToggle = document.getElementById('theme-toggle');
    const docElement = document.documentElement;
    
    // Function to apply the theme
    function setTheme(theme) {
        docElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Check saved theme on load, default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Handle button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = docElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });


    // ===== Custom Cursor JavaScript Removed =====


    // ===== Contact Form =====
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Simple validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                formStatus.style.display = 'block';
                formStatus.className = 'error';
                // Translated message
                formStatus.innerHTML = `<i class="fas fa-exclamation-circle"></i> Please fill in all fields.`;
                return;
            }
            
            formStatus.style.display = 'block';
            formStatus.className = 'success'; // Use 'success' for spinner style
            // Translated message
            formStatus.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    formStatus.className = 'success';
                    formStatus.innerHTML = `<i class="fas fa-check-circle"></i> ${result.message}`;
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Error sending message');
                }
            } catch (error) {
                formStatus.className = 'error';
                // Translated message
                formStatus.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error.message || 'Error. Please try again.'}`;
            }
        });
    }

    // ===== Dynamic Footer Year =====
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // ===== Console Easter Egg (Translated) =====
    console.log('%c👋 Hello!', 'font-size: 24px; color: #64FFDA; font-family: "Orbitron", sans-serif; font-weight: bold;');
    console.log('%cCurious? That\'s a great quality for a developer!', 'font-size: 14px; color: #94A3B8; font-family: "Inter", sans-serif;');
    console.log('%cIf you\'d like to collaborate, reach out: fred.njomani@ensea.edu.ci', 'font-size: 14px; color: #38BDF8;');

});

