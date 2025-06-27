/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));


/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== DARK/LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'fa-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun';

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});


/*=============== SCROLL REVEAL ANIMATION ===============*/
AOS.init({
    duration: 1000,
    once: true,
    offset: 50,
});


/*=============== ANIMATED HEADLINE ===============*/
const animatedHeadline = document.getElementById('animated-headline');
const headlines = ['Data Scientist', 'Business Intelligence Analyst', 'Machine Learning Enthusiast'];
let currentHeadline = 0;
let letterIndex = 0;
let currentText = '';
let isDeleting = false;

function type() {
    const fullText = headlines[currentHeadline];
    if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
    } else {
        currentText = full-text.substring(0, currentText.length + 1);
    }

    animatedHeadline.textContent = currentText;
    let typeSpeed = 150;

    if (isDeleting) {
        typeSpeed /= 2;
    }

    if (!isDeleting && currentText === fullText) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentHeadline = (currentHeadline + 1) % headlines.length;
        typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', function() {
    if(animatedHeadline) {
        setTimeout(type, 250);
    }
});


/*=============== TESTIMONIALS CAROUSEL ===============*/
const testimonials = document.querySelectorAll('.testimonial__card');
const nextBtn = document.querySelector('.testimonial__button.next');
const prevBtn = document.querySelector('.testimonial__button.prev');
let testimonialIndex = 0;

function showTestimonial(index) {
    testimonials.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        showTestimonial(testimonialIndex);
    });

    prevBtn.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(testimonialIndex);
    });

    showTestimonial(testimonialIndex);
}

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 400) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);


/*=============== FOOTER YEAR ===============*/
document.getElementById('current-year').textContent = new Date().getFullYear();