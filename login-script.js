// Login Script
const loginForm = document.getElementById('loginForm');
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.getElementById('password');

// Toggle password visibility
if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
}

// Check if email is remembered
const rememberedEmail = localStorage.getItem('marketplaceEmail');
const emailInput = document.getElementById('email');
const rememberMeCheckbox = document.getElementById('rememberMe');

if (rememberedEmail && emailInput) {
    emailInput.value = rememberedEmail;
    if (rememberMeCheckbox) rememberMeCheckbox.checked = true;
}

// Handle login
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;

        // Simple mock authentication
        if (email && password) {
            // Show loading state
            const btn = this.querySelector('.login-btn');
            if (btn) {
                const btnText = btn.querySelector('span');
                const btnIcon = btn.querySelector('i');

                if (btnText) btnText.textContent = 'Logging in...';
                if (btnIcon) btnIcon.className = 'fas fa-spinner fa-spin';
                btn.disabled = true;
            }

            // Simulate API call
            setTimeout(() => {
                // Save email if remember me checked
                if (rememberMe) {
                    localStorage.setItem('marketplaceEmail', email);
                } else {
                    localStorage.removeItem('marketplaceEmail');
                }

                // Set login session
                localStorage.setItem('marketplaceLoggedIn', 'true');
                localStorage.setItem('marketplaceUserEmail', email);
                localStorage.setItem('marketplaceUserName', email.split('@')[0]);

                // Redirect to marketplace
                window.location.href = 'index.html';
            }, 1500);
        }
    });
}
