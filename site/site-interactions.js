/* Site interactions: Sidebar, Mobile Drawer, Scrollspy, and Utilities */
(function(){
    document.addEventListener('DOMContentLoaded', () => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // --- Navigation Elements ---
        const sidebar = document.getElementById('sidebar');
        const mobileDrawer = document.getElementById('mobile-drawer');
        const drawerOverlay = document.getElementById('drawer-overlay');
        const drawerToggle = document.getElementById('drawer-toggle');
        const drawerClose = document.getElementById('drawer-close');
        const navLinks = document.querySelectorAll('.nav-link');

        // --- Mobile Drawer Logic ---
        const toggleDrawer = (open) => {
            mobileDrawer.classList.toggle('open', open);
            drawerOverlay.classList.toggle('open', open);
            document.body.style.overflow = open ? 'hidden' : '';
        };

        if (drawerToggle) drawerToggle.addEventListener('click', () => toggleDrawer(true));
        if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleDrawer(false));

        // Close drawer on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1024) toggleDrawer(false);
            });
        });

        // --- Scrollspy (highlight active nav link) ---
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -20% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));

        // --- Back to top button ---
        const backToTop = document.createElement('button');
        backToTop.id = 'back-to-top';
        backToTop.title = 'Back to top';
        backToTop.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
        backToTop.style.cssText = `
            position: fixed;
            right: 24px;
            bottom: 24px;
            width: 48px;
            height: 48px;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            background: var(--glass-bg);
            color: var(--text-primary);
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            backdrop-filter: blur(12px);
            transition: all 0.2s ease;
        `;
        document.body.appendChild(backToTop);

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        }, { passive: true });

        // --- Contact Form Validation & Feedback ---
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.innerText;
                
                btn.innerText = 'Sending...';
                btn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    btn.innerText = 'Message Sent!';
                    btn.style.background = '#10b981';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                }, 1500);
            });
        }
    });
})();
                    }
                });

                if (isValid) {
                    const originalText = sendBtn.innerText;
                    sendBtn.innerText = 'Sending...';
                    sendBtn.disabled = true;

                    // Simulate API call
                    setTimeout(() => {
                        sendBtn.innerText = 'Message Sent! ✓';
                        sendBtn.style.background = '#10b981'; // Success green
                        contactForm.reset();

                        setTimeout(() => {
                            sendBtn.innerText = originalText;
                            sendBtn.style.background = '';
                            sendBtn.disabled = false;
                        }, 3000);
                    }, 1500);
                }
            });
        }
    });
})();
                if (isValid) {
                    const originalText = sendBtn.innerText;
                    sendBtn.innerText = 'Message Sent! ✨';
                    sendBtn.style.background = 'var(--accent-neon)';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        sendBtn.innerText = originalText;
                        sendBtn.style.background = 'var(--accent-pink)';
                    }, 3000);
                }
            });
        }
    });
})();
