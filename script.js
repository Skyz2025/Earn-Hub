document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const paymentModal = document.getElementById('paymentModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const activationForm = document.getElementById('activationForm');
    const startAdBtn = document.getElementById('startAdBtn');
    const cancelPayment = document.getElementById('cancelPayment');
    
    // Event Listeners
    loginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
    signupBtn.addEventListener('click', () => signupModal.style.display = 'flex');
    showSignup.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'flex';
    });
    showLogin.addEventListener('click', () => {
        signupModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === signupModal) signupModal.style.display = 'none';
        if (e.target === paymentModal) paymentModal.style.display = 'none';
    });
    
    // Account Activation Form
    activationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        paymentModal.style.display = 'flex';
        
        // Simulate payment processing
        setTimeout(() => {
            document.querySelector('.payment-status p').textContent = 'Payment successful!';
            document.querySelector('.loader').style.display = 'none';
            
            // Show success message
            setTimeout(() => {
                paymentModal.style.display = 'none';
                showAlert('Account activated successfully!', 'success');
            }, 2000);
        }, 3000);
    });
    
    // Cancel payment
    cancelPayment.addEventListener('click', function() {
        paymentModal.style.display = 'none';
    });
    
    // Watch Ad functionality
    startAdBtn.addEventListener('click', function() {
        if (!this.classList.contains('disabled')) {
            this.classList.add('disabled');
            this.textContent = 'Watching...';
            
            const progressBar = document.querySelector('.progress');
            const timeDisplay = document.querySelector('.ad-info span:last-child');
            
            let timeLeft = 30; // 30 seconds
            const interval = setInterval(() => {
                timeLeft--;
                const progress = ((30 - timeLeft) / 30) * 100;
                progressBar.style.width = `${progress}%`;
                timeDisplay.textContent = `Time: 0:${timeLeft < 10 ? '0' : ''}${timeLeft} / 0:30`;
                
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    this.classList.remove('disabled');
                    this.textContent = 'Watch Ad';
                    showAlert('You earned KSh 20', 'success');
                    
                    // Reset progress bar
                    setTimeout(() => {
                        progressBar.style.width = '0%';
                        timeDisplay.textContent = 'Time: 0:30 / 0:30';
                    }, 1000);
                }
            }, 1000);
        }
    });
    
    // Survey buttons
    document.querySelectorAll('.survey-card button').forEach(button => {
        button.addEventListener('click', function() {
            const surveyTitle = this.closest('.survey-card').querySelector('h3').textContent;
            showAlert(`Starting survey: ${surveyTitle}`, 'info');
        });
    });
    
    // Helper function to show alerts
    function showAlert(message, type = 'info') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.style.position = 'fixed';
        alert.style.bottom = '20px';
        alert.style.right = '20px';
        alert.style.padding = '15px 20px';
        alert.style.borderRadius = 'var(--border-radius)';
        alert.style.zIndex = '1000';
        alert.style.boxShadow = 'var(--box-shadow)';
        alert.style.color = 'white';
        alert.style.maxWidth = '300px';
        alert.style.transform = 'translateX(200%)';
        alert.style.transition = 'transform 0.3s ease';
        
        switch(type) {
            case 'success':
                alert.style.backgroundColor = 'var(--success-color)';
                break;
            case 'error':
                alert.style.backgroundColor = 'var(--error-color)';
                break;
            case 'warning':
                alert.style.backgroundColor = 'var(--warning-color)';
                alert.style.color = 'var(--text-dark)';
                break;
            default:
                alert.style.backgroundColor = 'var(--primary-color)';
        }
        
        alert.textContent = message;
        document.body.appendChild(alert);
        
        // Animate in
        setTimeout(() => {
            alert.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto dismiss after 3 seconds
        setTimeout(() => {
            alert.style.transform = 'translateX(200%)';
            setTimeout(() => {
                document.body.removeChild(alert);
            }, 300);
        }, 3000);
    }
    
    // Form validation for signup
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('signupPassword').value;
        const confirm = document.getElementById('signupConfirm').value;
        
        if (password !== confirm) {
            showAlert('Passwords do not match!', 'error');
            return;
        }
        
        // In a real app, you would send data to server here
        showAlert('Account created successfully!', 'success');
        signupModal.style.display = 'none';
        this.reset();
    });
    
    // Form validation for login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real app, you would validate credentials with server
        showAlert('Logged in successfully!', 'success');
        loginModal.style.display = 'none';
        this.reset();
    });
});// Add to script.js
// Withdrawal handling with 10% fee
document.querySelectorAll('.amount// Add this to script.js
document.addEventListener('DOMContentLoaded', function() {
    // Schedule control logic
    const today = new Date();
    const currentDay = today.getDay(); // 0 (Sunday) - 6 (Saturday)
    
    // Get survey section and ads section references
    const surveySection = document.getElementById('surveys');
    const adSection = document.getElementById('ads');

    // Control survey visibility (Only show on Tuesday and Friday)
    if (currentDay !== 2 && currentDay !== 5) { // 2=Tuesday, 5=Friday
        surveySection.style.display = 'none';
    }

    // Control ads visibility (Show 6 days/week, hide on Sunday)
    if (currentDay === 0) { // 0=Sunday
        adSection.style.display = 'none';
    }

    // Weekly reset logic
    const lastReset = localStorage.getItem('lastReset');
    const resetDay = 1; // Monday
    
    if (lastReset === null || (currentDay === resetDay && new Date(lastReset).getDay() !== resetDay)) {
        // Reset weekly counters every Monday
        localStorage.setItem('adViewsThisWeek', '0');
        localStorage.setItem('lastReset', today.toString());
    }
});// Add to script.js
document.addEventListener('DOMContentLoaded', function() {
    // Create logout button
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logoutBtn';
    logoutBtn.className = 'btn btn-outline';
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Log Out';
    
    // Insert logout button into auth-buttons container
    const authButtons = document.querySelector('.auth-buttons');
    authButtons.appendChild(logoutBtn);
    
    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('userLoggedIn');
        window.location.reload();
    });
    
    // Visibility control
    const updateAuthUI = () => {
        const isLoggedIn = localStorage.getItem('userLoggedIn');
        logoutBtn.style.display = isLoggedIn ? 'block' : 'none';
        document.getElementById('loginBtn').style.display = isLoggedIn ? 'none' : 'block';
        document.getElementById('signupBtn').style.display = isLoggedIn ? 'none' : 'block';
    };
    
    // Update UI state
    updateAuthUI();
    
    // Modify existing login handler
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.setItem('userLoggedIn', 'true');
        updateAuthUI();
        document.querySelector('.close-modal').click();
    });
    
    // Modify existing signup handler
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.setItem('userLoggedIn', 'true');
        updateAuthUI();
        document.querySelector('.close-modal').click();
    });
});