document.addEventListener('DOMContentLoaded', function() {
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
        
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                // Delay to allow the scroll to the section to happen
                setTimeout(updateNavigation, 10);
            });
        });
        // Adjust font size of h1 in section1 based on scroll position
        let scrollPosition = window.scrollY;
        let h1 = document.querySelector('.section1 h1');
        let initialFontSize = 5; // Initial font size in vw

        let computedStyle = window.getComputedStyle(h1);
    
        // Get initial color from computed style
        let initialFontColor = computedStyle.color;

        // Calculate new font size
        let newSize = initialFontSize - (scrollPosition * 0.01); // Adjust the factor as needed

        // Ensure font size doesn't go below a minimum size
        let minSize = 2.5; // Minimum font size in vw
        newSize = Math.max(newSize, minSize);

       // Calculate new opacity based on scroll position
        let newOpacity = 1 - (scrollPosition * 0.002); // Adjust the factor as needed
        newOpacity = Math.max(0, Math.min(1, newOpacity)); // Ensure opacity stays within 0 to 1 range
        // Update opacity in rgba format to maintain original color
        let colorArray = initialFontColor.match(/\d+/g); // Extract RGB values
        let newFontColor = `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${newOpacity})`;

        // Apply the new font size
        if (h1) {
            h1.style.fontSize = newSize + 'vw';
            h1.style.color = newFontColor;
        }
    });

    // Initial call to update navigation and trigger animations
    updateNavigation();

    // Slider functionality
    const slider = document.getElementById('year-slider');
    const currentValue = document.getElementById('current-value');
    const customValues = ['March 2016', 'August 2016', 'March 2018', 'August 2018', 'September 2021', 'October 2021', 'May 2022', 'August 2022', 'November 2022', 'November 2023', 'March 2024'];

    // Function to update content based on selected year
    function updateContent(year) {
        const selectedYearElement = document.getElementById('selected-year');
        if (selectedYearElement) {
            selectedYearElement.textContent = year;
        }

        document.querySelectorAll('.study-details .study-year').forEach(element => {
            element.style.display = 'none';
        });
        const yearElement = document.querySelector(`.study-details .study-year[data-year="${year}"]`);
        if (yearElement) {
            yearElement.style.display = 'block';
        }
    }

    // Update the current value display
    function updateSliderValue() {
        if (slider) {
            currentValue.textContent = customValues[slider.value];
            const valuePosition = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
            currentValue.style.left = `calc(${valuePosition}% - 10px)`; // Adjust for thumb size
        }
    }

    if (slider) {
        // Initial content update based on slider value
        updateContent(slider.value);
        updateSliderValue();

        // Slider change event
        slider.addEventListener('input', function() {
            var selectedYear = this.value;
            updateContent(selectedYear);
            updateSliderValue();

            const HidenSections = document.getElementsByClassName('hiddenSection');
            const section3 = document.getElementById('section3');
            if (section3.style.display === 'none') {
                Array.from(HidenSections).forEach((link, index) => {
                    const target = link.style.display = 'none';
                    section3.style.display = 'block';
                });
            }
        });
    } else {
        console.error("Slider element not found.");
    }


    const toggleLinks = Array.from(document.getElementsByClassName('toggle-link'));
    const section3 = document.getElementById('section3');
    const hiddenSections = Array.from(document.getElementsByClassName('hiddenSection'));

    function findHiddenSection() {
        return hiddenSections.find(section => section.style.display === 'none');
    }

    toggleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const targetId = link.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (targetSection.style.display === 'none' || targetSection.style.display === '') {
                hiddenSections.forEach(section => section.style.display = 'none');
                section3.style.display = 'none';
                targetSection.style.display = 'block'; 
                
            } else {
                targetSection.style.display = 'none'; 
                section3.style.display = 'block';
            }
        });
    });
});
