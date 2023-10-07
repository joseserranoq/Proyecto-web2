let openShopping = document.querySelector('.shopping');
let openPayment = document.querySelector('.open');
let closeShopping = document.querySelector('.close');
let catalogue = document.querySelector('.catalogue');
let catalogueCart = document.querySelector('.catalogueCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let catalogueCarts = [];
let products = [
    {
        id: 1,
        name: 'Air Jordan',
        image: '1.PNG',
        price: 2000,
        newPrice: 1000
    },
    {
        id: 2,
        name: 'Air Jordan',
        image: '2.PNG',
        price: 2000,
        newPrice: 1000
    },
    {
        id: 3,
        name: 'Air Jordan',
        image: '3.PNG',
        price: 2000,
        newPrice: 1000
    },
    {
        id: 4,
        name: 'Air Jordan',
        image: '4.PNG',
        price: 2000,
        newPrice: 1000
    },
    {
        id: 5,
        name: 'Air Jordan',
        image: '5.PNG',
        price: 2000,
        newPrice: 1000
    },
    {
        id: 6,
        name: 'Air Jordan',
        image: '6.PNG',
        price: 2000,
        newPrice: 1000
    },
    {
        id: 7,
        name: 'Air Jordan',
        image: '7.PNG',
        price: 2000,
        newPrice: 1000
    },
    {
        id: 8,
        name: 'Air Jordan',
        image: '8.PNG',
        price: 2000,
        newPrice: 1000
    },
    {
        id: 9,
        name: 'Air Jordan',
        image: '9.PNG',
        price: 2000,
        newPrice: 1000
    },
    {
        id: 10,
        name: 'Air Jordan',
        image: '16.PNG',
        price: 2000,
        newPrice: 1000
    },
    {
        id: 11,
        name: 'Air Jordan',
        image: '11.PNG',
        price: 2000,
        newPrice: 1000
    },
    {
        id: 12,
        name: 'Air Jordan',
        image: '12.PNG',
        price: 2000,
        newPrice: 1000
    },
    {
        id: 13,
        name: 'Air Jordan',
        image: '13.PNG',
        price: 2000,
        newPrice: 1000
    },
    {
        id: 14,
        name: 'Air Jordan',
        image: '14.PNG',
        price: 2000,
        newPrice: 1000
    },
];

function initApp() {
    quantity.style.display = "none";
    products.forEach((product, key) => {
        createProductElement(product, key);
    });
}

initApp();
 
openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
openPayment.addEventListener('click', () => {
    body.classList.add('pay-active');
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
      <button onclick="addToCart(${key})">Añadir</button>`;
    catalogue.appendChild(newDiv);
}   

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
    catalogueCarts.forEach(() =>{
        cont++; 
    });
    if(cont === 0){
        quantity.style.display = "none";
    }
    catalogueCart.innerHTML = '';
    let count = 0;
    let totalAmount = 0;
    catalogueCarts.forEach((product, key) => {
        totalAmount = totalAmount + product.newPrice;
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

function payment(){
    
}