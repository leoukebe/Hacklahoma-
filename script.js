// Product Data - Mock data for demonstration
const defaultProducts = [
    {
        id: 1,
        title: 'MacBook Pro 2023 - Like New',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
        category: 'electronics',
        location: 'New York, NY',
        seller: 'John Smith',
        condition: 'Like New',
        description: 'MacBook Pro 14 inch, M2 Pro chip, 16GB RAM, 512GB SSD. Purchased 6 months ago, carefully used, still has 18 months of Apple warranty remaining. Includes original box, charger, and cable.',
        time: '2 hours ago',
        postedDate: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
        id: 2,
        title: 'Premium Ergonomic Office Chair',
        price: 350,
        image: 'https://images.unsplash.com/photo-1580437415712-02c300067670?q=80&w=1000&auto=format&fit=crop',
        category: 'furniture',
        location: 'Los Angeles, CA',
        seller: 'Sarah Johnson',
        condition: 'Used',
        description: 'Premium ergonomic office chair with breathable mesh back, adjustable headrest, and 4D armrests. Very comfortable for long work hours. Used for 1 year, still in excellent condition.',
        time: '5 hours ago',
        postedDate: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
        id: 3,
        title: 'Classic Nikon Film Camera',
        price: 280,
        image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1000&auto=format&fit=crop',
        category: 'hobbies',
        location: 'Chicago, IL',
        seller: 'Michael Chen',
        condition: 'Vintage',
        description: 'Classic Nikon film camera in perfect working condition. Includes 50mm f/1.8 lens. Perfect for film photography enthusiasts. Shows light signs of use.',
        time: '1 day ago',
        postedDate: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
        id: 4,
        title: 'Designer Sneakers - White & Blue',
        price: 150,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
        category: 'fashion',
        location: 'Miami, FL',
        seller: 'Emma Davis',
        condition: 'Brand New',
        description: 'Authentic designer athletic shoes, brand new, size 9. Elegant white and blue color scheme. Soft cushioning, lightweight, breathable. Comes with full box and documentation.',
        time: '3 hours ago',
        postedDate: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
        id: 5,
        title: 'Wireless Noise-Cancelling Headphones',
        price: 220,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
        category: 'electronics',
        location: 'Seattle, WA',
        seller: 'David Wilson',
        condition: 'Like New',
        description: 'Premium over-ear headphones with active noise cancellation (ANC). 30-hour battery, Bluetooth 5.0 connectivity. Exceptional detail and deep bass. Used for 3 months.',
        time: '4 hours ago',
        postedDate: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
        id: 6,
        title: 'Professional Mountain Bike',
        price: 800,
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1000&auto=format&fit=crop',
        category: 'sports',
        location: 'Denver, CO',
        seller: 'Rachel Martinez',
        condition: 'Used',
        description: 'Full suspension mountain bike, aluminum frame, hydraulic disc brakes, 12-speed drivetrain. Many upgraded components. Perfect for trail and enduro riding.',
        time: '6 hours ago',
        postedDate: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
];

// Get all products (user listings + defaults)
function getProductsData() {
    const userListings = JSON.parse(localStorage.getItem('marketplaceListings') || '[]');
    return [...userListings, ...defaultProducts];
}

// State Management
let currentCategory = 'all';
let currentSort = 'newest';
let searchQuery = '';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const filterChips = document.querySelectorAll('.chip');
const emptyState = document.getElementById('emptyState');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');

// Check authentication
function checkAuth() {
    const isLoggedIn = localStorage.getItem('marketplaceLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }
}

// Initialize App
function init() {
    checkAuth();
    renderProducts();
    setupEventListeners();
    updateUserProfile();
}

// Setup Event Listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        filterProducts();
    });

    // Clear search
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        filterProducts();
    });

    // Sort chips
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentSort = chip.dataset.sort;
            filterProducts();
        });
    });

    // Modal close
    closeModal.addEventListener('click', () => {
        productModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal on outside click
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Filter and Sort Products
function filterProducts() {
    let filtered = [...getProductsData()];

    // Search filter
    if (searchQuery) {
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery)
        );
    }

    // Sorting
    switch (currentSort) {
        case 'newest':
            filtered.sort((a, b) => b.postedDate - a.postedDate);
            break;
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
    }

    renderProducts(filtered);
}

// Render Products Grid
function renderProducts(products = getProductsData()) {
    productsGrid.innerHTML = '';

    if (products.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        card.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <button class="favorite-button" title="Add to Favorites">
                    <span>❤️</span>
                </button>
            </div>
            <div class="product-info">
                <div class="product-price">$${product.price.toLocaleString()}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-location">
                    <span>📍</span> ${product.location}
                </div>
                <div class="product-meta">
                    <div class="seller-info">
                        <div class="seller-avatar"></div>
                        <span class="seller-name">${product.seller}</span>
                    </div>
                    <span class="product-time">${product.time}</span>
                </div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.closest('.favorite-button')) {
                openProductModal(product.id);
            }
        });

        productsGrid.appendChild(card);
    });
}

// Open Product Modal
function openProductModal(productId) {
    const product = getProductsData().find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalPrice').textContent = `$${product.price.toLocaleString()}`;
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalLocation').textContent = product.location;
    document.getElementById('modalCondition').textContent = product.condition;
    document.getElementById('modalCategory').textContent = getCategoryName(product.category);
    document.getElementById('modalSeller').textContent = product.seller;

    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Get Category Display Name
function getCategoryName(category) {
    const categoryMap = {
        'all': 'All',
        'electronics': 'Electronics',
        'furniture': 'Furniture',
        'fashion': 'Fashion',
        'sports': 'Sports',
        'hobbies': 'Hobbies',
        'vehicles': 'Vehicles'
    };
    return categoryMap[category] || category;
}

// Update User Profile UI
function updateUserProfile() {
    const userName = localStorage.getItem('marketplaceUserName') || 'User';
    const profileButton = document.querySelector('.profile-button');
    if (profileButton) {
        profileButton.title = `Logged in as ${userName}`;

        // Add click handler for logout
        profileButton.addEventListener('click', () => {
            if (confirm('Do you want to log out?')) {
                localStorage.removeItem('marketplaceLoggedIn');
                localStorage.removeItem('marketplaceUserName');
                localStorage.removeItem('marketplaceUserEmail');
                window.location.href = 'login.html';
            }
        });
    }
}

// Start App
init();
