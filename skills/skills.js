// Animate skill progress bars when the skills section becomes visible
document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const fillEls = skillsSection.querySelectorAll('.skill-fill');

    const animate = () => {
        fillEls.forEach(el => {
            const pct = parseFloat(el.getAttribute('data-pct')) || 0;
            el.style.width = pct + '%';
            // also update the visible percent labels if present
            const header = el.closest('.skill')?.querySelector('.skill-percent');
            if (header) header.textContent = pct + '%';
        });
    };

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
                obs.disconnect();
            }
        });
    }, { threshold: 0.2 });

    io.observe(skillsSection);
});
