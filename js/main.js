document.addEventListener('DOMContentLoaded', function() {
  // ========== ALWAYS-ACTIVE PARTICLE BACKGROUND ==========
  const createParticleBackground = () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.2';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `hsla(210, 80%, 60%, ${Math.random() * 0.5 + 0.1})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(210, 80%, 60%, ${0.5 - distance/300})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  };

  // ========== ANIMATIONS ON EVERY LOAD ==========
  const runAnimations = () => {
    // 1. Hero Section Typing Animation
    const heroTitle = document.querySelector('.header h1');
    if (heroTitle) {
      const originalText = heroTitle.innerText;
      heroTitle.innerText = '';
      
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < originalText.length) {
          heroTitle.innerText += originalText.charAt(i);
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
    }

    // 2. Section Entrance Animation
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
      
      setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, 50 + index * 150);
    });

    // 3. Timeline Item Sequential Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-30px)';
      item.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
      
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, 300 + index * 200);
    });

    // 4. Skill Bars Loading Animation
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.style.width = '0';
      
      setTimeout(() => {
        bar.style.width = targetWidth;
        bar.style.transition = 'width 1.2s ease-out';
      }, 1000);
    });
  };

  // ========== PERMANENT INTERACTIVE ELEMENTS ==========
  const initInteractiveElements = () => {
    // 1. Interactive Timeline Hover Effects
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        item.style.transform = 'scale(1.02) translateY(-5px)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.boxShadow = '';
        item.style.transform = '';
      });
    });

    // 2. Smooth Scroll to Sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });

    // 3. Print Button
    const printButton = document.createElement('button');
    printButton.className = 'print-button';
    printButton.innerHTML = '<i class="fas fa-print"></i> Print CV';
    printButton.addEventListener('click', () => window.print());
    document.body.appendChild(printButton);

    // 4. Scroll to Top Button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopButton.style.display = 'none';
    
    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    document.body.appendChild(scrollToTopButton);

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopButton.style.display = 'block';
      } else {
        scrollToTopButton.style.display = 'none';
      }
    });
  };

  // ========== DYNAMIC STYLES ==========
  const addDynamicStyles = () => {
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
      /* Particle Background */
      #particle-canvas {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        opacity: 0.2;
      }
      
      /* Print Button */
      .print-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 12px 20px;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 100;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
      }
      
      .print-button:hover {
        background-color: var(--primary-dark);
        transform: translateY(-3px);
        box-shadow: 0 6px 15px rgba(0,0,0,0.3);
      }
      
      /* Scroll to Top */
      .scroll-to-top {
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: var(--secondary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }
      
      .scroll-to-top:hover {
        background-color: var(--primary);
        transform: translateY(-3px);
        box-shadow: 0 6px 15px rgba(0,0,0,0.3);
      }
      
      /* Timeline Hover Effects */
      .timeline-content {
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(dynamicStyles);
  };

  // ========== INITIALIZE EVERYTHING ==========
  createParticleBackground();
  runAnimations();
  initInteractiveElements();
  addDynamicStyles();
});