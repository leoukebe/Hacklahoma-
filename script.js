document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const loginBtn = document.querySelector('.login-btn');

    // Toggle Password Visibility
    togglePassword.addEventListener('click', function() {
        // Toggle the type attribute
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle the eye icon
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Form Submission Animation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate loading state
        const originalBtnContent = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Signing In...';
        loginBtn.style.opacity = '0.8';
        loginBtn.style.pointerEvents = 'none';

        // Simulate API call delay
        setTimeout(() => {
            console.log('Login attempt:', {
                email: emailInput.value,
                password: '*****' // Don't log real passwords
            });
            
            // Allow user to see "Success" feedback briefly
            loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
            loginBtn.style.background = '#10b981'; // Green color
            
            // Reset after delay (or redirect in real app)
            setTimeout(() => {
                loginBtn.innerHTML = originalBtnContent;
                loginBtn.style.background = '';
                loginBtn.style.opacity = '1';
                loginBtn.style.pointerEvents = 'auto';
                alert('Login handling logic would go here.\nCheck console for details.');
            }, 1000);
            
        }, 1500);
    });

    // Add float label effect or other micro-interactions if needed here
    // Currently handling via CSS focus states for simplicity and performance
});
