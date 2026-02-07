// ==========================================
// Facebook Marketplace Clone - JavaScript
// ==========================================

// Product Data - Mock data for demonstration
const defaultProducts = [
    {
        id: 1,
        title: 'MacBook Pro 2023 - Like New',
        price: 1200,
        image: 'product_laptop_1770493792539.png',
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
        image: 'product_chair_1770493805389.png',
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
        image: 'product_camera_1770493818177.png',
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
        image: 'product_sneakers_1770493831179.png',
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
        image: 'product_headphones_1770493843883.png',
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
        image: 'product_bike_1770493856475.png',
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
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const categoryItems = document.querySelectorAll('.category-item');
const sortChips = document.querySelectorAll('.chip[data-sort]');
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');

// Initialize App
function init() {
    // Check authentication
    checkAuth();
    // Setup user profile
    setupUserProfile();
    // Render products
    renderProducts();
    // Attach event listeners
    attachEventListeners();
}

// Check Authentication
function checkAuth() {
    const isLoggedIn = localStorage.getItem('marketplaceLoggedIn');
    if (isLoggedIn !== 'true') {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return;
    }
}

// Setup User Profile
function setupUserProfile() {
    const userName = localStorage.getItem('marketplaceUserName') || 'User';
    const userEmail = localStorage.getItem('marketplaceUserEmail') || '';

    // Update profile button to show user info
    const profileButton = document.querySelector('.profile-button');
    if (profileButton) {
        profileButton.title = `${userName} (${userEmail})`;

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

// Attach Event Listeners
function attachEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    searchClear.addEventListener('click', clearSearch);

    // Category filtering
    categoryItems.forEach(item => {
        item.addEventListener('click', () => handleCategoryChange(item));
    });

    // Sorting
    sortChips.forEach(chip => {
        chip.addEventListener('click', () => handleSortChange(chip));
    });

    // Modal controls
    modalClose.addEventListener('click', closeModal);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeModal();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Handle Search
function handleSearch(e) {
    searchQuery = e.target.value.toLowerCase();
    renderProducts();
}

// Clear Search
function clearSearch() {
    searchInput.value = '';
    searchQuery = '';
    renderProducts();
}

// Handle Category Change
function handleCategoryChange(item) {
    categoryItems.forEach(cat => cat.classList.remove('active'));
    item.classList.add('active');
    currentCategory = item.dataset.category;
    renderProducts();
}

// Handle Sort Change
function handleSortChange(chip) {
    sortChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    currentSort = chip.dataset.sort;
    renderProducts();
}

// Filter Products
function filterProducts() {
    let filtered = [...getProductsData()];

    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // Filter by search query
    if (searchQuery) {
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery) ||
            p.category.toLowerCase().includes(searchQuery)
        );
    }

    // Sort products
    switch (currentSort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
        default:
            filtered.sort((a, b) => b.postedDate - a.postedDate);
            break;
    }

    return filtered;
}

// Render Products
function renderProducts() {
    const filtered = filterProducts();

    if (filtered.length === 0) {
        productsGrid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    productsGrid.innerHTML = filtered.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <button class="favorite-button" onclick="toggleFavorite(event, ${product.id})">
                    ❤️
                </button>
            </div>
            <div class="product-info">
                <div class="product-price">$${product.price.toLocaleString()}</div>
                <div class="product-title">${product.title}</div>
                <div class="product-location">📍 ${product.location}</div>
                <div class="product-meta">
                    <div class="seller-info">
                        <div class="seller-avatar"></div>
                        <div class="seller-name">${product.seller}</div>
                    </div>
                    <div class="product-time">${product.time}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle Favorite
function toggleFavorite(event, productId) {
    event.stopPropagation();
    const button = event.currentTarget;

    // Simple animation
    button.style.transform = 'scale(1.3)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);

    console.log('Toggled favorite for product:', productId);
}

// Open Product Modal
function openProductModal(productId) {
    const product = getProductsData().find(p => p.id === productId);
    if (!product) return;

    // Populate modal with product data
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.title;
    document.getElementById('modalPrice').textContent = `$${product.price.toLocaleString()}`;
    document.getElementById('modalProductTitle').textContent = product.title;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalLocation').textContent = product.location;
    document.getElementById('modalCondition').textContent = product.condition;
    document.getElementById('modalCategory').textContent = getCategoryName(product.category);
    document.getElementById('modalSellerName').textContent = product.seller;

    // Show modal
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = 'auto';
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

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
