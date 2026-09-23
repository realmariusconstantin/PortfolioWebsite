document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('navigationBar');
    const burger = document.querySelector('.burger-menu');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.navigation a');

    // Sticky Navbar on Scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Mobile Menu Toggle
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navigation.classList.toggle('active');
        document.body.style.overflow = navigation.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navigation.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});
    }
    
    // Clean up desktop elements on mobile
    function cleanupDesktopElements() {
        if (window.innerWidth <= 768) {
            const persistentLogo = document.querySelector('#persistent-logo');
            const hoverArea = document.querySelector('#navbar-hover-area');
            
            if (persistentLogo) persistentLogo.remove();
            if (hoverArea) hoverArea.remove();
            
            // Reset navbar position
            navigationBar.style.transform = 'translateY(0)';
            isNavbarHidden = false;
        }
    }
    
    // Initialize desktop features
    createPersistentLogo();
    createHoverArea();
    
    // Scroll event listener with hover area update
    window.addEventListener('scroll', function() {
        handleDesktopNavbar();
        // Update hover area pointer events based on navbar visibility
        if (window.innerWidth > 768) {
            const hoverArea = document.querySelector('#navbar-hover-area');
            if (hoverArea) {
                if (isNavbarHidden) {
                    hoverArea.style.pointerEvents = 'auto';
                } else {
                    hoverArea.style.pointerEvents = 'none';
                }
            }
        }
    });
    
    if (burgerMenu && navigation) {
        // Toggle mobile menu when burger is clicked
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            navigation.classList.toggle('active');
        });

        // Close menu when clicking on a navigation link
        const navLinks = document.querySelectorAll('.navigation a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                navigation.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navigation.contains(e.target) && !burgerMenu.contains(e.target)) {
                burgerMenu.classList.remove('active');
                navigation.classList.remove('active');
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                burgerMenu.classList.remove('active');
                navigation.classList.remove('active');
                createPersistentLogo();
                createHoverArea();
            } else {
                cleanupDesktopElements();
            }
        });
    }
});

// Smooth scroll for navigation links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});