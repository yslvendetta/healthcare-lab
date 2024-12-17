<?php
require '../vendor/autoload.php'; // Include MongoDB library
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// JWT secret key
define('JWT_SECRET_KEY', 'your-secret-key');

// Set response content type to JSON
header("Content-Type: application/json");

try {
    // Retrieve the Authorization header
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        echo json_encode(["success" => false, "message" => "No token provided"]);
        exit();
    }

    // Extract and decode the JWT token
    $token = str_replace('Bearer ', '', $headers['Authorization']);
    $decoded = JWT::decode($token, new Key(JWT_SECRET_KEY, 'HS256'));
    $userEmail = $decoded->contactEmail; // Extract the email from the token payload

    // Connect to MongoDB
    $client = new MongoDB\Client("mongodb://localhost:27017");
    $db = $client->lab_management; // Replace with your database name
    $collection = $db->users; // Replace with your collection name

    // Fetch the user profile based on the email
    $user = $collection->findOne(["contactEmail" => $userEmail]);

    if ($user) {
        // Format response data (exclude sensitive fields like password)
        $profile = [
            "firstName" => $user['firstName'],
            "lastName" => $user['lastName'],
            "email" => $user['contactEmail'],
            "phone" => $user['contactPhone'],
            "gender" => $user['gender'] ?? null, // Include additional fields if they exist
            "dateOfBirth" => $user['dateOfBirth'] ?? null
        ];

        echo json_encode(["success" => true, "profile" => $profile]);
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
?>

