let slideIndex = 4;
let intervalId;

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
    
}

function startSlideShow() {
    stopSlideShow();
    showSlides();
    intervalId = setInterval(showSlides, 3000);

    
}

function stopSlideShow() {
    clearInterval(intervalId);
    intervalId = null;
}


function mostrarProductos() {
    const productContainer = document.getElementById('product-container');

    // Realizar una solicitud AJAX para obtener los datos del archivo JSON
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../productsPage/readData.php', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const products = data.data;

            // Ordenar los productos por valoración (de mayor a menor)
            products.sort((a, b) => parseFloat(b.valoraciones) - parseFloat(a.valoraciones));

            // Tomar los 5 mejores productos
            const top5Products = products.slice(0,5);
            top5Products.sort((a, b) => parseFloat(b.valoraciones) - parseFloat(a.valoraciones));

            
            // Iterar sobre los productos y crear elementos HTML para cada uno
            top5Products.forEach(function (product) {
                const productDiv = document.createElement('div');
                productDiv.className = 'slide';

                const img = document.createElement('img');
                img.className = 'visualize-img';
                img.src = '../productsPage/Asserts/productsImages/' + product.image;
                img.alt = product.name;

                const caption = document.createElement('div');
                caption.className = 'caption';
                caption.innerHTML = 'Nombre: ' +product.name + '<br> Valoración: ' +product.valoraciones+'&#9733;';

                img.addEventListener("mouseenter", function () {
                const scale = 1.5;
                img.addEventListener("mousemove", function (event) {
                    const rect = img.getBoundingClientRect();
                    const x = (event.clientX - rect.left) / rect.width;
                    const y = (event.clientY - rect.top) / rect.height;

                    img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
                    img.style.transform = `scale(${scale})`;
                });
                });
                    img.addEventListener("mouseleave", function () {
                    img.style.transform = "scale(1)";
                    img.removeEventListener("mousemove", null);
                });
                productDiv.appendChild(img);
                productDiv.appendChild(caption);

                productContainer.appendChild(productDiv);
            });
            startSlideShow();
        } else {
            console.error('Error al cargar los productos');
        }
    };

    xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
    const visualizeImages = document.querySelectorAll(".visualize-img");

    visualizeImages.forEach(function (image) {
        image.addEventListener("mouseenter", function () {
            const scale = 1.5;
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

    mostrarProductos(); // Llamar a la función para cargar los productos al cargar la página
});
