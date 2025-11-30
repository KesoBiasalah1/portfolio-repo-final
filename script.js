// ==================== AUTH CHECK ====================
if (localStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = 'login.html';
}

// Get current user
const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

// ==================== LOGOUT FUNCTIONALITY ====================
document.getElementById('logoutBtn')?.addEventListener('click', function() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  }
});

// ==================== SCROLL REVEAL ANIMATIONS ====================
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Create observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  // Observe all elements with load-hidden class
  const hiddenElements = document.querySelectorAll('.load-hidden');
  hiddenElements.forEach(el => observer.observe(el));

  // Add staggered animation to multiple items
  const aboutBoxes = document.querySelectorAll('.about-box');
  aboutBoxes.forEach((box, index) => {
    box.style.transitionDelay = `${index * 0.2}s`;
  });

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// EMAIL JS 
(function() {
  emailjs.init("jU5_hPnGr0jfa0pBg"); 
})();

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  const statusMessage = document.getElementById('statusMessage');
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  emailjs.sendForm('service_2mvjzi3', 'template_1eib67b', this)
    .then(() => {
      statusMessage.textContent = 'Message sent successfully!';
      statusMessage.style.display = 'block';
      statusMessage.style.backgroundColor = '#4CAF50';
      statusMessage.style.color = 'white';
      this.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      
      setTimeout(() => {
        statusMessage.style.display = 'none';
      }, 3000);
    }, (error) => {
      statusMessage.textContent = 'Failed to send message. Please try again.';
      statusMessage.style.display = 'block';
      statusMessage.style.backgroundColor = '#f44336';
      statusMessage.style.color = 'white';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      console.error('EmailJS error:', error);
    });
});

// ==================== HEADER SCROLL EFFECT ====================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.style.boxShadow = 'none';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
  
  lastScroll = currentScroll;
});