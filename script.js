const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", window.scrollY > 0);
});

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('open');
};

// Newsletter Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            const message = document.getElementById('newsletterMessage');
            
            // Simulate form submission
            message.textContent = `Thank you! We've sent a confirmation to ${email}`;
            message.style.display = 'block';
            message.style.color = 'var(--main-color)';
            
            // Clear form
            newsletterForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                message.style.display = 'none';
            }, 5000);
        });
    }
});

// Wishlist functionality
function showWishlist() {
    alert('Wishlist Feature\n\nYour saved courses will appear here. Please login to access your wishlist.\n\n👉 Click on the user icon to login.');
}

// Add to wishlist
function addToWishlist(courseName) {
    // Get current wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (!wishlist.includes(courseName)) {
        wishlist.push(courseName);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showNotification(`"${courseName}" added to your wishlist! ❤️`);
    } else {
        showNotification(`"${courseName}" is already in your wishlist!`);
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification-popup';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--main-color);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Cart functionality
function showCart() {
    alert('Shopping Cart\n\nYour course cart is empty. Browse courses and click "Enroll Now" to add courses.\n\n👉 Click on the user icon to login and start learning!');
}

// Video Modal Functions
function openVideoModal(videoUrl) {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = videoUrl + '?autoplay=1';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the video
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeVideoModal();
    }
};

// Video Modal Functions
function openVideoModal(videoUrl) {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = videoUrl + '?autoplay=1';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the video
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeVideoModal();
    }
};
