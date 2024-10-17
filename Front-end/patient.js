// Logout functionality
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('You have logged out.');
});

// Request new test button action
document.getElementById('testRequestForm')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get values from the form
    const patientName = document.getElementById('patientName').value;
    const testType = document.getElementById('testType').value;

    // Create a new row in the test results table
    const testResultsTableBody = document.querySelector('#testResultsTable tbody');
    const newRow = testResultsTableBody.insertRow();
    newRow.innerHTML = `
        <td>${testType}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td>Pending</td>
        <td>Results will be available soon</td>
    `;

    // Reset the form for new input
    document.getElementById('testRequestForm').reset();
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

    // Update profile details on the dashboard
    document.getElementById('profileName').textContent = newName;
    document.getElementById('profileEmail').textContent = newEmail;
    document.getElementById('profilePhone').textContent = newPhone;

    profileModal.style.display = 'none'; // Hide modal
    document.getElementById('updateProfileForm').reset(); // Reset form
});

// Schedule Appointment button action
const appointmentModal = document.getElementById('appointmentModal');
document.getElementById('scheduleAppointmentBtn')?.addEventListener('click', () => {
    appointmentModal.style.display = 'block';
});

// Close appointment modal
document.getElementById('closeAppointmentModal')?.addEventListener('click', () => {
    appointmentModal.style.display = 'none';
});

// Handle scheduling appointment
document.getElementById('scheduleAppointmentForm')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const appointmentDateTime = `${date} at ${time}`;
    
    // Display confirmation message
    document.getElementById('appointmentDateTime').textContent = appointmentDateTime;
    document.getElementById('appointmentConfirmation').style.display = 'block';
    
    // Close the appointment modal
    appointmentModal.style.display = 'none';

    // Reset the form
    document.getElementById('scheduleAppointmentForm').reset();
});

// Download report button action
document.getElementById('downloadReportBtn')?.addEventListener('click', () => {
    const testResults = [
        { test: 'Blood Test', date: '2024-10-01', status: 'Completed', result: 'Normal' },
        { test: 'X-Ray', date: '2024-10-05', status: 'Completed', result: 'Normal' },
        // Add more test results as needed
    ];

    // Generate report content
    let reportContent = 'Test Results\n\n';
    testResults.forEach(result => {
        reportContent += `Test: ${result.test}\nDate: ${result.date}\nStatus: ${result.status}\nResult: ${result.result}\n\n`;
    });

    // Create a blob and generate a link for download
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test_results.txt'; // Change to your desired filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object
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
