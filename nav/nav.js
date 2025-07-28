// Burger Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navigation = document.querySelector('.navigation');
    const navigationBar = document.querySelector('#navigationBar');
    
    // Desktop navbar scroll behavior
    let lastScrollTop = 0;
    let isNavbarHidden = false;
    
    function handleDesktopNavbar() {
        if (window.innerWidth > 768) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Hide navbar when scrolling down
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                if (!isNavbarHidden) {
                    navigationBar.style.transform = 'translateY(-100%)';
                    isNavbarHidden = true;
                }
            }
            // Show navbar when scrolling up
            else if (scrollTop < lastScrollTop) {
                if (isNavbarHidden) {
                    navigationBar.style.transform = 'translateY(0)';
                    isNavbarHidden = false;
                }
            }
            
            lastScrollTop = scrollTop;
        }
    }
    
    // Create persistent logo for desktop
    function createPersistentLogo() {
        if (window.innerWidth > 768) {
            let persistentLogo = document.querySelector('#persistent-logo');
            
            if (!persistentLogo) {
                persistentLogo = document.createElement('div');
                persistentLogo.id = 'persistent-logo';
                persistentLogo.innerHTML = '<a href="#home"><h1 id="persistent-logo-text">M.</h1></a>';
                persistentLogo.style.cssText = `
                    position: fixed;
                    top: 1rem;
                    left: 2rem;
                    z-index: 1002;
                    transition: all 0.3s ease;
                `;
                document.body.appendChild(persistentLogo);
            }
        }
    }
    
    // Hover area at top of screen to show navbar
    function createHoverArea() {
        if (window.innerWidth > 768) {
            let hoverArea = document.querySelector('#navbar-hover-area');
            
            if (!hoverArea) {
                hoverArea = document.createElement('div');
                hoverArea.id = 'navbar-hover-area';
                hoverArea.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 80px;
                    z-index: 998;
                    pointer-events: none;
                `;
                document.body.appendChild(hoverArea);
                
                // Show navbar on hover - use pointer-events: auto only for this event
                hoverArea.addEventListener('mouseenter', function() {
                    if (isNavbarHidden) {
                        navigationBar.style.transform = 'translateY(0)';
                    }
                });
                
                // Hide navbar when leaving hover area (only if scrolled down)
                hoverArea.addEventListener('mouseleave', function() {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrollTop > 100) {
                        setTimeout(() => {
                            if (!navigationBar.matches(':hover')) {
                                navigationBar.style.transform = 'translateY(-100%)';
                            }
                        }, 500);
                    }
                });
            }
            
            // Enable pointer events only when navbar is hidden
            if (isNavbarHidden) {
                hoverArea.style.pointerEvents = 'auto';
            } else {
                hoverArea.style.pointerEvents = 'none';
            }
        }
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