let storeData = [
    {
        id: 1,
        name:"HUBLOT",
        model:"Spirit of Big Bang ",
        color:"Sky Blue",
        price:27400,
        image:"https://content.thewosgroup.com/productimage/17171228/17171228_1.jpg?impolicy=zoom",
    },
    {
        id: 2,
        name:"Jacob & Co",
        model:"Twin Turbo Furious Sapphire Red",
        color:"Black Dial",
        price:1500000,
        image:"https://content.thewosgroup.com/productimage/18102898/18102898_1.jpg?impolicy=hero&imwidth=700",
    },
    {
        id: 3,
        name:"Louis Vuitton",
        model:"M14642",
        color:"Brown",
        price:3500,
        image:"https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-low-key-cookie-mm--M14642_PM2_Front%20view.png?wid=1090&hei=1090",
    },
    {
        id: 4,
        name:"Louis Vuitton",
        model:"M13269",
        color:"Darkesh Brown",
        price:6799,
        image:"https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-x-tm-onthego-pm--M13269_PM1_Back%20view.png?wid=1090&hei=1090",
    }
]

let storeListEl = document.querySelectorAll('.store-container')[0];
let cartCountEl = document.querySelectorAll('.cart-count')[0];
let cartIconEl = document.querySelectorAll('.cart-icon')[0];
let count = 0;

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count on page load
updateCartCount();

// Add click event to cart icon
cartIconEl.addEventListener('click', () => {
    window.location.href = '../cart/cart.html';
});

function ListStore (store) {
    for(let i = 0 ; i < store.length ; i++){
        let storePage = storeItems(store[i]);
        storeListEl.innerHTML += storePage;
    }
}

ListStore(storeData);

function storeItems (item) {
    return `
    <div class="store-product">
        <img src="${item.image}" alt="${item.name}">
        <h2>${item.name}</h2>
        <p>${item.model}</p>
        <p>${item.color}</p>
        <div class="last">
            <p>$${item.price.toLocaleString()}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
    </div>
    `;
}

function addToCart(productId) {
    const product = storeData.find(item => item.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountEl.innerText = count;
}