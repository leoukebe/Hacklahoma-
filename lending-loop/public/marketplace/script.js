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
let maxPrice = Infinity;

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

    // Max Price input
    const maxPriceInput = document.getElementById('maxPriceInput');
    if (maxPriceInput) {
        maxPriceInput.addEventListener('input', (e) => {
            const val = e.target.value;
            maxPrice = val ? parseFloat(val) : Infinity;
            filterProducts();
        });
    }

    // Offer Modal handling
    const offerModal = document.getElementById('offerModal');
    const closeOfferModal = document.getElementById('closeOfferModal');
    const offerForm = document.getElementById('offerForm');

    if (closeOfferModal && offerModal) {
        closeOfferModal.addEventListener('click', () => {
            offerModal.classList.remove('active');
        });

        offerModal.addEventListener('click', (e) => {
            if (e.target === offerModal) offerModal.classList.remove('active');
        });
    }

    if (offerForm) {
        offerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const listingId = parseInt(document.getElementById('offerListingId').value);
            const description = document.getElementById('offerDescription').value;
            submitOffer(listingId, description);
        });
    }

    // Start countdown timer interval
    setInterval(updateCountdowns, 60000); // Update every minute
    updateCountdowns();

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

    // Max Price filter
    if (maxPrice !== Infinity) {
        filtered = filtered.filter(p => p.price <= maxPrice);
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
                <p class="product-description-card">${product.description}</p>
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
                <!-- Countdown & Offer Badge -->
                ${renderCountdown(product.expiresAt)}
                ${product.offers && product.offers.length > 0 ? `<div class="offer-badge">${product.offers.length} Offers</div>` : ''}
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

    // Check if current user is seller
    const currentUserEmail = localStorage.getItem('marketplaceUserEmail');
    const isSeller = product.sellerEmail === currentUserEmail || (!product.sellerEmail && product.seller === localStorage.getItem('marketplaceUserName'));

    // Update Action Buttons
    const actionButtons = document.querySelector('.action-buttons');
    if (isSeller) {
        // Show offers if seller
        renderSellerView(product, actionButtons);
    } else {
        // Show "Submit Offer" if not seller
        actionButtons.innerHTML = `
            <button class="btn btn-primary" onclick="openOfferModal(${product.id})">
                <span>🤝</span> Submit Offer
            </button>
            <button class="btn btn-secondary">
                <span>💬</span> Message Seller
            </button>
        `;
    }
}

