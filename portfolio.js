// Navigation bar slides from the top smoothly down
document.addEventListener('DOMContentLoaded', function() {
    const navigation = document.querySelector('.navigation'); // Target only the navigation menu
    
    // Ensure nav starts hidden
    navigation.style.transform = 'translateY(-100%)';
    navigation.style.opacity = '0';
    
    // Trigger slide-in animation after a short delay
    setTimeout(() => {
        navigation.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        navigation.style.transform = 'translateY(0)';
        navigation.style.opacity = '1';
    }, 100);
});

//when scrolling down, hide the navigation bar (but keep logo visible)
window.addEventListener('scroll', function() {
    const navigation = document.querySelector('.navigation'); // Target only the navigation menu
    
    // Hide navigation menu when scrolling down (logo stays visible)
    if (window.scrollY > 50) {
        navigation.style.transform = 'translateY(-100%)';
        navigation.style.opacity = '0';
    } else {
        // Show navigation menu when at the top
        navigation.style.transform = 'translateY(0)';
        navigation.style.opacity = '1';
    }
});

//make nav menu appear when hovering over the top of the page (logo always visible)
document.addEventListener('mousemove', function(event) {
    const navigation = document.querySelector('.navigation'); // Target only the navigation menu
    
    // Check if mouse is near the top of the page
    if (event.clientY < 50) {
        navigation.style.transform = 'translateY(0)';
        navigation.style.opacity = '1';
    } else {
        // Hide navigation menu when not hovering near the top (logo stays visible)
        if (window.scrollY > 50) {
            navigation.style.transform = 'translateY(-100%)';
            navigation.style.opacity = '0';
        }
    }
});

//homeContent slides from left to right. smoothly and slowly.
document.addEventListener('DOMContentLoaded', function() {
    const homeContent = document.querySelector('.homeContent'); // Target only the home content
    
    // Ensure homeContent starts hidden
    homeContent.style.transform = 'translateX(-100%)';
    homeContent.style.opacity = '0';
    
    // Trigger slide-in animation after a short delay
    setTimeout(() => {
        homeContent.style.transition = 'transform 1s ease-out, opacity 0.8s ease-out';
        homeContent.style.transform = 'translateX(0)';
        homeContent.style.opacity = '1';
    }, 100);
});

//make home-buttons slide from the left to right, 1 second after the homeContent slides in
document.addEventListener('DOMContentLoaded', function() {
    const homeButtons = document.querySelector('.home-buttons'); // Target only the home buttons
    
    // Ensure homeButtons starts hidden
    homeButtons.style.transform = 'translateX(-100%)';
    homeButtons.style.opacity = '0';
    
    // Trigger slide-in animation after a short delay
    setTimeout(() => {
        homeButtons.style.transition = 'transform 1s ease-out, opacity 0.8s ease-out';
        homeButtons.style.transform = 'translateX(0)';
        homeButtons.style.opacity = '1';
    }, 2100); // 2 second after homeContent slide
});





//when scrolling down to the aboutContent.

//title slides in first
document.addEventListener('DOMContentLoaded', function() {
    const title = aboutContent.querySelector('#aboutTitle'); // Target the title within aboutContent
    
    // Ensure title starts hidden
    title.style.transform = 'translateX(-100%)';
    title.style.opacity = '0';
    
    // Trigger slide-in animation after a short delay
    setTimeout(() => {
        title.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        title.style.transform = 'translateX(0)';
        title.style.opacity = '1';
    }, 100);
}); 

//aboutme-section slides in 1 by 1.

//personal-details slides in last.