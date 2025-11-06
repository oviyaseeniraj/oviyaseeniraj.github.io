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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = 'var(--shadow-md)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
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

// Observe all sections for animation
document.querySelectorAll('.about-card, .skill-category, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--ocean-blue)';
        }
    });
});

// Add subtle parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Add stagger animation to timeline items on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// Prevent animation replay on timeline items after initial load
setTimeout(() => {
    timelineItems.forEach(item => {
        item.style.animation = 'none';
    });
}, 3000);

// Marquee horizontal scroll functionality - only for tech marquee
const techMarquee = document.querySelector('.tech-marquee .marquee');

if (techMarquee) {
    const marqueeContent = techMarquee.querySelector('.marquee-content');
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let animationPaused = false;

    // Mouse wheel horizontal scroll
    techMarquee.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            techMarquee.scrollLeft += e.deltaX;
        } else {
            e.preventDefault();
            techMarquee.scrollLeft += e.deltaY;
        }
        
        // Pause animation when scrolling
        if (!animationPaused) {
            marqueeContent.style.animationPlayState = 'paused';
            animationPaused = true;
        }
        
        // Resume after scrolling stops
        clearTimeout(techMarquee.resumeTimer);
        techMarquee.resumeTimer = setTimeout(() => {
            marqueeContent.style.animationPlayState = 'running';
            animationPaused = false;
        }, 1500);
    }, { passive: false });

    // Drag to scroll functionality
    techMarquee.addEventListener('mousedown', (e) => {
        isDown = true;
        techMarquee.style.cursor = 'grabbing';
        startX = e.pageX - techMarquee.offsetLeft;
        scrollLeft = techMarquee.scrollLeft;
        velocity = 0;
        marqueeContent.style.animationPlayState = 'paused';
    });

    techMarquee.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            techMarquee.style.cursor = 'grab';
            setTimeout(() => {
                marqueeContent.style.animationPlayState = 'running';
            }, 500);
        }
    });

    techMarquee.addEventListener('mouseup', () => {
        isDown = false;
        techMarquee.style.cursor = 'grab';
        setTimeout(() => {
            marqueeContent.style.animationPlayState = 'running';
        }, 500);
    });

    techMarquee.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - techMarquee.offsetLeft;
        const walk = (x - startX) * 2;
        techMarquee.scrollLeft = scrollLeft - walk;
        velocity = walk;
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;

    techMarquee.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = techMarquee.scrollLeft;
        marqueeContent.style.animationPlayState = 'paused';
    });

    techMarquee.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].pageX;
        const walk = (touchStartX - touchX) * 2;
        techMarquee.scrollLeft = touchScrollLeft + walk;
    });

    techMarquee.addEventListener('touchend', () => {
        setTimeout(() => {
            marqueeContent.style.animationPlayState = 'running';
        }, 500);
    });

    // Make tech marquee scrollable
    techMarquee.style.overflowX = 'auto';
    techMarquee.style.cursor = 'grab';
    techMarquee.style.userSelect = 'none';
}

