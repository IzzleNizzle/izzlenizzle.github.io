// Simple vanilla JavaScript for navigation and basic interactions

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile menu toggle
  const sidenavTrigger = document.querySelector('.sidenav-trigger');
  const sidenav = document.querySelector('.sidenav');
  
  if (sidenavTrigger && sidenav) {
    sidenavTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      sidenav.classList.toggle('active');
    });
    
    // Close sidenav when clicking outside
    document.addEventListener('click', function(e) {
      if (!sidenav.contains(e.target) && !sidenavTrigger.contains(e.target)) {
        sidenav.classList.remove('active');
      }
    });
    
    // Close sidenav when clicking a link
    const sidenavLinks = sidenav.querySelectorAll('a');
    sidenavLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        sidenav.classList.remove('active');
      });
    });
  }
  
  // Simple parallax effect
  const parallaxElements = document.querySelectorAll('.parallax img');
  
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', function() {
      parallaxElements.forEach(function(img) {
        const container = img.closest('.parallax-container');
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          img.style.transform = 'translate(-50%, ' + (rate - 50) + '%)';
        }
      });
    });
  }
  
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
});
