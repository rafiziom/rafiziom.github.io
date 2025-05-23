document.addEventListener('DOMContentLoaded', function() {
    // Animacja ładowania
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100);
    });

    // Efekt hover na projekty
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            project.style.transform = 'scale(1.02)';
            project.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.2)';
        });
        project.addEventListener('mouseleave', () => {
            project.style.transform = 'scale(1)';
            project.style.boxShadow = 'none';
        });
    });
});