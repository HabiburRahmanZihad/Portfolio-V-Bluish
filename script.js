// Enhanced JavaScript for Portfolio Website
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const navLinksMobile = document.querySelectorAll('.nav-link-mobile');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navOverlay = document.getElementById('navOverlay');
    const heroSubtitle = document.getElementById('rotating-profession');
    const body = document.body;

    // Professions for typewriter effect
    const professions = [
        'Full-Stack Developer',
        'Frontend Engineer',
        'Backend Developer',
        'UI/UX Enthusiast',
        'Problem Solver',
        'Tech Innovator'
    ];

    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeWriter() {
        if (!heroSubtitle) return;

        const currentProfession = professions[professionIndex];

        if (isDeleting) {
            heroSubtitle.innerHTML = "I'm a " + currentProfession.substring(0, charIndex - 1) + '<span class="cursor-blink text-accent">|</span>';
            charIndex--;
            typingSpeed = 75;
        } else {
            heroSubtitle.innerHTML = "I'm a " + currentProfession.substring(0, charIndex + 1) + '<span class="cursor-blink text-accent">|</span>';
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentProfession.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Mobile Menu Toggle
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }

    hamburger?.addEventListener('click', toggleMobileMenu);
    navOverlay?.addEventListener('click', closeMobileMenu);

    // Smooth Scroll Navigation for Desktop
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = header?.offsetHeight || 80;
                    const offsetTop = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active', 'bg-gradient-to-r', 'from-accent', 'to-accent-dark', 'text-primary', 'font-semibold'));
                    this.classList.add('active', 'bg-gradient-to-r', 'from-accent', 'to-accent-dark', 'text-primary', 'font-semibold');
                }
            }
        });
    });

    // Smooth Scroll Navigation for Mobile
    navLinksMobile.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    closeMobileMenu();

                    setTimeout(() => {
                        const headerHeight = header?.offsetHeight || 80;
                        const offsetTop = targetElement.offsetTop - headerHeight;

                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }, 300);

                    // Update active state for mobile
                    navLinksMobile.forEach(l => {
                        l.classList.remove('active', 'border-accent', 'bg-accent/5');
                        l.classList.add('border-transparent');
                    });
                    this.classList.add('active', 'border-accent', 'bg-accent/5');
                    this.classList.remove('border-transparent');
                }
            }
        });
    });

    // Scroll-based Active Navigation
    function updateActiveNavFromScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        let activeSection = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section;
            }
        });

        if (activeSection) {
            const id = '#' + activeSection.getAttribute('id');

            // Update desktop nav
            navLinks.forEach(l => {
                l.classList.remove('active', 'bg-gradient-to-r', 'from-accent', 'to-accent-dark', 'text-primary', 'font-semibold');
                if (l.getAttribute('href') === id) {
                    l.classList.add('active', 'bg-gradient-to-r', 'from-accent', 'to-accent-dark', 'text-primary', 'font-semibold');
                }
            });

            // Update mobile nav
            navLinksMobile.forEach(l => {
                l.classList.remove('active', 'border-accent', 'bg-accent/5');
                l.classList.add('border-transparent');
                if (l.getAttribute('href') === id) {
                    l.classList.add('active', 'border-accent', 'bg-accent/5');
                    l.classList.remove('border-transparent');
                }
            });
        }
    }

    // Throttled scroll listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavFromScroll, 50);
    });

    // Scroll-based Header Effects
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('py-2', 'bg-primary/95', 'shadow-[0_20px_40px_rgba(0,0,0,0.3)]');
            header.classList.remove('py-3', 'md:py-4');
        } else {
            header.classList.remove('py-2', 'bg-primary/95', 'shadow-[0_20px_40px_rgba(0,0,0,0.3)]');
            header.classList.add('py-3', 'md:py-4');
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1024) {
            closeMobileMenu();
        }
    });

    // Prevent body scroll when mobile menu is open
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            console.log('Form submitted:', data);
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });

        // Floating labels
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function () {
                const label = this.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.classList.add('-top-2', 'left-2', 'text-xs', 'text-accent', 'bg-secondary', 'px-2');
                    label.classList.remove('top-3', 'md:top-4', 'left-3', 'md:left-4');
                }
            });

            input.addEventListener('blur', function () {
                if (!this.value) {
                    const label = this.nextElementSibling;
                    if (label && label.tagName === 'LABEL') {
                        label.classList.remove('-top-2', 'left-2', 'text-xs', 'text-accent', 'bg-secondary', 'px-2');
                        label.classList.add('top-3', 'md:top-4', 'left-3', 'md:left-4');
                    }
                }
            });
        });
    }

    // Initialize typewriter
    if (heroSubtitle) {
        typeWriter();
    }

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    // Enhanced stat counter animation
    const statNumbers = document.querySelectorAll('.stat-pulse span:first-child');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });

        observer.observe(stat.closest('.stat-pulse'));
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert('Thank you for subscribing! We will keep you updated.');
            this.reset();
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });

    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    console.log('Portfolio website with enhanced animations initialized! 🎨✨');
});