
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patient Dashboard</title>
    <link rel="stylesheet" href="patient.css">
</head>
<body>
    <header class="navbar">
        <h1>Patient Dashboard</h1>
        <nav>
            <ul>
                <li><a href="#profile-section">Profile</a></li>
                <li><a href="#results-section">Test Results</a></li>
                <li><a href="login.html" id="logoutBtn">Logout</a></li>
            </ul>
        </nav>
        <div class="menu-icon" id="menuToggle">&#9776;</div>
    </header>

    <div class="content">
        <aside class="sidebar" id="sidebar">
            <ul>
                <li><a href="#profile-section">Profile</a></li>
                <li><a href="#results-section">Test Results</a></li>
            </ul>
        </aside>

        <main>
            <!-- Profile Section -->
            <section id="profile-section">
                <h2>Your Profile</h2>
                <div class="profile-details">
                    <p><strong>Name:</strong> <span id="profileName"><?php echo htmlspecialchars($name); ?></span></p>
                    <p><strong>Email:</strong> <span id="profileEmail"><?php echo htmlspecialchars($email); ?></span></p>
                    <p><strong>Phone:</strong> <span id="profilePhone"><?php echo htmlspecialchars($phone); ?></span></p>
                    <button id="updateProfileBtn">Update Profile</button>
                </div>
            </section>

            <!-- Schedule Appointment Section -->
            <section id="appointment-section">
                <h2>Schedule an Appointment</h2>
                <button id="scheduleAppointmentBtn">Schedule Appointment</button>
                <div id="appointmentConfirmation" style="display: none;">
                    <p>Your appointment is set for <span id="appointmentDateTime"></span>.</p>
                </div>
            </section>

            <!-- Test Results Section -->
            <section id="results-section">
                <h2>Your Test Results</h2>
                <table id="testResultsTable">
                    <thead>
                        <tr>
                            <th>Test</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Initially empty; rows will be added dynamically -->
                    </tbody>
                </table>
            </section>

            <!-- Report Generation Section -->
            <section id="report-section">
                <h2>Download Test Results</h2>
                <button id="downloadReportBtn">Download Report</button>
            </section>
        </main>
    </div>

    <!-- Profile Update Modal -->
    <div id="profileModal" class="modal">
        <div class="modal-content">
            <span class="close-btn" id="closeModal">&times;</span>
            <h2>Update Profile</h2>
            <form id="updateProfileForm">
                <label for="newName">Name:</label>
                <input type="text" id="newName" name="newName" value="<?php echo $name; ?>" required>

                <label for="newEmail">Email:</label>
                <input type="email" id="newEmail" name="newEmail" value="<?php echo $email; ?>" required>

                <label for="newPhone">Phone:</label>
                <input type="tel" id="newPhone" name="newPhone" value="<?php echo $phone; ?>" required>

                <button type="submit">Update</button>
            </form>
        </div>
    </div>

    <!-- Modal for Scheduling Appointment -->
    <div id="appointmentModal" class="modal">
        <div class="modal-content">
            <span class="close-btn" id="closeAppointmentModal">&times;</span>
            <h2>Schedule Appointment</h2>
            <form id="scheduleAppointmentForm">
                <label for="appointmentDate">Date:</label>
                <input type="date" id="appointmentDate" name="appointmentDate" required>

                <label for="appointmentTime">Time:</label>
                <input type="time" id="appointmentTime" name="appointmentTime" required>

                <button type="submit">Schedule</button>
            </form>
        </div>
    </div>

    <footer>
        <p>Contact us: 123-456-7890 | lab@example.com</p>
    </footer>

    <script src="patient.js"></script>
</body>
</html>
