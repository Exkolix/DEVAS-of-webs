// Sample products for demonstration
const products = [
    { id: 1, name: "Air Max Sneakers", price: 120 },
    { id: 2, name: "Zoom Fly Shoes", price: 150 },
    { id: 3, name: "Sport T-Shirt", price: 60 },
    { id: 4, name: "Travel Backpack", price: 80 },
];

// Function to render products
function renderProducts(filteredProducts) {
    const productContainer = document.querySelector('.product-grid');
    productContainer.innerHTML = '';

    if (filteredProducts.length === 0) {
        productContainer.innerHTML = '<p>No products match the selected filters.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');
        productElement.innerHTML = `
            <img src="https://via.placeholder.com/200" alt="Product Image">
            <h4>${product.name}</h4>
            <p>$${product.price}</p>w
        `;
        productContainer.appendChild(productElement);
    });
}

// Function to filter products based on price
function filterProducts() {
    const selectedPriceRanges = Array.from(document.querySelectorAll('.price-filter:checked')).map(checkbox => checkbox.value);

    const filteredProducts = products.filter(product => {
        return selectedPriceRanges.some(range => {
            const [min, max] = range.split('-').map(Number);
            return product.price >= min && product.price <= max;
        });
    });

    renderProducts(filteredProducts);
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