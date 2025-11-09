// Authentication System

// Demo users database (in production, this would be server-side)
const users = {
    user: {
        username: 'user',
        password: 'user123',
        role: 'user',
        fullName: 'Regular User'
    },
    admin: {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        fullName: 'Administrator'
    }
};

// Current selected role
let currentRole = 'user';

// Role tab switching
document.addEventListener('DOMContentLoaded', function() {
    const roleTabs = document.querySelectorAll('.role-tab');
    
    roleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            roleTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentRole = this.getAttribute('data-role');
            
            // Clear form
            document.getElementById('loginForm').reset();
            hideAlert();
        });
    });

    // Password toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('bx-show');
            this.classList.toggle('bx-hide');
        });
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Check if already logged in
    checkAuthStatus();
});

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Validate credentials
    const user = users[username];
    
    if (!user) {
        showAlert('Invalid username or password', 'error');
        return;
    }
    
    if (user.password !== password) {
        showAlert('Invalid username or password', 'error');
        return;
    }
    
    if (user.role !== currentRole) {
        showAlert(`This account does not have ${currentRole} privileges`, 'error');
        return;
    }
    
    // Successful login
    const authData = {
        username: user.username,
        role: user.role,
        fullName: user.fullName,
        loginTime: new Date().toISOString()
    };
    
    // Store session
    if (rememberMe) {
        localStorage.setItem('authData', JSON.stringify(authData));
    } else {
        sessionStorage.setItem('authData', JSON.stringify(authData));
    }
    
    showAlert('Login successful! Redirecting...', 'success');
    
    // Redirect based on role
    setTimeout(() => {
        if (user.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'courses.html';
        }
    }, 1500);
}

function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    alertBox.style.display = 'block';
}

function hideAlert() {
    const alertBox = document.getElementById('alertBox');
    alertBox.style.display = 'none';
}

function checkAuthStatus() {
    const authData = getAuthData();
    
    // If on login page and already logged in, redirect
    if (authData && window.location.pathname.includes('login.html')) {
        if (authData.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'courses.html';
        }
    }
}

function getAuthData() {
    const localData = localStorage.getItem('authData');
    const sessionData = sessionStorage.getItem('authData');
    
    if (localData) {
        return JSON.parse(localData);
    }
    if (sessionData) {
        return JSON.parse(sessionData);
    }
    return null;
}

function logout() {
    localStorage.removeItem('authData');
    sessionStorage.removeItem('authData');
    window.location.href = 'login.html';
}

function requireAuth(requiredRole = null) {
    const authData = getAuthData();
    
    if (!authData) {
        window.location.href = 'login.html';
        return false;
    }
    
    if (requiredRole && authData.role !== requiredRole) {
        alert('Access denied. Insufficient privileges.');
        window.location.href = 'courses.html';
        return false;
    }
    
    return authData;
}

// Update user display in header
function updateUserDisplay() {
    const authData = getAuthData();
    const userIcon = document.querySelector('.header-icons a[href*="login"]');
    
    if (authData && userIcon) {
        userIcon.innerHTML = `<i class='bx bx-user-circle'></i>`;
        userIcon.title = `Logged in as ${authData.fullName}`;
        
        // Add dropdown for logout
        const dropdown = document.createElement('div');
        dropdown.className = 'user-dropdown';
        dropdown.innerHTML = `
            <div class="user-info">
                <span>${authData.fullName}</span>
                <small>${authData.role}</small>
            </div>
            <button onclick="logout()" class="logout-btn">
                <i class='bx bx-log-out'></i> Logout
            </button>
        `;
        
        userIcon.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    }
}

// Initialize on page load
if (!window.location.pathname.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', updateUserDisplay);
}
