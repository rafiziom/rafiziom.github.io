document.addEventListener('DOMContentLoaded', function() {
  // ========== PARTICLE BACKGROUND ==========
  const createParticleBackground = () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

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
        this.color = `hsla(215, 80%, 60%, ${Math.random() * 0.3 + 0.1})`;
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
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(215, 80%, 60%, ${0.3 - distance/500})`;
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

  // ========== SCROLL ANIMATIONS ==========
  const animateOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      observer.observe(section);
    });
  };

  // ========== INITIALIZE ==========
  createParticleBackground();
  animateOnScroll();

  // ========== PRINT BUTTON ==========
  const printButton = document.createElement('button');
  printButton.className = 'print-button';
  printButton.innerHTML = '<i class="fas fa-print"></i> Print CV';
  printButton.addEventListener('click', () => window.print());
  document.body.appendChild(printButton);

  // ========== DYNAMIC STYLES ==========
  const dynamicStyles = document.createElement('style');
  dynamicStyles.textContent = `
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
      box-shadow: var(--card-shadow);
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }
    
    .print-button:hover {
      background-color: var(--primary-dark);
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
  `;
  document.head.appendChild(dynamicStyles);
});