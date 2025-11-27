// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// --- Theme ---
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}
function initThemeToggle() {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.style.transform = 'scale(0)';
        setTimeout(() => {
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
            icon.style.transform = 'scale(1)';
        }, 150);
    });
}

// --- Mobile Menu ---
function initMobileMenu() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            navMenu.querySelectorAll('.nav-link').forEach((item, i) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, i * 100);
            });
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// --- Smooth Scroll & Active Link ---
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });
}
function initActiveSection() {
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 200) current = section.getAttribute('id');
        });
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href').substring(1) === current));
    });
}

// --- Contact Form ---
function initContactForm() {
    if (!contactForm) return;
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        fetch('YOUR_REAL_ENDPOINT_HERE', { method: 'POST', body: formData })
            .then(res => {
                if (!res.ok) throw new Error('Failed');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.background = '#10b981';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
                }, 1500);
            })
            .catch(() => {
                alert('Failed to send message. Try again later.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

// --- Scroll Progress Bar ---
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
        const percent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = percent + '%';
    });
}

// --- Navbar Scroll ---
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastY && window.scrollY > 100) navbar.classList.add('hidden');
        else navbar.classList.remove('hidden');
        lastY = window.scrollY;
        navbar.style.background = window.scrollY > 50 ? 'var(--bg-color)' : 'var(--bg-color)';
        navbar.style.boxShadow = window.scrollY > 50 ? 'var(--shadow)' : 'none';
    });
}

// --- Profile Image ---
function initProfileImage() {
    const img = document.querySelector('.profile-image');
    const placeholder = document.querySelector('.image-placeholder');
    if (!img) return;
    img.addEventListener('load', () => placeholder && (placeholder.style.display = 'none'));
    img.addEventListener('error', () => {
        img.style.display = 'none';
        placeholder && (placeholder.style.display = 'flex');
    });
    if (!img.src || img.src === window.location.href) {
        img.style.display = 'none';
        placeholder && (placeholder.style.display = 'flex');
    }
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('stagger-parent')) {
                    entry.target.querySelectorAll('.stagger-item').forEach((child, i) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, i * 100);
                    });
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in, .stagger-parent').forEach(el => observer.observe(el));
}

// --- Add Animation Classes ---
function initAnimationClasses() {
    document.querySelector('.hero-content')?.classList.add('fade-left');
    document.querySelector('.hero-image')?.classList.add('fade-right');
    document.querySelector('.about-content')?.classList.add('fade-up');
    document.querySelector('.skills-grid')?.classList.add('stagger-parent');
    document.querySelectorAll('.skill-card').forEach(card => card.classList.add('stagger-item'));
    document.querySelector('.projects-grid')?.classList.add('stagger-parent');
    document.querySelectorAll('.project-card').forEach(card => card.classList.add('stagger-item'));
    document.querySelector('.contact-content')?.classList.add('fade-up');
}

// --- Hover Effects ---
function initHoverEffects() {
    document.querySelectorAll('.btn, .skill-card, .project-card, .tech-item, .social-link')
        .forEach(el => {
            el.addEventListener('mouseenter', () => el.style.transform = 'translateY(-2px)');
            el.addEventListener('mouseleave', () => el.style.transform = 'translateY(0)');
        });
}

// --- Ripple Effect ---
document.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
    ripple.className = 'ripple';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
.ripple { position:absolute; border-radius:50%; background:rgba(255,255,255,0.6); transform:scale(0); animation:ripple-animation 0.6s linear; }
@keyframes ripple-animation { to { transform:scale(4); opacity:0; } }
`;
document.head.appendChild(rippleStyle);

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initActiveSection();
    initContactForm();
    initScrollProgress();
    initNavbarScroll();
    initProfileImage();
    initAnimationClasses();
    initScrollAnimations();
    initHoverEffects();
});