// Render Countdown Helper
function renderCountdown(expiresAt) {
    if (!expiresAt) return '';

    const now = Date.now();
    const diff = expiresAt - now;

    if (diff <= 0) {
        return '<div class="countdown-timer expired"><span>⚠️</span> Expired</div>';
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const colorClass = hours < 24 ? 'urgent' : '';

    return `<div class="countdown-timer ${colorClass}">
        <span>⏳</span> ${hours}h ${minutes}m left
    </div>`;
}

// Update all countdowns
function updateCountdowns() {
    renderProducts(); // Simple re-render for now
}

// Open Offer Modal
window.openOfferModal = function (listingId) {
    document.getElementById('offerListingId').value = listingId;
    document.getElementById('offerDescription').value = '';
    document.getElementById('productModal').classList.remove('active');
    document.getElementById('offerModal').classList.add('active');
};

// Submit Offer logic
function submitOffer(listingId, description) {
    const listings = JSON.parse(localStorage.getItem('marketplaceListings') || '[]');
    const listingIndex = listings.findIndex(l => l.id === listingId);

    if (listingIndex > -1) {
        if (!listings[listingIndex].offers) listings[listingIndex].offers = [];

        listings[listingIndex].offers.push({
            userId: localStorage.getItem('marketplaceUserEmail') || 'Anonymous',
            userName: localStorage.getItem('marketplaceUserName') || 'Anonymous',
            description: description,
            timestamp: Date.now()
        });

        localStorage.setItem('marketplaceListings', JSON.stringify(listings));
        alert('Offer submitted successfully! 🤝');
        document.getElementById('offerModal').classList.remove('active');
        renderProducts(); // Refresh to show offer count
    } else {
        alert('Error: Listing not found.');
    }
}

// Render Seller View (Shows Offers context)
function renderSellerView(product, container) {
    container.innerHTML = `
        <div class="offers-section">
            <h3 class="offers-title">Trade Offers (${product.offers ? product.offers.length : 0})</h3>
            ${renderOffersList(product.offers, product.id)}
        </div>
    `;
}

function renderOffersList(offers, listingId) {
    if (!offers || offers.length === 0) {
        return '<p class="text-secondary">No offers yet.</p>';
    }

    return `<div class="offers-list">
        ${offers.map(offer => `
            <div class="offer-item">
                <div class="offer-header">
                    <span class="offer-user">From: ${offer.userName}</span>
                    <span class="offer-time">${new Date(offer.timestamp).toLocaleDateString()}</span>
                </div>
                <div class="offer-text">${offer.description}</div>
                <button class="btn btn-sm btn-primary" onclick="acceptOffer(${listingId}, ${offers.indexOf(offer)})" style="margin-top: 8px; width: 100%;">
                    <span>✅</span> Accept Offer
                </button>
            </div>
        `).join('')}
    </div>`;
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
// Accept Offer
window.acceptOffer = function (listingId, offerIndex) {
    if (!confirm('Are you sure you want to accept this offer? The item will be marked as sold.')) return;

    const listings = JSON.parse(localStorage.getItem('marketplaceListings') || '[]');
    const listingIndex = listings.findIndex(l => l.id === listingId);

    if (listingIndex > -1) {
        const listing = listings[listingIndex];
        const offer = listing.offers[offerIndex];

        // Create Trade Record
        const trade = {
            id: Date.now(),
            itemTitle: listing.title,
            itemImage: listing.image,
            price: listing.price,
            buyer: offer.userName,
            buyerEmail: offer.userId,
            seller: listing.seller,
            sellerEmail: listing.sellerEmail,
            acceptedDate: new Date().toLocaleDateString(),
            acceptedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: Date.now()
        };

        // Save to History
        const history = JSON.parse(localStorage.getItem('marketplaceHistory') || '[]');
        history.unshift(trade);
        localStorage.setItem('marketplaceHistory', JSON.stringify(history));

        // Remove Listing (Mark as Sold)
        listings.splice(listingIndex, 1);
        localStorage.setItem('marketplaceListings', JSON.stringify(listings));

        alert('Offer accepted! Item moved to Trade History.');
        document.getElementById('productModal').classList.remove('active');
        renderProducts();
    }
};

// Open History Modal
window.openHistoryModal = function () {
    const modal = document.getElementById('historyModal');
    const list = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('marketplaceHistory') || '[]');

    if (history.length === 0) {
        list.innerHTML = '<p class="text-secondary" style="text-align: center; padding: 20px;">No trade history yet.</p>';
    } else {
        list.innerHTML = history.map(trade => `
            <div class="offer-item" style="display: flex; gap: 12px;">
                <img src="${trade.itemImage}" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;">
                <div style="flex: 1;">
                    <h4 style="font-weight: 600; margin-bottom: 4px;">${trade.itemTitle}</h4>
                    <p class="text-secondary" style="font-size: 13px;">Sold to <strong>${trade.buyer}</strong></p>
                    <p class="text-secondary" style="font-size: 12px; margin-top: 4px;">
                        ${trade.acceptedDate} at ${trade.acceptedTime}
                    </p>
                </div>
                <div style="font-weight: 700; color: var(--success-green);">$${trade.price}</div>
            </div>
        `).join('');
    }

    modal.classList.add('active');
};

// Close History Modal
document.getElementById('closeHistoryModal')?.addEventListener('click', () => {
    document.getElementById('historyModal').classList.remove('active');
});

init();
