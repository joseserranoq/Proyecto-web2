let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    
    slideIndex++;
    
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].style.display = 'flex';
    
    setTimeout(showSlides, 3000);
}

showSlides();

document.addEventListener("DOMContentLoaded", function () {
    const visualizeImages = document.querySelectorAll(".visualize-img");

    visualizeImages.forEach(function (image) {
        image.addEventListener("mouseenter", function () {
            const scale = 2; 
            image.addEventListener("mousemove", function (event) {
                const rect = image.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;

                image.style.transformOrigin = `${x * 100}% ${y * 100}%`;
                image.style.transform = `scale(${scale})`;
            });
        });
        image.addEventListener("mouseleave", function () {
            image.style.transform = "scale(1)";
            image.removeEventListener("mousemove", null);
        });
    });
});
