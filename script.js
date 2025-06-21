// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ========== Dark Mode Toggle ==========
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const themeIcon = darkModeToggle.querySelector('i');

    // Check for saved user preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply theme based on preferences
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        enableDarkMode();
    }

    // Toggle Dark Mode function
    function enableDarkMode() {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    function disableDarkMode() {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    // Toggle click handler
    darkModeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // ========== Smooth Scrolling Navigation ==========
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip smooth scroll for external links
            if (this.getAttribute('target') === '_blank') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });

    // ========== Active Navigation Highlight ==========
    function setActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('nav').offsetHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 50)) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Run on scroll and initial load
    window.addEventListener('scroll', setActiveNav);
    setActiveNav();

    // ========== Skill Bar Animation ==========
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.5s ease-out';
            }, 100);
        });
    }
    
    // Animate when skills section comes into view
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // ========== Card Hover Effects ==========
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});
