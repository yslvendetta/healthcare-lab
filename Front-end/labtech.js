// Handle logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('You have logged out.');
});

// Toggle sidebar visibility
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');

menuToggle?.addEventListener('click', () => {
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-220px';  // Hide sidebar
    } else {
        sidebar.style.left = '0px';  // Show sidebar
    }
});

// Handle test requests processing
document.querySelectorAll('.process-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Processing request for: ' + button.parentElement.parentElement.cells[1].textContent);
        // Additional logic to process the test request could go here.
    });
});
