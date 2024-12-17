<?php
session_start();
require '../vendor/autoload.php'; // Include MongoDB library

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

// JWT secret key (store this securely in your environment config)
define('JWT_SECRET_KEY', 'your_secret_key_here');


// Connect to MongoDB
try {
    $client = new MongoDB\Client("mongodb://localhost:27017");
    $db = $client->lab_management; // Replace with your database name
    $collection = $db->users; // Replace with your collection name
} catch (Exception $e) {
    die(json_encode(["message" => "Error connecting to MongoDB: " . $e->getMessage()]));
}


// Get the raw POST data
$inputData = json_decode(file_get_contents('php://input'), true);

// Validate input data
if (empty($inputData['firstName']) || empty($inputData['lastName']) || empty($inputData['contactEmail']) || empty($inputData['password']) || empty($inputData['role'])) {
    echo json_encode(["message" => "Missing required fields"]);
    exit();
}

// Extract user data from the received JSON
$firstName = htmlspecialchars($inputData['firstName']);
$lastName = htmlspecialchars($inputData['lastName']);
$dateOfBirth = htmlspecialchars($inputData['dateOfBirth']);
$gender = htmlspecialchars($inputData['gender']);
$contactPhone = htmlspecialchars($inputData['contactPhone']);
$contactEmail = htmlspecialchars($inputData['contactEmail']);
$password = password_hash($inputData['password'], PASSWORD_BCRYPT); // Hash the password for security
$role = htmlspecialchars($inputData['role']);

// Validate email format
if (!filter_var($contactEmail, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["message" => "Invalid email format"]);
    exit();
}

// Check if the user already exists
$existingUser = $collection->findOne(["contactEmail" => $contactEmail]);
if ($existingUser) {
    echo json_encode(["message" => "User with this email already exists."]);
    exit();
}

// Prepare the user data
$userData = [
    "firstName" => $firstName,
    "lastName" => $lastName,
    "dateOfBirth" => $dateOfBirth,
    "gender" => $gender,
    "contactPhone" => $contactPhone,
    "contactEmail" => $contactEmail,
    "password" => $password,
    "role" => $role,
    "created_at" => new MongoDB\BSON\UTCDateTime() // Store the current timestamp
];

// Insert data into MongoDB
try {
    $result = $collection->insertOne($userData);

// Generate a JWT token
if ($insertResult->getInsertedCount() > 0) {
    $userId = $insertResult->getInsertedId();
    $secretKey = 'your-secret-key'; // Replace with your secret key
    $payload = [
        'user_id' => (string) $userId,
        'iat' => time(),
        'exp' => time() + 3600, // Token expires in 1 hour
    ];
    }

    // Encode the token
    $token = JWT::encode($payload, $secretKey, 'HS256');

    // Send successful registration response with token and role
    echo json_encode([
        "success" => true, 
        "role" => $role, 
        "token" => $token, 
        "message" => "User registered successfully"
    ]);
} catch (Exception $e) {
    error_log("Registration error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "Error registering user"]);
}
?>
