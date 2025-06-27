document.addEventListener('DOMContentLoaded', () => {

    // --- STICKY NAVBAR ON SCROLL ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- DARK/LIGHT MODE TOGGLE ---
    const themeSwitch = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeSwitch.checked = true;
        }
    }

    themeSwitch.addEventListener('change', function (event) {
        if (event.target.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', '');
        }
    });

    // --- MOBILE HAMBURGER MENU ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- ACTIVE NAV LINK ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const words = [
        "Machine Learning Engineer",
        "Data Scientist",
        "Business Analyst"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let typing = true;
    const typedText = document.getElementById("typed-text");
    const cursor = document.getElementById("cursor");

    function type() {
        if (!typedText || !cursor) return;
        if (typing) {
            if (charIndex < words[wordIndex].length) {
                typedText.textContent += words[wordIndex][charIndex];
                charIndex++;
                setTimeout(type, 100);
            } else {
                typing = false;
                setTimeout(type, 1500);
            }
        } else {
            if (charIndex > 0) {
                typedText.textContent = words[wordIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, 50);
            } else {
                typing = true;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            }
        }
    }

    setInterval(() => {
        if (cursor) cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
    }, 500);

    type();
});

// --- ANIMATED SKILLS BAR ON SCROLL ---
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item-animated');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                item.classList.add('visible'); // Membuat item muncul (fade-in)

                const progressBar = item.querySelector('.skill-progress-bar');
                const percentageSpan = item.querySelector('.skill-percentage');
                const goal = parseInt(percentageSpan.getAttribute('data-goal'));

                // Menganimasikan progress bar
                setTimeout(() => {
                    progressBar.style.width = goal + '%';
                }, 200); // Sedikit delay agar terlihat setelah fade-in

                // Menganimasikan angka persentase
                let current = 0;
                const increment = goal / 100; // Untuk kecepatan animasi yg konsisten
                const interval = setInterval(() => {
                    current += increment;
                    if (current >= goal) {
                        current = goal;
                        clearInterval(interval);
                    }
                    percentageSpan.textContent = Math.floor(current) + '%';
                }, 20); // Kecepatan update angka

                observer.unobserve(item); // Hentikan observasi setelah animasi berjalan
            }
        });
    }, {
        threshold: 0.5 // Memicu animasi saat 50% elemen terlihat
    });

    skillItems.forEach(item => {
        observer.observe(item);
    });
});