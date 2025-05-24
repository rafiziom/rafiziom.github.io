// Nowe animacje
function animateElements() {
    // Animacja nagłówka
    gsap.from("header", { 
      duration: 1, 
      y: -50, 
      opacity: 0,
      ease: "power3.out"
    });
  
    // Sekwencyjne pojawianie się sekcji
    gsap.from(".section", {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".main-content",
        start: "top 80%"
      }
    });
  
    // Animacja pasków umiejętności
    gsap.from(".progress-bar", {
      width: 0,
      duration: 2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".skills-box"
      }
    });
  }
  
  // Inicjalizacja GSAP
  document.addEventListener('DOMContentLoaded', function() {
    // Dodaj GSAP z CDN jeśli nie ma
    if (typeof gsap === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
      script.onload = animateElements;
      document.head.appendChild(script);
      
      const scrollScript = document.createElement('script');
      scrollScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js';
      document.head.appendChild(scrollScript);
    } else {
      animateElements();
    }
  });

document.addEventListener('DOMContentLoaded', function() {
  // Animacje timeline
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(item => {
    observer.observe(item);
  });

  // Filtrowanie umiejętności
  const skillFilters = document.querySelectorAll('.skill-filter');
  
  skillFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      const category = this.dataset.category;
      filterSkills(category);
    });
  });
});

function filterSkills(category) {
  const categories = document.querySelectorAll('.skill-category');
  
  categories.forEach(cat => {
    if (category === 'all' || cat.dataset.category === category) {
      cat.style.display = 'block';
    } else {
      cat.style.display = 'none';
    }
  });
}