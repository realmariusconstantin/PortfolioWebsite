// Create floating space particles
function createSpaceParticles() {
    const particleContainer = document.getElementById('space-particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size (1-3px)
        const size = Math.random() * 2 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        particleContainer.appendChild(particle);
    }
}

// Create shooting stars
function createShootingStars() {
    const body = document.body;
    
    setInterval(() => {
        const shootingStar = document.createElement('div');
        shootingStar.style.position = 'fixed';
        shootingStar.style.width = '2px';
        shootingStar.style.height = '2px';
        shootingStar.style.background = '#00d4ff';
        shootingStar.style.borderRadius = '50%';
        shootingStar.style.boxShadow = '0 0 10px #00d4ff, 0 0 20px #00d4ff';
        shootingStar.style.left = Math.random() * 100 + '%';
        shootingStar.style.top = '100vh';
        shootingStar.style.zIndex = '-1';
        shootingStar.style.animation = 'shootingStar 3s linear forwards';
        
        body.appendChild(shootingStar);
        
        // Remove after animation
        setTimeout(() => {
            if (shootingStar.parentNode) {
                shootingStar.parentNode.removeChild(shootingStar);
            }
        }, 3000);
        
    }, Math.random() * 3000 + 2000); // Random interval between 2-5 seconds
}

// Add shooting star animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shootingStar {
        0% { 
            transform: translateY(0) translateX(0) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: scale(1);
        }
        90% {
            opacity: 1;
        }
        100% { 
            transform: translateY(-100vh) translateX(50px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    createSpaceParticles();
    createShootingStars();
});
