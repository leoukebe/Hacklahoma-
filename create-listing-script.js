// Create Listing Script

// Check authentication
function checkAuth() {
    const isLoggedIn = localStorage.getItem('marketplaceLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }
}

// Initialize
checkAuth();

// Image upload handling
const imageUploadArea = document.getElementById('imageUploadArea');
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');

imageUploadArea.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
            imageUploadArea.querySelector('.upload-placeholder').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Form submission
const form = document.getElementById('createListingForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        id: Date.now(), // Simple ID generation
        title: document.getElementById('title').value,
        price: parseFloat(document.getElementById('price').value),
        description: document.getElementById('description').value,
        location: document.getElementById('location').value,
        condition: document.getElementById('condition').value,
        seller: localStorage.getItem('marketplaceUserName') || 'User',
        time: 'Just now',
        postedDate: new Date(),
        image: imagePreview.src || 'product_laptop_1770493792539.png' // Default image
    };

    // Get existing listings from localStorage
    let listings = JSON.parse(localStorage.getItem('marketplaceListings') || '[]');

    // Add new listing to the beginning
    listings.unshift(formData);

    // Save back to localStorage
    localStorage.setItem('marketplaceListings', JSON.stringify(listings));

    // Show success message
    alert('Listing posted successfully! 🎉');

    // Redirect to marketplace
    window.location.href = 'index.html';
});
