/* Site interactions: back-to-top, scrollspy, and helpful utilities */
(function(){
    document.addEventListener('DOMContentLoaded', () => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /* --- Back to top button --- */
        const backToTop = document.createElement('button');
        backToTop.id = 'back-to-top';
        backToTop.title = 'Back to top';
        backToTop.innerHTML = '↑';
        backToTop.style.cssText = `
            position: fixed;
            right: 18px;
            bottom: 18px;
            width: 44px;
            height: 44px;
            border-radius: 999px;
            border: none;
            background: rgba(255,255,255,0.06);
            color: white;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            z-index: 2000;
            backdrop-filter: blur(6px);
        `;
        document.body.appendChild(backToTop);

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) backToTop.style.display = 'flex';
            else backToTop.style.display = 'none';
        }, { passive: true });

        /* --- Scrollspy (highlight active nav link) --- */
        const sections = Array.from(document.querySelectorAll('.page'));
        const navLinks = Array.from(document.querySelectorAll('.navigation a'));

        if (sections.length && navLinks.length) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        navLinks.forEach(a => {
                            if (a.getAttribute('href') === '#' + id) a.classList.add('active');
                            else a.classList.remove('active');
                        });
                    }
                });
            }, { threshold: 0.45 });

            sections.forEach(s => observer.observe(s));
        }

        /* --- Close mobile nav when clicking outside (extra safety) --- */
        document.addEventListener('click', (e) => {
            const nav = document.querySelector('.navigation');
            const burger = document.querySelector('.burger-menu');
            if (!nav || !burger) return;

            if (!nav.contains(e.target) && !burger.contains(e.target)) {
                nav.classList.remove('active');
                burger.classList.remove('active');
            }
        });

        /* --- Simple keyboard shortcut: press 'g' then 's' to go to Skills (dev shortcut) --- */
        let keyBuffer = '';
        window.addEventListener('keydown', (e) => {
            keyBuffer += e.key.toLowerCase();
            if (keyBuffer.endsWith('gs')) {
                const el = document.querySelector('#skills');
                if (el) el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
            }
            // cap buffer
            if (keyBuffer.length > 10) keyBuffer = keyBuffer.slice(-10);
        });
    });
})();
