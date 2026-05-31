document.addEventListener('DOMContentLoaded', function() {
    initPremiumSmoothScroll();
    initNavbar();
    initMobileMenu();
    initBackToTop();
    initTiltEffect();
    initScrollProgress();
    initMagneticButtons();
    initNavLinkHover();
    initSectionSnap();
});

const SmoothScroll = {
    isScrolling: false,
    startTime: null,
    startPosition: 0,
    targetPosition: 0,
    duration: 1200,
    easingFunction: function(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },
    
    start: function(targetPosition) {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        this.startTime = performance.now();
        this.startPosition = window.pageYOffset;
        this.targetPosition = targetPosition;
        
        this.animate();
    },
    
    animate: function() {
        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        const easedProgress = this.easingFunction(progress);
        
        const currentPosition = this.startPosition + (this.targetPosition - this.startPosition) * easedProgress;
        window.scrollTo(0, currentPosition);
        
        if (progress < 1) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.isScrolling = false;
            updateActiveNavLink();
        }
    }
};

function initPremiumSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                triggerSectionTransition(targetElement);
                SmoothScroll.start(Math.max(0, targetPosition));
            }
        });
    });
}

function triggerSectionTransition(targetSection) {
    const allSections = document.querySelectorAll('section');
    
    allSections.forEach(section => {
        if (section !== targetSection) {
            section.classList.add('section-exit');
            setTimeout(() => {
                section.classList.remove('section-exit');
            }, 400);
        }
    });
    
    targetSection.classList.add('section-enter');
    setTimeout(() => {
        targetSection.classList.remove('section-enter');
    }, 600);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
        updateActiveNavLink();
    }, { passive: true });
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        SmoothScroll.start(0);
    });
}



function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }

    function resetTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
}

function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    if (!progressBar) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.pageYOffset / windowHeight) * 100;
                progressBar.style.width = scrolled + '%';
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic-element');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const strength = 0.3;
            element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });
}

function initNavLinkHover() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            link.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translate(0, 0)';
        });
    });
}

function initSectionSnap() {
    const sections = document.querySelectorAll('section');
    let isSnapping = false;

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isSnapping && !SmoothScroll.isScrolling) {
                const targetId = entry.target.getAttribute('id');
                if (targetId) {
                    const targetElement = document.querySelector(`#${targetId}`);
                    if (targetElement) {
                        const navbar = document.getElementById('navbar');
                        const navbarHeight = navbar ? navbar.offsetHeight : 0;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                        
                        isSnapping = true;
                        SmoothScroll.start(Math.round(targetPosition));
                        setTimeout(() => { isSnapping = false; }, SmoothScroll.duration + 200);
                    }
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}


