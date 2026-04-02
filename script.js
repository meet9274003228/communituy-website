document.addEventListener('DOMContentLoaded', () => {

    // ========== PARTICLE CANVAS ==========
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.5,
                dx: (Math.random() - 0.5) * 0.4,
                dy: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.1,
            };
        }

        for (let i = 0; i < 80; i++) particles.push(createParticle());

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 242, 255, ${p.alpha})`;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });
            // Draw connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 242, 255, ${0.05 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }

    // ========== TYPEWRITER EFFECT ==========
    const wordEl = document.getElementById('typewriter-word');
    if (wordEl) {
        const words = ['Future', 'Code', 'India', 'Change'];
        let wordIdx = 0, charIdx = 0, deleting = false;

        function typeLoop() {
            const current = words[wordIdx];
            if (!deleting) {
                wordEl.textContent = current.slice(0, ++charIdx);
                if (charIdx === current.length) {
                    deleting = true;
                    setTimeout(typeLoop, 2000);
                    return;
                }
            } else {
                wordEl.textContent = current.slice(0, --charIdx);
                if (charIdx === 0) {
                    deleting = false;
                    wordIdx = (wordIdx + 1) % words.length;
                }
            }
            setTimeout(typeLoop, deleting ? 80 : 150);
        }
        typeLoop();
    }

    // ========== SCROLL REVEAL ==========
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));

    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ========== HAMBURGER MENU ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            hamburger.classList.toggle('active');
        });
    }

    // ========== NAV SCROLL EFFECT ==========
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(0,0,0,0.95)';
        } else {
            nav.style.background = 'rgba(0,0,0,0.8)';
        }
    });
});
