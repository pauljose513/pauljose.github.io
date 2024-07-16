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

// Function to check if an element is in viewport
function isInViewport(elem) {
    let bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Update navigation links based on current section
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('nav a');

function updateNavigation() {
    let scrollPosition = window.scrollY;
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - window.innerHeight / 2; // Adjust calculation
        const sectionBottom = sectionTop + section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.id;
        }
    });

    if (currentSection === 'home') {
        navLinks.forEach(link => {
            link.style.display = 'none'; // Hide navigation links on the home page
        });
    } else {
        navLinks.forEach(link => {
            link.style.display = 'block'; // Display navigation links from the second page onwards
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

// Scroll handler for better performance and immediate update
document.addEventListener('scroll', function() {
    updateNavigation(); // Immediate update

    // Trigger animations for sections in viewport
    sections.forEach(section => {
        if (isInViewport(section)) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    // Adjust font size of h1 in section1 based on scroll position
    let scrollPosition = window.scrollY;
    let h1 = document.querySelector('.section1 h1');
    let initialFontSize = 5; // Initial font size in vw

    // Calculate new font size
    let newSize = initialFontSize - (scrollPosition * 0.02); // Adjust the factor as needed

    // Ensure font size doesn't go below a minimum size
    let minSize = 3; // Minimum font size in vw
    newSize = Math.max(newSize, minSize);

    // Apply the new font size
    h1.style.fontSize = newSize + 'vw';
});

// Initial call to update navigation and trigger animations
updateNavigation();
