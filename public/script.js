document.addEventListener('DOMContentLoaded', () => {
    
    // --- FEATURE 1: LIGHT/DARK THEME LOGIC ---
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    });

    // --- FEATURE 2: SCROLL TRIGGERS (INTERSECTION OBSERVER) ---
    const revealTargets = document.querySelectorAll('.scroll-reveal');
    
    const observerOptions = {
        root: null,
        threshold: 0.15 // Section reveals when 15% is visible
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Runs once per load animation
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);
    revealTargets.forEach(target => observer.observe(target));

    // --- FEATURE 3: DYNAMIC PROJECT FILTER LOGIC ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active style state from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    // Retrigger quick animation entry
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- CONTACT FORM API HANDLER ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            const data = await response.json();
            if (data.success) {
                formStatus.style.color = 'green';
                formStatus.textContent = data.reply;
                contactForm.reset();
            }
        } catch (error) {
            formStatus.style.color = 'red';
            formStatus.textContent = 'Server connectivity error.';
        }
    });
});
