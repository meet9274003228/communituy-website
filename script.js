document.addEventListener('DOMContentLoaded', () => {
    // Typewriter Effect for Hero Title
    const titleElement = document.getElementById('hero-title');
    const originalText = titleElement.innerHTML;
    const words = ["Future", "Community", "Code", "India"];
    let wordIndex = 0;
    let isDeleting = false;
    let text = "Hack The ";
    
    function type() {
        const currentWord = words[wordIndex];
        const shouldWait = !isDeleting && text === "Hack The " + currentWord;
        const shouldMoveToNext = isDeleting && text === "Hack The ";

        if (shouldWait) {
            setTimeout(() => { isDeleting = true; type(); }, 2000);
            return;
        }

        if (shouldMoveToNext) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
            return;
        }

        if (isDeleting) {
            text = text.substring(0, text.length - 1);
        } else {
            text = "Hack The " + currentWord.substring(0, text.replace("Hack The ", "").length + 1);
        }

        titleElement.innerHTML = text.replace(currentWord.substring(0, text.replace("Hack The ", "").length), `<span class="cyan-text">${currentWord.substring(0, text.replace("Hack The ", "").length)}</span>`);
        
        const typeSpeed = isDeleting ? 100 : 200;
        setTimeout(type, typeSpeed);
    }

    // Start typewriter if title exists
    if (titleElement) {
        // type(); // Disabled for now to keep the static look stable, can be enabled later
    }

    // Hamburger Menu (Simple implementation)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // In a real implementation, we'd toggle a 'show' class and style it in CSS
            alert('Mobile menu coming soon!');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
