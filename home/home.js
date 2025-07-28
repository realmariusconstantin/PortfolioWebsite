// Page Load Animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Initial state - hide all elements
    const navigationBar = document.querySelector('#navigationBar');
    const persistentLogo = document.querySelector('#logo');
    const subtitle = document.querySelector('#subtitle');
    const nameTitle = document.querySelector('#nameTitle');
    const homeText = document.querySelector('.homeContent p');
    const homeButtons = document.querySelector('.home-buttons');
    
    // Set initial states
    if (navigationBar) {
        navigationBar.style.transform = 'translateY(-100%)';
        navigationBar.style.opacity = '0';
        navigationBar.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    if (persistentLogo) {
        persistentLogo.style.transform = 'translateX(-100px)';
        persistentLogo.style.opacity = '0';
        persistentLogo.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    if (subtitle) {
        subtitle.style.transform = 'translateY(-30px)';
        subtitle.style.opacity = '0';
        subtitle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    if (nameTitle) {
        nameTitle.style.transform = 'translateY(30px)';
        nameTitle.style.opacity = '0';
        nameTitle.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    if (homeText) {
        homeText.style.transform = 'translateY(20px)';
        homeText.style.opacity = '0';
        homeText.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    if (homeButtons) {
        homeButtons.style.transform = 'translateY(40px)';
        homeButtons.style.opacity = '0';
        homeButtons.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    // Animation sequence with delays
    const animationSequence = [
        // 1. Navigation slides down from top
        {
            element: navigationBar,
            delay: 200,
            animation: () => {
                navigationBar.style.transform = 'translateY(0)';
                navigationBar.style.opacity = '1';
            }
        },
        
        // 2. Logo slides in from left
        {
            element: persistentLogo,
            delay: 400,
            animation: () => {
                persistentLogo.style.transform = 'translateX(0)';
                persistentLogo.style.opacity = '1';
            }
        },
        
        // 3. Subtitle appears from top
        {
            element: subtitle,
            delay: 800,
            animation: () => {
                subtitle.style.transform = 'translateY(0)';
                subtitle.style.opacity = '1';
            }
        },
        
        // 4. Main title appears from bottom
        {
            element: nameTitle,
            delay: 1200,
            animation: () => {
                nameTitle.style.transform = 'translateY(0)';
                nameTitle.style.opacity = '1';
            }
        },
        
        // 5. Description text fades in from bottom
        {
            element: homeText,
            delay: 1600,
            animation: () => {
                homeText.style.transform = 'translateY(0)';
                homeText.style.opacity = '1';
            }
        },
        
        // 6. Buttons slide up from bottom
        {
            element: homeButtons,
            delay: 2000,
            animation: () => {
                homeButtons.style.transform = 'translateY(0)';
                homeButtons.style.opacity = '1';
            }
        }
    ];
    
    // Execute animation sequence
    animationSequence.forEach(({ element, delay, animation }) => {
        if (element) {
            setTimeout(animation, delay);
        }
    });
    
    // Add floating animation to elements after they appear
    setTimeout(() => {
        // Add subtle floating animation to subtitle
        if (subtitle) {
            subtitle.style.animation = 'float 6s ease-in-out infinite';
        }
        
        // Add gentle pulse to buttons
        if (homeButtons) {
            const buttons = homeButtons.querySelectorAll('button');
            buttons.forEach((button, index) => {
                button.style.animation = `pulse 4s ease-in-out infinite ${index * 0.5}s`;
            });
        }
    }, 2500);
    
    // Create CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
            50% { box-shadow: 0 0 30px rgba(0, 212, 255, 0.5); }
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
        
        /* Smooth scroll behavior */
        html {
            scroll-behavior: smooth;
        }
        
        /* Enhanced transitions for all interactive elements */
        .navigation a, #logo, #subtitle, button {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
    `;
    document.head.appendChild(style);
    
    // Add scroll-triggered animations for other sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe other page sections for scroll animations
    const sections = document.querySelectorAll('.page');
    sections.forEach(section => {
        section.style.transform = 'translateY(50px)';
        section.style.opacity = '0';
        section.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(section);
    });
});

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectsButton = document.querySelector('#projects-Button');
    const contactButton = document.querySelector('#contact-Button');
    
    if (projectsButton) {
        projectsButton.addEventListener('click', function() {
            // Smooth scroll to projects section
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            // Smooth scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});