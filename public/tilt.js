(function() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Discover cursor coordinates relative directly to card bounding space offsets
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;

            // Normalize coordinate system positions center-wards to find exact deflection
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation degrees based on distance from object center values
            //             const rotateX = ((centerY - y) / centerY) * 15; // Max 15 degrees tilt tilt            const rotateX = ((centerY - y) / centerY) * 15; // Max 15 degrees tilt til            const rotateX = ((centerY - y) / centerY) * 15; // Max 15 degrees tilt tilt
            const rotateY = ((x - centerX) / centerX) * 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = "transform 0.5s ease";
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = "none";
        });
    });
})();
