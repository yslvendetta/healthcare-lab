// Handle Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.token) {
            alert('Login successful');

            // Store JWT token and user role in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);  // Store the user's role
            
            // Redirect based on role
            if (data.role === 'patient') {
                window.location.href = '/patient-dashboard.html';
            } else if (data.role === 'doctor') {
                window.location.href = '/doctor-dashboard.html';
            } else if (data.role === 'lab_technician') {
                window.location.href = '/lab-dashboard.html';
            }
        } else {
            alert('Login failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
});
