let openShopping = document.querySelector('.shopping');
let openPayment = document.querySelector('.buttonPayProcess');
let closeShopping = document.querySelector('.close');
let closePayment = document.querySelector('.close-payment');
let catalogue = document.querySelector('.catalogue');
let conteiner = document.querySelector('.conteiner');
let catalogueCart = document.querySelector('.catalogueCart');
let paymentCart = document.querySelector('.paymentCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let notifications = document.querySelector('.notifications');
let catalogueCarts = [];
let products = [];

function initApp() {
    quantity.style.display = "none";
    var listaJson;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'readData.php', true);
    xhr.onreadystatechange = () => { console.log(xhr.readyState + "ReadyState"); }
    xhr.onload = () => {
        console.log(xhr.status + "status");
        if (xhr.status == 200) {
            listaJson = JSON.parse(xhr.responseText);
            //products = listaJson;            
            listaJson.data.forEach((product, key) => {
                products = [...products, product];
                createProductElement(product, key);
            });
        }
    }
    
    xhr.send();
    console.log("se ejecuta la funcion initApp" + products)
}

//initApp();
openPayment.addEventListener('click', () => {
    if (catalogueCarts.length === 0) {
        alert("No tienes productos en el carrito. Agrega productos antes de pagar.");
    } else {
        body.classList.add('pay-active');
    }
});


openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closePayment.addEventListener('click', () => {
    //catalogueCarts = [];
    body.classList.remove('pay-active');
    body.classList.remove('active');
    reloadCart()
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

function createProductElement(product, key) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
        <img src="Asserts/productsImages/${product.image}">
        <div class="title">${product.name}</div>
        <div class="price">$${product.price.toLocaleString()}</div>
        <div class="newprice">$${product.newPrice.toLocaleString()}</div>
        <button onclick="addToCart(${key}); event.stopPropagation();">Añadir</button>
        <div class="details" style="display: none;">
            <p>Valoraciones: ${product.valoraciones}</p>
            <p>Tennis-: ${product.to}</p>
            <p>Size: ${product.size}</p>
            <!-- Agrega aquí más detalles -->
        </div>
    `;
    
    newDiv.addEventListener('click', () => {
        const details = newDiv.querySelector('.details');
        if (details.style.display === 'none') {
            details.style.display = 'block';
        } else {
            details.style.display = 'none';
        }
    });
    
    catalogue.appendChild(newDiv);
}


// Funciones para la notificacion de la compra
function createToast(type, icon, title, text) {
    let newToast = document.createElement('div');
    newToast.innerHTML = `
            <div class="toast ${type}">
                <i class="${icon}"></i>
                <div class="content">
                    <div class="title">${title}</div>
                    <span>${text}</span>    
                </div>
                <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
            </div>`;
    notifications.appendChild(newToast);
    newToast.timeOut = setTimeout(
        () => newToast.remove(), 5000
    )
}
/**
 * Toast pago correcto
 */

// closePayment.onclick = function () {
//     let type = 'success';
//     let icon = 'fa-solid fa-circle-check';
//     let title = 'Compra exitosa';
//     let text = 'Gracias por escogernos.';
//     createToast(type, icon, title, text);
// }
//-----------------------------------------------

function addToCart(key) {
    if (!catalogueCarts[key]) {
        const cartProduct = { ...products[key], quantity: 1 };
        catalogueCarts[key] = cartProduct;
        quantity.style.display = "inline";
    } else {
        catalogueCarts[key].quantity++;
        catalogueCarts[key].newPrice = catalogueCarts[key].quantity * products[key].newPrice;
    }
    reloadCart();
}

function changeQuantity(key, quantity) {
    if (quantity > 0) {
        catalogueCarts[key].quantity = quantity;
        catalogueCarts[key].newPrice = quantity * products[key].newPrice;
    } else {
        delete catalogueCarts[key];
    }
    reloadCart();
}

function reloadCart() {
    let cont = 0;
    catalogueCarts.forEach(() => {
        cont++;
    });
    if (cont === 0) {
        quantity.style.display = "none";
    }
    catalogueCart.innerHTML = '';
    let count = 0;
    catalogueCarts.forEach((product, key) => {
        count = count + product.quantity;
        if (product != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="Asserts/productsImages/${product.image}"/></div>
                <div>${product.name}</div>
                <div>${product.newPrice.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${product.quantity - 1})">-</button>
                    <div class="count">${product.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${product.quantity + 1})">+</button>
                </div>`;
            catalogueCart.appendChild(newDiv);
        } else {

        }
    })
    quantity.innerText = count;
    cont = 0

}
/**
 * funcion para filtrar el producto
 */
function filtrado() {
    var input = document.querySelector(".input");
    var value = input.value.toLowerCase();
    var filter = document.querySelector(".filter");
    
    // Limpiar el contenido actual de filter
    filter.innerHTML = ''; 

    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        if (product.name.toLowerCase().includes(value) || product.price === parseFloat(value)) {
            var newDiv = document.createElement('div');
            newDiv.classList.add('item');
            newDiv.innerHTML = `
                <img src="Asserts/productsImages/${product.image}">
                <div class="title">${product.name}</div>
                <div class="price">$${product.price.toLocaleString()}</div>
                <div class="newprice">$${product.newPrice.toLocaleString()}</div>
                <button onclick="addToCart(${i})">Añadir</button>`;
            
            // Agregar el primer producto que coincide y salir del bucle
            filter.appendChild(newDiv);
            break;
        }
    }
}





/**
 * Funcion para pagar cargar los productos en la lista los costos y el subtotal
 */
function payment() {
    paymentCart.innerHTML = '';
    let count = 0;
    let totalAmount = 0;

    // Crear el encabezado con los títulos de las columnas
    let headerDiv = document.createElement('li');
    headerDiv.innerHTML = `
        <div><strong>Nombre de Productos</strong></div>
        <div><strong>Cantidad</strong></div>
        <div><strong>Precio</strong></div>`;
    paymentCart.appendChild(headerDiv);

    catalogueCarts.forEach((product) => {
        totalAmount = totalAmount + product.newPrice;
        count = count + product.quantity;
        if (product != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div>${product.name}</div>
                <div class="count">${product.quantity}</div>
                <div>${product.newPrice.toLocaleString()}</div>`;
            paymentCart.appendChild(newDiv);
        } else {
            // Puedes agregar un manejo especial para productos nulos si es necesario
        }
    });
    total.innerText = "Total: " + totalAmount.toLocaleString();
}



function redirect() {
    window.location.href = "../IngresoTarjeta/ingresoTarjeta.html";
}

function redirectH() {
    window.location.href = "../homePage/homepage.html";
}


function adjustCardHeights() {
    const cards = document.querySelectorAll('.item');
    let maxHeight = 0;
  
    cards.forEach(card => {
      const cardHeight = card.offsetHeight;
      if (cardHeight > maxHeight) {
        maxHeight = cardHeight;
      }
    });
  
    cards.forEach(card => {
      card.style.height = maxHeight + 'px';
    });
  }
  
  // Llama a esta función después de agregar las tarjetas al catálogo
  adjustCardHeights();
  