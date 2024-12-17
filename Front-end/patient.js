// Logout functionality

// Fetch user information after login (using token stored in localStorage)
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html'; // Redirect to login if no token
        return;
    }

    // Fetch user profile from the server (assuming an API endpoint for this)
    fetch('http://localhost/MedLab/Back-end/patientprofile.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
          // Populate dashboard with user data
          document.getElementById('profileName').textContent = `${data.profile.firstName} ${data.profile.lastName}`;
            document.getElementById('profileEmail').textContent = data.profile.email;
            document.getElementById('profilePhone').textContent = data.profile.phone;
        } else {
            alert('Failed to load profile information: ' + data.message);
            window.location.href = 'login.html'; // Redirect to login if profile fails
        }
    })
    .catch(error => {
        console.error('Error fetching profile:', error);
        alert('An error occurred while fetching your profile.');
        window.location.href = 'login.html';
    });
});

// Logout button action
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('You have logged out.');
    window.location.href = 'login.html'; // Redirect to login page after logout
});

// Profile update modal functionality
const profileModal = document.getElementById('profileModal');
const updateProfileBtn = document.getElementById('updateProfileBtn');
const closeModal = document.getElementById('closeModal');

updateProfileBtn?.addEventListener('click', () => {
    profileModal.style.display = 'block'; // Show modal
});

closeModal?.addEventListener('click', () => {
    profileModal.style.display = 'none'; // Hide modal
    document.getElementById('updateProfileForm').reset(); // Reset form
});

// Update profile logic
document.getElementById('updateProfileForm')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const newName = document.getElementById('newName').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPhone = document.getElementById('newPhone').value;

    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to update your profile');
        return;
    }

    // Send updated profile to the server (assuming an API endpoint for updating the profile)
    fetch('http://localhost/MedLab/Back-end/patientupdateprofile.php', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newName,
            email: newEmail,
            phone: newPhone,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update the profile details on the dashboard
            document.getElementById('profileName').textContent = newName;
            document.getElementById('profileEmail').textContent = newEmail;
            document.getElementById('profilePhone').textContent = newPhone;

            profileModal.style.display = 'none'; // Hide modal
            document.getElementById('updateProfileForm').reset(); // Reset form
        } else {
            alert('Failed to update profile');
        }
    })
    .catch(error => {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating your profile.');
    });
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

// Appointment scheduling
document.getElementById('appointmentForm')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;

    alert(`Appointment scheduled on ${appointmentDate} at ${appointmentTime}.`);
    document.getElementById('appointmentForm').reset(); // Reset the form for new input
});

// Report generation logic
document.getElementById('generateReportBtn')?.addEventListener('click', () => {
    const testResults = [];
    const rows = document.querySelectorAll('#testResultsTable tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        testResults.push({
            test: cells[0].textContent,
            date: cells[1].textContent,
            status: cells[2].textContent,
            result: cells[3].textContent,
        });
    });

    const reportContent = JSON.stringify(testResults, null, 2);
    const blob = new Blob([reportContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test_results_report.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// Modal click outside event (to close modals when clicking outside)
window.onclick = function(event) {
    if (event.target === profileModal) {
        profileModal.style.display = 'none';
    }
    if (event.target === appointmentModal) {
        appointmentModal.style.display = 'none';
    }
};
