document.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;

    // Adjust font size of h1 in section1 based on scroll position
    let h1 = document.querySelector('.section1 h1');
    let initialFontSize = 5; // Initial font size in vw

    // Calculate new font size
    let newSize = initialFontSize - (scrollPosition * 0.005); // Adjust the factor as needed

    // Ensure font size doesn't go below a minimum size
    let minSize = 3; // Minimum font size in vw
    newSize = Math.max(newSize, minSize);

    // Apply the new font size
    h1.style.fontSize = newSize + 'vw';
});
