// Info page loaded
console.log("Info page loaded");

// Info page scroll reveal
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.info-card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        observer.observe(card);
    });
});
