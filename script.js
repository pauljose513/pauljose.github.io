// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update navigation links based on current section
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('nav a');

function updateNavigation() {
    let scrollPosition = window.scrollY;
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });

    if (currentSection === 'home') {
        navLinks.forEach(link => {
            link.classList.add('hidden'); // Apply hidden class for smoother transition
        });
    } else {
        navLinks.forEach(link => {
            link.classList.remove('hidden');
        });

        navLinks.forEach(link => {
            const linkTarget = link.getAttribute('href').substring(1);
            if (linkTarget === currentSection) {
                link.classList.add('hidden');
            } else {
                link.classList.remove('hidden');
            }
        });
    }
}

// Debounced scroll handler for better performance
let isScrolling;
document.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(updateNavigation, 100); // Adjust debounce delay as needed
});

// Initial call to update navigation
updateNavigation();
