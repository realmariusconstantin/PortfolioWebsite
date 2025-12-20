// Home section entrance animations
document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    const elements = [
        homeSection.querySelector('.home-subtitle'),
        homeSection.querySelector('.home-title'),
        homeSection.querySelector('.home-description'),
        homeSection.querySelector('.home-cta')
    ];

    elements.forEach((el, index) => {
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.15}s`;
        
        // Trigger animation
        requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
});