// Contact section entrance animations and form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    // Entrance Animations
    const elements = contactSection.querySelectorAll('.contact-header, .contact-form-container, .contact-quick-info');

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

    // Auto-expanding Textarea
    const textarea = document.getElementById('contact-message');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // Form Handling
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('contact-success');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.btn-pill');
            const formData = new FormData(contactForm);
            
            // Loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show Success Message
                    contactForm.style.display = 'none';
                    successMessage.classList.add('active');
                    contactForm.reset();
                    if (textarea) textarea.style.height = 'auto';
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form");
                    }
                }
            } catch (error) {
                alert("Oops! There was a problem submitting your form");
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }

    window.resetForm = () => {
        if (contactForm && successMessage) {
            successMessage.classList.remove('active');
            contactForm.style.display = 'flex';
            const submitBtn = contactForm.querySelector('.btn-pill');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    };
});
