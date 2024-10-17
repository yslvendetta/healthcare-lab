// Handle Registration
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, role })
        });

        const data = await response.json();
        if (data.message === 'User registered successfully') {
            alert('Registration successful');
            window.location.href = 'login.html';  // Redirect to login page
        } else {
            alert('Registration failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    }
});
