// Sample product array
const products = [
    {
        id: 1,
        name: "Speaker",
        category: "gadgets",
        price: 120,
        image: "Asset/Products/Gadget-white360Speaker.jpg",
        description: "Powerful sound with sleek design.",
        special: ["new", "onSale"],
    },
    {
        id: 2,
        name: "EarBuds",
        category: "accessory",
        price: 50,
        image: "Asset/Products/Accessory-earplugs.jpg",
        description: "Lightweight and comfortable",
        special: ["onSale", "trending"],
    },
    {
        id: 3,
        name: "RGB Health ring",
        category: "accessory",
        price: 500,
        image: "Asset/Products/Acceccory-RgbSmartRing.jpg",
        description: "Health tracking with vibrant lighting.",
        special: ["limited"],
    },
    {
        id: 4,
        name: "Health ring",
        category: "accessory",
        price: 800,
        image: "Asset/Products/Accessory-SmartRing.jpg",
        description: "Advanced health tracking in a stylish ring.",
        special: ["limited"],
    },
    {
        id: 5,
        name: "Smartwatch",
        category: "gadgets",
        price: 2000,
        image: "Asset/Products/Accessory-smartWatch2.jpg",
        description: "Stay connected with your health and fitness.",
        special: ["new"],
    },
    {
        id: 6,
        name: "Black leather jacket",
        category: "Health and Fashion",
        price: 1200,
        image: "Asset/Products/Fashio-Jacket.jpg",
        description: "Comfortable and stylish.",
        special: ["trending"],
    },
];

// Render function: renders products in the product grid
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
                <h4 class="productName">${product.name}</h4>
                <p class="description">${product.description}</p>
                <h4 class="category">${product.category}</h4>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to Bag</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    attachCartEventListeners();
}

// Initial render when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});

// Filtering logic: update this if you add more filters
function filterProducts() {
    const selectedCategories = Array.from(document.querySelectorAll('.filter-section input[type=checkbox]:checked'))
        .map(input => input.value);
    const filteredProducts = products.filter(product =>
        selectedCategories.length === 0 || selectedCategories.includes(product.category)
    );
    renderProducts(filteredProducts);
}

document.querySelectorAll('.filter-section input[type=checkbox]').forEach(input => {
    input.addEventListener('change', filterProducts);
});

// --------------------------
// Cart (Bag) System
// --------------------------

// Cart array to store added products
let cart = [];

// Update Cart UI: formatted layout with image on the left, name in the middle, price on the right
function updateBag() {
    const bagDropdown = document.getElementById("bag-dropdown");
    bagDropdown.innerHTML = "";
    
    if (cart.length === 0) {
        bagDropdown.innerHTML = `<p class="no-item">Your bag is empty.</p>`;
        return;
    }
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        bagDropdown.innerHTML += `
        <div class="bag-item">
            <img src="${item.image}" alt="${item.name}" class="bag-item-img">
            <div class="bag-item-info">
                <p class="bag-item-name">${item.name}</p> <!-- Name on top -->
                <div class="quantity-selector">
                    <button onclick="updateQuantity(${item.id}, -1 )" class="updButton-minus">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="updButton-plus">+</button>
                </div>
            </div>
            <p class="bag-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <br class = "break">
    `;
    });
    
    bagDropdown.innerHTML += `<p class="bag-total"><strong>Total: $${totalPrice.toFixed(2)}</strong></p>`;
}

// Function to add product to the cart
function addToBag(productId, productName, productPrice, productImage) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
    }
    updateBag();
}

// Function to update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId); // Remove item if quantity is 0
        }
        updateBag();
    }
}

// Attach event listeners to "Add to Cart" buttons
function attachCartEventListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(button.dataset.id);
            const productName = button.dataset.name;
            const productPrice = parseFloat(button.dataset.price);
            const productImage = button.dataset.image;
            addToBag(productId, productName, productPrice, productImage);
        });
    });
}
// Event delegation for quantity buttons to prevent dropdown closure
document.getElementById("bag-dropdown").addEventListener("click", (e) => {
    if (e.target.classList.contains("updButton-minus")) {
        const productId = parseInt(e.target.closest(".bag-item").dataset.id);
        updateQuantity(productId, -1);
        e.stopPropagation(); // Prevents dropdown from closing
    }
    if (e.target.classList.contains("updButton-plus")) {
        const productId = parseInt(e.target.closest(".bag-item").dataset.id);
        updateQuantity(productId, 1);
        e.stopPropagation(); // Prevents dropdown from closing
    }
});

// Initialize cart count / bag UI on page load
updateBag();

// --------------------------
// Bag Dropdown Toggle
document.querySelector(".bag").addEventListener("click", () => {
    document.getElementById("bag-dropdown").classList.toggle("active");
});
// Filtering logic: update filterProducts to handle category, price, and special filters
function filterProducts() {
    // Category filters: select checkboxes that are not price or special filters
    // Expected values: "gadgets", "accessory", "health and fashion", "home appliances"
    const categoryFilters = Array.from(
        document.querySelectorAll('.filter-section input[type=checkbox]:not(.price-filter):not(.special-filter):checked')
    ).map(input => input.value.toLowerCase());
    
    // Price filters: using the .price-filter class
    // Expected values: "0-50", "50-100", "100-250", "250-500", "500-1000", "1000+"
    const priceFilters = Array.from(document.querySelectorAll('.price-filter:checked')).map(input => input.value);
    
    // Special filters: using the .special-filter class
    // Expected values: "new", "onSale", "trending", "bestSeller", "limited", "exclusive", "featured"
    const specialFilters = Array.from(document.querySelectorAll('.special-filter:checked')).map(input => input.value);
    
    const filteredProducts = products.filter(product => {
        // Check category: if no category filter is selected, pass all; otherwise product.category must exactly match one of the selected values.
        const categoryMatch = categoryFilters.length === 0 || categoryFilters.includes(product.category.toLowerCase());
        
        // Check price: if no price filter is selected, pass all; otherwise, product.price must fall within at least one selected range.
        let priceMatch = true;
        if (priceFilters.length > 0) {
            priceMatch = priceFilters.some(range => {
                // For range format "0-50", "50-100", etc.
                if (range.includes('+')) {
                    // For values like "1000+", parse minimum
                    const min = parseFloat(range.replace('+', ''));
                    return product.price >= min;
                } else {
                    const [minStr, maxStr] = range.split('-');
                    const min = parseFloat(minStr);
                    const max = parseFloat(maxStr);
                    return product.price >= min && product.price <= max;
                }
            });
        }
        
        // Check special: if no special filter is selected, pass all; else product.special (an array) must include at least one selected tag.
        let specialMatch = true;
        if (specialFilters.length > 0) {
            specialMatch = specialFilters.some(tag => product.special.includes(tag));
        }
        
        return categoryMatch && priceMatch && specialMatch;
    });
    
    renderProducts(filteredProducts);
}

// Attach event listeners to all checkboxes in filter sections
document.querySelectorAll('.filter-section input[type=checkbox]').forEach(input => {
    input.addEventListener('change', filterProducts);
});

// Initial render (show all products by default)
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});


// Toggle dropdown for filter sections
document.querySelectorAll('.filter-header').forEach(header => {
    header.addEventListener('click', () => {
        // Toggle active class on the parent filter-section
        header.parentElement.classList.toggle('active');
    });
});