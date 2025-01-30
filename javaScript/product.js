const navbar = document.querySelector('.nav-filters');
const sidebar = document.querySelector('.filter-sidebar');

// Sample product array (add this to product.js)
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 199.99,
        image: "https://picsum.photos/300/300?random=1",
        description: "Premium noise-canceling wireless headphones with 30-hour battery life"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: 149.99,
        image: "https://picsum.photos/300/300?random=2",
        description: "Heart rate monitor, GPS tracking, and water-resistant design"
    },
    {
        id: 3,
        name: "Compact Blender",
        price: 89.99,
        image: "https://picsum.photos/300/300?random=3",
        description: "Portable high-speed blender for smoothies and shakes"
    },
    // Add more products as needed
];

// Render function (add this to product.js)
function renderProducts(productsArray) {
    const productGrid = document.querySelector('.product-grid');
    
    // Clear existing products
    productGrid.innerHTML = '';

    // Create product cards
    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h4>${product.name}</h4>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="description">${product.description}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Initial render when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});

// Add this placeholder function for the Add to Cart button (add to main.js)
function addToCart(productId) {
    // Your cart logic will go here
    console.log(`Added product ${productId} to cart`);
}
// Add event listeners to checkboxes for real-time filtering
document.querySelectorAll('.price-filter').forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
});

// Initial render (show all products by default)
renderProducts(products);
// Cart logic
// Cart array to store added products
let cart = [];

// Function to update cart UI
function updateCartCount() {
    const cartCount = document.querySelector('.cart span');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0); // Total items in cart
}

// Function to add product to the cart
function addToCart(productId, productName, productPrice) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity
    } else {
        // Add new product to cart
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    updateCartCount(); // Update the cart icon
    console.log(cart); // Log cart contents for debugging
}

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = parseInt(button.dataset.id);
        const productName = button.dataset.name;
        const productPrice = parseFloat(button.dataset.price);
        addToCart(productId, productName, productPrice);
    });
});

// Initialize cart count
updateCartCount();

// Bag system
let bag = []; // Array to store bag items

const bagCount = document.getElementById("bag-count");
const bagItems = document.getElementById("bag-items");
const bagTotal = document.getElementById("bag-total");
const bagDropdown = document.getElementById("bag-dropdown");

// Add to Bag Function
function addToBag(productName, productPrice) {
    const itemIndex = bag.findIndex((item) => item.name === productName);
    if (itemIndex > -1) {
        // If item already exists, increase its quantity
        bag[itemIndex].quantity += 1;
    } else {
        // Otherwise, add new item
        bag.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateBag();
}

// Update Bag UI
function updateBag() {
    // Update count
    bagCount.textContent = bag.reduce((total, item) => total + item.quantity, 0);

    // Update bag items
    bagItems.innerHTML = "";
    let totalPrice = 0;
    bag.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${item.name} (x${item.quantity}) - $${item.price * item.quantity}`;
        bagItems.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    // Update total price
    bagTotal.textContent = totalPrice.toFixed(2);
}

// Toggle Bag Dropdown
document.querySelector(".bag").addEventListener("click", () => {
    bagDropdown.classList.toggle("active");
});

// Example: Add event listeners to "Add to Bag" buttons
document.querySelectorAll(".product-card").forEach((card) => {
    const productName = card.querySelector("h4").textContent;
    const productPrice = parseFloat(card.querySelector("p").textContent.replace("$", ""));
    card.addEventListener("click", () => addToBag(productName, productPrice));
});