document.addEventListener('DOMContentLoaded', function() {
  // ========== GLOBAL FUNCTIONS ==========
  const debounce = (func, wait = 100) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  };

  // ========== HEADER ANIMATION ==========
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', debounce(() => {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
        return;
      }
      
      if (currentScroll > lastScroll) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
      }
      lastScroll = currentScroll;
    }, 16));
  }

  // ========== TIMELINE ANIMATION ==========
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timeline = document.querySelector('.timeline');
  
  if (timelineItems.length > 0) {
    const animateTimeline = () => {
      timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.75) {
          item.classList.add('animate');
          item.style.animationDelay = `${index * 0.1}s`;
        }
      });
    };

    // Initial check
    animateTimeline();
    
    // Check on scroll
    window.addEventListener('scroll', debounce(animateTimeline, 16));
  }

  // ========== SKILLS FILTER ==========
  const skillFilters = document.querySelectorAll('.skill-filter');
  const skillCategories = document.querySelectorAll('.skill-category');
  
  if (skillFilters.length > 0 && skillCategories.length > 0) {
    skillFilters.forEach(filter => {
      filter.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active filter
        skillFilters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.dataset.category;
        
        // Filter skills
        skillCategories.forEach(cat => {
          if (category === 'all' || cat.dataset.category === category) {
            cat.style.display = 'block';
            setTimeout(() => {
              cat.style.opacity = 1;
              cat.style.transform = 'translateY(0)';
            }, 10);
          } else {
            cat.style.opacity = 0;
            cat.style.transform = 'translateY(20px)';
            setTimeout(() => {
              cat.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ========== INTERACTIVE SKILL CHART ==========
  const skillsChart = document.querySelector('.skills-chart');
  if (skillsChart) {
    const skillsData = [
      { name: 'Windows Server', level: 90, category: 'systems' },
      { name: 'Linux', level: 80, category: 'systems' },
      { name: 'Azure', level: 75, category: 'cloud' },
      { name: 'GCP', level: 65, category: 'cloud' },
      { name: 'PowerShell', level: 85, category: 'automation' },
      { name: 'Docker', level: 70, category: 'devops' },
      { name: 'Kubernetes', level: 60, category: 'devops' },
      { name: 'Terraform', level: 65, category: 'devops' },
      { name: 'Nagios', level: 75, category: 'monitoring' },
      { name: 'Grafana', level: 80, category: 'monitoring' }
    ];

    const renderSkillsChart = () => {
      skillsChart.innerHTML = '';
      
      skillsData.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-bar';
        skillElement.dataset.category = skill.category;
        
        skillElement.innerHTML = `
          <div class="skill-info">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-percent">${skill.level}%</span>
          </div>
          <div class="skill-progress">
            <div class="skill-level" style="width: ${skill.level}%"></div>
          </div>
        `;
        
        skillsChart.appendChild(skillElement);
      });
    };

    renderSkillsChart();
  }

  // ========== PRINT BUTTON ==========
  const printButton = document.createElement('button');
  printButton.className = 'print-button';
  printButton.innerHTML = '<i class="fas fa-print"></i> Print CV';
  printButton.addEventListener('click', () => window.print());
  
  document.body.appendChild(printButton);

  // ========== SCROLL TO TOP BUTTON ==========
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

  window.addEventListener('scroll', debounce(() => {
    if (window.pageYOffset > 300) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  }));

  // ========== INTEREST HOVER EFFECTS ==========
  const interestItems = document.querySelectorAll('.interest-item');
  interestItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const icon = this.querySelector('i');
      icon.style.transform = 'rotate(15deg) scale(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
      const icon = this.querySelector('i');
      icon.style.transform = 'rotate(0) scale(1)';
    });
  });

  // ========== REFERENCE MODALS ==========
  const referenceItems = document.querySelectorAll('.reference-item');
  referenceItems.forEach(item => {
    item.addEventListener('click', function() {
      const name = this.querySelector('h4').textContent;
      const position = this.querySelector('p').textContent;
      const email = this.querySelector('a').textContent;
      
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h3>${name}</h3>
          <p>${position}</p>
          <a href="mailto:${email}">${email}</a>
          <div class="modal-actions">
            <a href="mailto:${email}" class="modal-button">
              <i class="fas fa-envelope"></i> Send Email
            </a>
            <button class="modal-button copy-email" data-email="${email}">
              <i class="fas fa-copy"></i> Copy Email
            </button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Close modal
      modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
      });
      
      // Copy email
      modal.querySelector('.copy-email').addEventListener('click', function() {
        navigator.clipboard.writeText(this.dataset.email).then(() => {
          const originalText = this.innerHTML;
          this.innerHTML = '<i class="fas fa-check"></i> Copied!';
          setTimeout(() => {
            this.innerHTML = originalText;
          }, 2000);
        });
      });
      
      // Close when clicking outside
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
    });
  });

  // ========== SECTION SCROLL SPY ==========
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (navLinks.length > 0) {
    window.addEventListener('scroll', debounce(() => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }, 16));
  }

  // ========== THEME TOGGLE ==========
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.title = 'Toggle Dark Mode';
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Check for saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  document.body.appendChild(themeToggle);
});

// ========== ADDITIONAL STYLES DYNAMICALLY ==========
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
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
  
  /* Modal Styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    position: relative;
  }
  
  .close-modal {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .modal-button {
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  /* Theme Toggle */
  .theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: var(--light-gray);
    color: var(--dark);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  
  .theme-toggle:hover {
    transform: rotate(30deg) scale(1.1);
  }
  
  /* Dark Theme */
  .dark-theme {
    background-color: #121212;
    color: #e0e0e0;
  }
  
  .dark-theme .card {
    background-color: #1e1e1e;
    color: #e0e0e0;
  }
  
  .dark-theme .skill-category,
  .dark-theme .reference-item,
  .dark-theme .interest-item {
    background-color: #2d2d2d;
  }
  
  .dark-theme .timeline-content li::before {
    color: var(--secondary);
  }
`;

document.head.appendChild(dynamicStyles);