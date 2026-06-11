// Criar partículas flutuantes
function createParticles() {
    const container = document.getElementById('particles-js');
    if (!container) return;
    
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 35 + 10;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        const duration = Math.random() * 20 + 12;
        particle.style.animation = `floatParticle ${duration}s infinite alternate ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        container.appendChild(particle);
    }
}

// Animação scroll fade-up
function initScrollAnimations() {
    const fades = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    fades.forEach(el => observer.observe(el));
}

// Navegação suave para links internos
function initSmoothScroll() {
    document.querySelectorAll('.nav-links a, .btn-primary, .btn-outline').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// Efeito de contagem animada para os números das estatísticas
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.innerText;
                const isPercentage = finalValue.includes('%');
                const isNegative = finalValue.includes('-');
                const cleanValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
                
                if (!isNaN(cleanValue)) {
                    let current = 0;
                    const duration = 1500;
                    const stepTime = 20;
                    const steps = duration / stepTime;
                    const increment = cleanValue / steps;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= cleanValue) {
                            current = cleanValue;
                            clearInterval(timer);
                        }
                        let displayValue = Math.floor(current);
                        let formattedValue = isNegative ? `-${displayValue}%` : 
                                           isPercentage ? `${displayValue}%` : 
                                           `${displayValue}`;
                        element.innerText = formattedValue;
                    }, stepTime);
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(num => observer.observe(num));
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initScrollAnimations();
    initSmoothScroll();
    animateStats();
});
