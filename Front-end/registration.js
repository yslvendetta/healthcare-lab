document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const gender = document.getElementById('gender').value;
    const contactPhone = document.getElementById('contactPhone').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('http://localhost/MedLab/Back-end/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                firstName, 
                lastName, 
                dateOfBirth, 
                gender, 
                contactPhone, 
                contactEmail, 
                password, 
                role 
            })
        });

        const data = await response.json();
        if (data.success) {
            // Assuming the response returns a token on successful registration
            localStorage.setItem('token', data.token); // Save the token to localStorage
            localStorage.setItem('role', data.role); // Save the role to localStorage

            alert('Registration successful');
            // Role-based redirection after successful registration
            if (data.role === 'patient') {
                window.location.href = 'patientdashboard.php'; // Redirect to patient dashboard
            } else if (data.role === 'doctor') {
                window.location.href = 'doctordashboard.html'; // Redirect to doctor dashboard
            } else if (data.role === 'labtechnician') {
                window.location.href = 'labtechdashboard.html'; // Redirect to lab technician dashboard
            }
        } else {
            alert('Registration failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    }
});

