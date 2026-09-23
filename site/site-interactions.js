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
            if (!mobileDrawer || !drawerOverlay) return;
            
            if (open) {
                mobileDrawer.classList.add('open');
                drawerOverlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            } else {
                mobileDrawer.classList.remove('open');
                drawerOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        };

        if (drawerToggle) {
            drawerToggle.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent bubbling issues
                const isOpen = mobileDrawer && mobileDrawer.classList.contains('open');
                toggleDrawer(!isOpen);
            });
        }
        
        if (drawerOverlay) {
            drawerOverlay.addEventListener('click', () => toggleDrawer(false));
        }

        // Close drawer on link click (mobile)
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
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
        
        // CSS for Back to Top (Injected here)
        backToTop.style.cssText = `
            position: fixed;
            right: 24px;
            bottom: 24px;
            width: 48px;
            height: 48px;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            background: rgba(10, 10, 15, 0.6);
            color: var(--text-primary);
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            backdrop-filter: blur(12px);
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
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

        // --- Reveal on Scroll ---
        const revealElements = document.querySelectorAll('.page > .container');
        
        // Set initial state for reveal elements
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(el => revealObserver.observe(el));

        // --- Contact Form Handling ---
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = contactForm.querySelector('button[type="submit"]');
                if (!btn) return;
                
                const originalText = btn.innerText;
                
                btn.innerText = 'Sending...';
                btn.disabled = true;
                btn.style.opacity = '0.7';

                // Simulate API call
                setTimeout(() => {
                    btn.innerText = 'Message Sent! ✓';
                    btn.style.background = 'var(--accent-primary)';
                    btn.style.opacity = '1';
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
