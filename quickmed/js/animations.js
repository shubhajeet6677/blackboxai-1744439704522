// Handle page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Add page transition class to body
    document.body.classList.add('page-transition');

    // Add animation classes to elements
    const textElements = document.querySelectorAll('.animate-text');
    textElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });

    // Add card animations
    const cards = document.querySelectorAll('.card-enter');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add luxury card effects
    const luxuryCards = document.querySelectorAll('.luxury-card');
    luxuryCards.forEach(card => {
        card.addEventListener('mousemove', handleCardHover);
        card.addEventListener('mouseleave', resetCardTransform);
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.ripple');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Initialize full screen transitions
    initializeFullScreenTransitions();
});

// Handle luxury card hover effect
function handleCardHover(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const angleX = (y - centerY) / 10;
    const angleY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
}

// Reset card transform
function resetCardTransform(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
}

// Create ripple effect
function createRipple(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const circle = document.createElement('div');
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('ripple-effect');

    const ripple = button.getElementsByClassName('ripple-effect')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Initialize full screen transitions
function initializeFullScreenTransitions() {
    const links = document.querySelectorAll('a[href]:not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', e => {
            if (link.href.startsWith(window.location.origin)) {
                e.preventDefault();
                
                const transition = document.createElement('div');
                transition.classList.add('full-screen-transition');
                document.body.appendChild(transition);

                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        });
    });
}

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(element => {
    observer.observe(element);
});
