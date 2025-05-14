// Cart functionality
function Cart() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    // this.taxRate = 0.1; // 10% tax
    this.init();
}

Cart.prototype.init = function() {
    this.renderCart();
    this.updateSummary();
    this.setupEventListeners();
};

Cart.prototype.setupEventListeners = function() {
    let self = this;
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (self.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        // Here you can implement the checkout process
        alert('Proceeding to checkout...');
    });
};

Cart.prototype.addItem = function(product) {
    let existingItem = this.items.find(function(item) {
        return item.id === product.id;
    });
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        this.items.push({
            id: product.id,
            name: product.name,
            model: product.model,
            color: product.color,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    this.saveCart();
    this.renderCart();
    this.updateSummary();
};

Cart.prototype.removeItem = function(productId) {
    this.items = this.items.filter(function(item) {
        return item.id !== productId;
    });
    this.saveCart();
    this.renderCart();
    this.updateSummary();
    this.updateCartCount();
};

Cart.prototype.updateQuantity = function(productId, newQuantity) {
    let item = this.items.find(function(item) {
        return item.id === productId;
    });
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        this.saveCart();
        this.renderCart();
        this.updateSummary();
        this.updateCartCount();
    }
};

Cart.prototype.saveCart = function() {
    localStorage.setItem('cart', JSON.stringify(this.items));
};

Cart.prototype.calculateSubtotal = function() {
    return this.items.reduce(function(total, item) {
        return total + (item.price * item.quantity);
    }, 0);
};

Cart.prototype.calculateTax = function() {
    return this.calculateSubtotal() * this.taxRate;
};

Cart.prototype.calculateTotal = function() {
    return this.calculateSubtotal() + this.calculateTax();
};

Cart.prototype.updateSummary = function() {
    let subtotal = this.calculateSubtotal();
    let tax = this.calculateTax();
    let total = this.calculateTotal();

    document.getElementById('subtotal').textContent = '$' + subtotal.toLocaleString();
    document.getElementById('tax').textContent = '$' + tax.toLocaleString();
    document.getElementById('total').textContent = '$' + total.toLocaleString();
};

Cart.prototype.updateCartCount = function() {
    let count = this.items.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);
    // Update cart count in product page if it exists
    let cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = count;
    }
};

Cart.prototype.renderCart = function() {
    let cartItemsContainer = document.getElementById('cartItems');
    
    if (this.items.length === 0) {
        cartItemsContainer.innerHTML = 
            '<div class="empty-cart">' +
                '<i class="fas fa-shopping-cart"></i>' +
                '<p>Your cart is empty</p>' +
            '</div>';
        return;
    }

    let itemsHTML = this.items.map(function(item) {
        return (
            '<div class="cart-item">' +
                '<img src="' + item.image + '" alt="' + item.name + '">' +
                '<div class="item-details">' +
                    '<h3>' + item.name + '</h3>' +
                    '<p>' + item.model + '</p>' +
                    '<p>' + item.color + '</p>' +
                '</div>' +
                '<div class="quantity-control">' +
                    '<button onclick="cart.updateQuantity(' + item.id + ', ' + (item.quantity - 1) + ')">-</button>' +
                    '<span>' + item.quantity + '</span>' +
                    '<button onclick="cart.updateQuantity(' + item.id + ', ' + (item.quantity + 1) + ')">+</button>' +
                '</div>' +
                '<div class="price">$' + (item.price * item.quantity).toLocaleString() + '</div>' +
                '<button class="remove-btn" onclick="cart.removeItem(' + item.id + ')">Remove</button>' +
            '</div>'
        );
    }).join('');

    cartItemsContainer.innerHTML = itemsHTML;
};

// Initialize cart
let cart = new Cart();

// Function to add item to cart (can be called from product page)
function addToCart(product) {
    let.addItem(product);
} 