// Splash Screen fade out
window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    setTimeout(() => {
        splash.classList.add('fade-out');
    }, 1500);
});

// Typing effect
const typingText = "Build your web quote fast!";
let i = 0;
let typingSpeed = 100;

function typeWriter() {
    if (i < typingText.length) {
        document.getElementById("typing").innerHTML += typingText.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 2000); // after splash
});

// Back to top button
window.addEventListener('scroll', () => {
    const btn = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
});

document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
