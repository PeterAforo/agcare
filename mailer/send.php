<?php
/**
 * Contact form mailer using PHPMailer.
 *
 * Receives a JSON POST { name, email, subject, message } from the Next.js
 * contact API, sends a notification email via SMTP, and returns JSON.
 *
 * Setup:
 *   1. cd mailer && composer install
 *   2. Copy config.example.php to config.php and fill in SMTP credentials
 *   3. Serve this folder via XAMPP Apache (e.g. http://localhost/agcare/mailer/send.php)
 *      or call directly. The Next.js app POSTs to MAILER_URL from .env.
 *
 * Security: only accepts POST, validates input, sets CORS for the Next.js origin.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$autoload = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoload)) {
    http_response_code(503);
    echo json_encode(['error' => 'PHPMailer not installed. Run "composer install" in the mailer directory.']);
    exit;
}
require $autoload;

if (!file_exists(__DIR__ . '/config.php')) {
    http_response_code(503);
    echo json_encode(['error' => 'Mailer not configured. Copy config.example.php to config.php.']);
    exit;
}
$config = require __DIR__ . '/config.php';

$allowedOrigin = $config['allowed_origin'] ?? '*';
header('Access-Control-Allow-Origin: ' . $allowedOrigin);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit;
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = $config['smtp_host'];
    $mail->Port = (int) $config['smtp_port'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['smtp_user'];
    $mail->Password = $config['smtp_pass'];
    $mail->SMTPSecure = $config['smtp_secure'] ?? PHPMailer::ENCRYPTION_STARTTLS;

    // Recipients
    $mail->setFrom($config['from_email'], $config['from_name'] ?? $name);
    $mail->addAddress($config['to_email']);
    $mail->addReplyTo($email, $name);

    // Content
    $mail->Subject = '[Contact] ' . $subject;
    $mail->isHTML(true);
    $mail->Body = sprintf(
        "<h3>New contact message</h3>" .
        "<p><strong>Name:</strong> %s</p>" .
        "<p><strong>Email:</strong> %s</p>" .
        "<p><strong>Subject:</strong> %s</p>" .
        "<p><strong>Message:</strong></p><p>%s</p>",
        htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
        htmlspecialchars($email, ENT_QUOTES, 'UTF-8'),
        htmlspecialchars($subject, ENT_QUOTES, 'UTF-8'),
        nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'))
    );
    $mail->AltBody = "Name: {$name}\nEmail: {$email}\nSubject: {$subject}\n\n{$message}";

    $mail->send();

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Mailer error', 'detail' => $mail->ErrorInfo]);
}
