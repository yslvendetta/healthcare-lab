// Handle logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('You have logged out.');
});

// Toggle sidebar visibility
const sidebar = document.getElementById('sidebar');
const editProfileBtn = document.getElementById('editProfileBtn');
const menuToggle = document.getElementById('menuToggle');


menuToggle?.addEventListener('click', () => {
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-220px';  // Hide sidebar
    } else {
        sidebar.style.left = '0px';  // Show sidebar
    }
});

const profileModal = document.getElementById('profileModal');
const closeModal = document.getElementById('closeEditModal');

editProfileBtn?.addEventListener('click', () => {
    profileModal.style.display = 'block'; // Show modal
});


closeModal?.addEventListener('click', () => {
    profileModal.style.display = 'none'; // Hide modal
    document.getElementById('editProfileForm').reset(); // Reset form
});


// Update profile logic
document.getElementById('editProfileForm')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const newName = document.getElementById('newName').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPhone = document.getElementById('newPhone').value;

    // Update profile details on the dashboard
    document.getElementById('profileName').textContent = newName;
    document.getElementById('profileEmail').textContent = newEmail;
    document.getElementById('profilePhone').textContent = newPhone;

    profileModal.style.display = 'none'; // Hide modal
    document.getElementById('editProfileForm').reset(); // Reset form
});


// Function to handle viewing patient details (with a modal)
function viewPatientDetails(patientId) {
    // Simulated patient data (this would be fetched from the backend in a real app)
    const patients = {
        123: { name: "John Doe", email: "johndoe@example.com", testStatus: "Pending" },
        124: { name: "Jane Smith", email: "janesmith@example.com", testStatus: "Completed" }
    };

    const patient = patients[patientId];

    if (patient) {
        // Update modal with patient details
        document.getElementById('modalPatientName').textContent = patient.name;
        document.getElementById('modalPatientEmail').textContent = patient.email;
        document.getElementById('modalTestStatus').textContent = patient.testStatus;

        // Display the modal
        const modal = document.getElementById('viewModal');
        modal.style.display = "block";
    }
}

// Close the modal when the "X" is clicked
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('viewModal').style.display = "none";
});

// Close the modal if clicked outside the modal content
window.addEventListener('click', function(event) {
    const modal = document.getElementById('viewModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Approve test requests and results
document.querySelectorAll('.approve-btn').forEach(button => {
    button.addEventListener('click', function() {
        const requestId = this.getAttribute('data-request-id');
        approveRequest(requestId);
    });
});

// Function to handle approving a request (updating the UI)
function approveRequest(requestId) {
    // Simulated approval action
    alert('Approving request ID: ' + requestId);

    // Find the row containing the request and update the status
    const requestRow = document.querySelector(`[data-request-id="${requestId}"]`).closest('tr');
    const statusCell = requestRow.querySelector('td:nth-child(3)');  // Assuming the test status is the 3rd column
    statusCell.textContent = 'Approved';  // Change status to "Approved"
}

// Add event listeners for "View" buttons
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', function() {
        const patientId = this.getAttribute('data-patient-id');
        viewPatientDetails(patientId);
    });
});

// Handle test request form submission
document.getElementById('requestTestForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const patientName = document.getElementById('patientName').value;
    const testType = document.getElementById('testType').value;
    const testDate = document.getElementById('testDate').value;

    // Simulated action: Send this data to the backend (or process it as needed)
    sendTestRequest(patientName, testType, testDate);

    // Clear the form fields after submission
    this.reset();
});

// Function to simulate sending a test request and updating patient data
function sendTestRequest(patientName, testType, testDate) {
    // Simulated patient data update
    alert(`Test requested for ${patientName}:\nType: ${testType}\nDate: ${testDate}`);

    // Update the patient's test status in the table
    const patientsTableBody = document.querySelector('#patients-section tbody');
    const newRow = patientsTableBody.insertRow();

    newRow.innerHTML = `
        <td>${patientName}</td>
        <td>${patientName.toLowerCase().replace(' ', '') + '@example.com'}</td>
        <td>Pending</td>
        <td><button class="view-btn" data-patient-id="${patientsTableBody.rows.length + 122}">View</button></td>
    `;

    // You might also want to update the lab technician's dashboard here (not shown)
    console.log(`Send the request to the lab technician for ${patientName}: ${testType}`);
}
