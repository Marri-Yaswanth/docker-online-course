// Admin Dashboard JavaScript

// Protect admin pages - require admin role
document.addEventListener('DOMContentLoaded', function() {
    const authData = requireAuth('admin');
    
    if (authData) {
        // Update admin name in header
        const adminNameElement = document.getElementById('adminName');
        if (adminNameElement) {
            adminNameElement.textContent = authData.fullName;
        }
        
        // Initialize dashboard
        initializeDashboard();
    }
});

function initializeDashboard() {
    // Add event listeners for action buttons
    setupCourseManagement();
    setupUserManagement();
    animateStats();
}

function setupCourseManagement() {
    // Edit course buttons
    const editButtons = document.querySelectorAll('.icon-btn.edit');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const courseName = row.cells[0].querySelector('.course-info span').textContent;
            const category = row.cells[1].textContent.trim();
            const price = row.cells[2].textContent.replace('₹', '').replace(',', '').trim();
            const students = row.cells[3].textContent.trim();
            const status = row.cells[4].querySelector('.badge').textContent.trim();
            
            // Get row index (1-based)
            const rowIndex = Array.from(row.parentElement.children).indexOf(row) + 1;
            
            const courseData = {
                id: rowIndex,
                name: courseName,
                category: category,
                price: price,
                students: students,
                status: status
            };
            
            openCourseEditor(courseData);
        });
    });
    
    // Delete course buttons
    const deleteButtons = document.querySelectorAll('.icon-btn.delete');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const courseName = row.querySelector('.course-info span')?.textContent || 'this item';
            
            if (confirm(`Are you sure you want to delete "${courseName}"?`)) {
                row.style.opacity = '0';
                setTimeout(() => {
                    row.remove();
                    showNotification('Item deleted successfully', 'success');
                }, 300);
            }
        });
    });
    
    // Add new course button
    const addCourseBtn = document.querySelector('#courses-management .action-btn.primary');
    if (addCourseBtn) {
        addCourseBtn.addEventListener('click', function() {
            openCourseEditor(null);
        });
    }
    
    // Setup form submission
    const courseForm = document.getElementById('courseEditorForm');
    if (courseForm) {
        courseForm.addEventListener('submit', saveCourse);
    }
}

// Open Course Editor Modal
function openCourseEditor(courseData = null) {
    const modal = document.getElementById('courseEditorModal');
    const form = document.getElementById('courseEditorForm');
    const modalTitle = document.getElementById('modalTitle');
    
    if (courseData) {
        // Edit mode
        modalTitle.textContent = 'Edit Course';
        document.getElementById('courseId').value = courseData.id;
        document.getElementById('courseName').value = courseData.name;
        document.getElementById('courseCategory').value = courseData.category;
        document.getElementById('coursePrice').value = courseData.price;
        document.getElementById('courseStudents').value = courseData.students;
        document.getElementById('courseStatus').value = courseData.status;
        
        // Load additional data from localStorage if available
        const savedCourses = JSON.parse(localStorage.getItem('coursesData') || '{}');
        const savedCourse = savedCourses[courseData.id];
        if (savedCourse) {
            document.getElementById('courseDuration').value = savedCourse.duration || '';
            document.getElementById('courseRating').value = savedCourse.rating || '';
            document.getElementById('courseReviews').value = savedCourse.reviews || '';
            document.getElementById('courseImage').value = savedCourse.image || '';
            document.getElementById('courseDescription').value = savedCourse.description || '';
            document.getElementById('courseVideoUrl').value = savedCourse.videoUrl || '';
        }
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Course';
        form.reset();
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Course Editor Modal
function closeCourseEditor() {
    const modal = document.getElementById('courseEditorModal');
    const form = document.getElementById('courseEditorForm');
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    form.reset();
}

// Save Course
function saveCourse(event) {
    event.preventDefault();
    
    const formData = {
        id: document.getElementById('courseId').value || Date.now(),
        name: document.getElementById('courseName').value,
        category: document.getElementById('courseCategory').value,
        price: document.getElementById('coursePrice').value,
        students: document.getElementById('courseStudents').value,
        status: document.getElementById('courseStatus').value,
        duration: document.getElementById('courseDuration').value,
        rating: document.getElementById('courseRating').value,
        reviews: document.getElementById('courseReviews').value,
        image: document.getElementById('courseImage').value,
        description: document.getElementById('courseDescription').value,
        videoUrl: document.getElementById('courseVideoUrl').value
    };
    
    // Validate required fields
    if (!formData.name || !formData.category || !formData.price) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Save to localStorage
    const savedCourses = JSON.parse(localStorage.getItem('coursesData') || '{}');
    savedCourses[formData.id] = formData;
    localStorage.setItem('coursesData', JSON.stringify(savedCourses));
    
    // Update table row if editing
    const courseId = document.getElementById('courseId').value;
    if (courseId) {
        const tbody = document.querySelector('#courses-management tbody');
        const row = tbody.children[parseInt(courseId) - 1];
        
        if (row) {
            row.cells[0].querySelector('.course-info span').textContent = formData.name;
            row.cells[1].textContent = formData.category;
            row.cells[2].textContent = `₹${parseInt(formData.price).toLocaleString('en-IN')}`;
            row.cells[3].textContent = formData.students;
            row.cells[4].innerHTML = `<span class="badge status-${formData.status.toLowerCase()}">${formData.status}</span>`;
        }
    }
    
    showNotification('Course saved successfully!', 'success');
    closeCourseEditor();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('courseEditorModal');
    if (modal && event.target === modal) {
        closeCourseEditor();
    }
}

function setupUserManagement() {
    // Add new user button
    const addUserBtn = document.querySelector('#users-management .action-btn.primary');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            alert('Add New User\n\nThis would open a form to create a new user account.');
        });
    }
}

function animateStats() {
    // Animate numbers on page load
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class='bx ${type === 'success' ? 'bx-check-circle' : 'bx-info-circle'}'></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for use in other scripts
window.showNotification = showNotification;
