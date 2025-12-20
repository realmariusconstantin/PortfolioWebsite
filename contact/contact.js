// Contact section entrance animations and form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    // Entrance Animations
    const elements = contactSection.querySelectorAll('.info-card, .social-container, .contact-form-container');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;
        observer.observe(el);
    });

    // Form Handling
    const contactForm = contactSection.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span><svg class="spinner" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.2"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>';

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success state
            submitBtn.innerHTML = '<span>Message Sent!</span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            submitBtn.style.background = 'var(--accent-secondary)';
            
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
            }, 3000);
        });
    }
});
