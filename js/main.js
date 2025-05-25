document.addEventListener('DOMContentLoaded', function() {
  // ========== FIRST VISIT ANIMATIONS ==========
  const isFirstVisit = !localStorage.getItem('visited');
  
  if (isFirstVisit) {
    localStorage.setItem('visited', 'true');
    
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
      section.style.transform = 'translateY(50px)';
      section.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
      
      setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, 100 + index * 200);
    });

    // 3. Timeline Item Sequential Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-50px)';
      item.style.transition = `opacity 0.6s ease ${index * 0.3}s, transform 0.6s ease ${index * 0.3}s`;
      
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, 500 + index * 300);
    });

    // 4. Skill Bars Loading Animation
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.style.width = '0';
      
      setTimeout(() => {
        bar.style.width = targetWidth;
        bar.style.transition = 'width 1.5s ease-out';
      }, 1500);
    });

    // 5. Subtle Particle Background (only on first visit)
    const createSubtleParticles = () => {
      const canvas = document.createElement('canvas');
      canvas.id = 'particle-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.zIndex = '-1';
      canvas.style.opacity = '0.1';
      canvas.style.transition = 'opacity 2s';
      document.body.prepend(canvas);

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const particleCount = window.innerWidth < 768 ? 20 : 50;

      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 1;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 - 0.5;
          this.color = 'rgba(100, 149, 237, 0.5)';
          this.alpha = 0;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          this.alpha = Math.min(1, this.alpha + 0.01);

          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color.replace('0.5', this.alpha);
          ctx.fill();
        }
      }

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });

        requestAnimationFrame(animateParticles);
      }

      animateParticles();

      // Fade out after 10 seconds
      setTimeout(() => {
        canvas.style.opacity = '0';
        setTimeout(() => {
          canvas.remove();
        }, 2000);
      }, 10000);

      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    };

    createSubtleParticles();
  }

  // ========== PERMANENT INTERACTIVE ELEMENTS ==========
  
  // 1. Interactive Timeline Hover Effects
  const timelineItems = document.querySelectorAll('.timeline-content');
  timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      item.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.boxShadow = '';
      item.style.transform = '';
    });
  });

  // 2. Skill Category Hover Effects
  const skillCategories = document.querySelectorAll('.skill-category');
  skillCategories.forEach(category => {
    category.addEventListener('mouseenter', () => {
      category.style.borderLeft = `4px solid var(--primary)`;
    });
    
    category.addEventListener('mouseleave', () => {
      category.style.borderLeft = '';
    });
  });

  // 3. Smooth Scroll to Sections
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

  // 4. Print Button
  const printButton = document.createElement('button');
  printButton.className = 'print-button';
  printButton.innerHTML = '<i class="fas fa-print"></i> Print CV';
  printButton.addEventListener('click', () => window.print());
  document.body.appendChild(printButton);

  // 5. Scroll to Top Button
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

  // ========== DYNAMIC STYLES ==========
  const dynamicStyles = document.createElement('style');
  dynamicStyles.textContent = `
    /* First Visit Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
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
    
    /* Skill Category Hover */
    .skill-category {
      transition: all 0.3s ease;
      border-left: 4px solid transparent;
    }
  `;
  document.head.appendChild(dynamicStyles);
});