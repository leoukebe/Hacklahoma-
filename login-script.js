document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const loginBtn = document.querySelector('.login-btn');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('marketplaceLoggedIn');
    const savedEmail = localStorage.getItem('marketplaceEmail');

    if (isLoggedIn === 'true') {
        // Redirect to marketplace if already logged in
        window.location.href = 'index.html';
        return;
    }

    // Pre-fill email if remembered
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
    }

    // Toggle Password Visibility
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;
        const rememberMe = rememberMeCheckbox.checked;

        // Simulate loading state
        const originalBtnContent = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Signing In...';
        loginBtn.style.opacity = '0.8';
        loginBtn.style.pointerEvents = 'none';

        // Simulate API call delay
        setTimeout(() => {
            console.log('Login attempt:', {
                email: email,
                password: '*****',
                rememberMe: rememberMe
            });

            // Store login state
            localStorage.setItem('marketplaceLoggedIn', 'true');
            localStorage.setItem('marketplaceUserEmail', email);
            localStorage.setItem('marketplaceUserName', email.split('@')[0]); // Simple name from email

            // Store email if remember me is checked
            if (rememberMe) {
                localStorage.setItem('marketplaceEmail', email);
            } else {
                localStorage.removeItem('marketplaceEmail');
            }

            // Show success
            loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
            loginBtn.style.background = '#10b981';

            // Redirect to marketplace
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 800);

        }, 1500);
    });

    // Social login buttons (placeholder functionality)
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = btn.classList.contains('google') ? 'Google' :
                btn.classList.contains('apple') ? 'Apple' : 'Facebook';
            alert(`${provider} login would be implemented here`);
        });
    });
});
