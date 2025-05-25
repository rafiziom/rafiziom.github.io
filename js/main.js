// ========== UNIVERSE-INSPIRED ANIMATIONS ==========
document.addEventListener('DOMContentLoaded', function() {
  // 1. Particle Background Animation (jak w Universe)
  const createParticleBackground = () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 100;

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
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

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
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
            ctx.strokeStyle = `rgba(100, 149, 237, ${1 - distance / 150})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Resize handler
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  };

  // 2. Floating Elements Animation (jak w Universe)
  const addFloatingEffects = () => {
    const floatingElements = document.querySelectorAll('.card, .skill-category, .interest-item');
    
    floatingElements.forEach(el => {
      const floatIntensity = Math.random() * 10 + 5;
      const rotationIntensity = Math.random() * 2 + 1;
      const delay = Math.random() * 2000;
      
      setTimeout(() => {
        el.style.transition = `transform ${floatIntensity}s ease-in-out infinite alternate`;
        
        setInterval(() => {
          const floatY = Math.sin(Date.now() / (floatIntensity * 500)) * 10;
          const floatX = Math.cos(Date.now() / (floatIntensity * 700)) * 5;
          const rotate = Math.sin(Date.now() / (rotationIntensity * 1000)) * 2;
          
          el.style.transform = `translate(${floatX}px, ${floatY}px) rotate(${rotate}deg)`;
        }, 50);
      }, delay);
    });
  };

  // 3. Gradient Wave Animation (nagłówek)
  const animateHeaderGradient = () => {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let hue = 200;
    let direction = 1;
    
    setInterval(() => {
      hue += direction * 0.5;
      
      if (hue > 220) direction = -1;
      if (hue < 180) direction = 1;
      
      header.style.background = `
        linear-gradient(
          135deg,
          hsl(${hue}, 80%, 45%),
          hsl(${hue + 20}, 80%, 55%)
        )
      `;
    }, 50);
  };

  // 4. Interactive Cursor Effect (jak w Universe)
  const addInteractiveCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'universe-cursor';
    document.body.appendChild(cursor);
    
    const follower = document.createElement('div');
    follower.className = 'universe-cursor-follower';
    document.body.appendChild(follower);
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      setTimeout(() => {
        follower.style.left = `${e.clientX}px`;
        follower.style.top = `${e.clientY}px`;
      }, 100);
    });
    
    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .interest-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        follower.style.transform = 'scale(0.5)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
      });
    });
  };

  // 5. Text Scramble Animation (nagłówki sekcji)
  const addTextScramble = () => {
    class TextScramble {
      constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
      }
      
      setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || '';
          const to = newText[i] || '';
          const start = Math.floor(Math.random() * 40);
          const end = start + Math.floor(Math.random() * 40);
          this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      }
      
      update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i];
          
          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.randomChar();
              this.queue[i].char = char;
            }
            output += `<span class="scramble-char">${char}</span>`;
          } else {
            output += from;
          }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
          this.resolve();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      }
      
      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
    }
    
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
      const originalText = heading.innerText;
      const scramble = new TextScramble(heading);
      
      // Scramble on hover
      heading.addEventListener('mouseenter', () => {
        scramble.setText(originalText).then(() => {
          setTimeout(() => scramble.setText(originalText), 2000);
        });
      });
    });
  };

  // 6. Dynamic Background Shapes (jak w Universe)
  const addBackgroundShapes = () => {
    const shapes = ['circle', 'triangle', 'square', 'pentagon'];
    const colors = ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];
    const container = document.createElement('div');
    container.className = 'background-shapes';
    document.body.prepend(container);
    
    for (let i = 0; i < 15; i++) {
      const shape = document.createElement('div');
      shape.className = `shape ${shapes[Math.floor(Math.random() * shapes.length)]}`;
      shape.style.position = 'absolute';
      shape.style.opacity = '0.1';
      shape.style.width = `${Math.random() * 200 + 50}px`;
      shape.style.height = shape.style.width;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.background = colors[Math.floor(Math.random() * colors.length)];
      shape.style.filter = 'blur(10px)';
      shape.style.zIndex = '-1';
      
      // Animation
      shape.style.animation = `float-shape ${Math.random() * 30 + 20}s linear infinite`;
      shape.style.animationDelay = `${Math.random() * 10}s`;
      
      container.appendChild(shape);
    }
  };

  // 7. Glitch Effect on Header (jak w Universe)
  const addGlitchEffect = () => {
    const header = document.querySelector('.header h1');
    if (!header) return;
    
    header.style.position = 'relative';
    
    const glitch = document.createElement('div');
    glitch.className = 'glitch';
    glitch.innerHTML = `
      <span class="glitch-text" style="color: #4facfe">${header.innerText}</span>
      <span class="glitch-text" style="color: #00f2fe">${header.innerText}</span>
      <span class="glitch-text" style="color: #43e97b">${header.innerText}</span>
    `;
    
    header.innerHTML = '';
    header.appendChild(glitch);
    
    setInterval(() => {
      const texts = glitch.querySelectorAll('.glitch-text');
      texts.forEach(text => {
        text.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
        text.style.opacity = Math.random() > 0.7 ? '0' : '1';
      });
    }, 100);
  };

  // 8. Smooth Scroll Anchors
  const addSmoothScroll = () => {
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
  };

  // Initialize animations
  createParticleBackground();
  addFloatingEffects();
  animateHeaderGradient();
  addInteractiveCursor();
  addTextScramble();
  addBackgroundShapes();
  addGlitchEffect();
  addSmoothScroll();

  // Add dynamic styles for new animations
  const animationStyles = document.createElement('style');
  animationStyles.textContent = `
    /* Particle Background */
    #particle-canvas {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      opacity: 0.3;
    }
    
    /* Floating Elements */
    @keyframes float-shape {
      0% {
        transform: translate(0, 0) rotate(0deg);
      }
      25% {
        transform: translate(50px, 50px) rotate(90deg);
      }
      50% {
        transform: translate(100px, 0) rotate(180deg);
      }
      75% {
        transform: translate(50px, -50px) rotate(270deg);
      }
      100% {
        transform: translate(0, 0) rotate(360deg);
      }
    }
    
    /* Universe Cursor */
    .universe-cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: rgba(100, 149, 237, 0.5);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.3s ease;
      mix-blend-mode: difference;
    }
    
    .universe-cursor-follower {
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid rgba(100, 149, 237, 0.3);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: transform 0.6s ease, width 0.3s ease, height 0.3s ease;
    }
    
    /* Glitch Effect */
    .glitch {
      position: relative;
      display: inline-block;
    }
    
    .glitch-text {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all 0.1s ease;
    }
    
    .glitch-text:nth-child(1) {
      z-index: 3;
      clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    }
    
    .glitch-text:nth-child(2) {
      z-index: 2;
      clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
    }
    
    .glitch-text:nth-child(3) {
      z-index: 1;
    }
    
    /* Scramble Animation */
    .scramble-char {
      display: inline-block;
      min-width: 5px;
    }
    
    /* Background Shapes */
    .background-shapes {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: -2;
    }
    
    .shape {
      position: absolute;
      opacity: 0.1;
      z-index: -1;
      filter: blur(10px);
    }
    
    .circle {
      border-radius: 50%;
    }
    
    .triangle {
      width: 0;
      height: 0;
      background: transparent !important;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-bottom: 100px solid;
    }
    
    .pentagon {
      clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
    }
  `;
  document.head.appendChild(animationStyles);
});