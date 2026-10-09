<?php
/**
 * PHPMailer configuration.
 *
 * Copy config.example.php to config.php and fill in your SMTP credentials.
 * These can also be overridden with environment variables (SMTP_HOST, etc.).
 */

return [
    // SMTP server
    'smtp_host' => getenv('SMTP_HOST') ?: 'smtp.gmail.com',
    'smtp_port' => (int) (getenv('SMTP_PORT') ?: 587),
    'smtp_user' => getenv('SMTP_USER') ?: '',
    'smtp_pass' => getenv('SMTP_PASS') ?: '',
    'smtp_secure' => getenv('SMTP_SECURE') ?: 'tls',

    // From address (use an address authorized on your SMTP server)
    'from_email' => getenv('MAIL_FROM_EMAIL') ?: 'no-reply@agcareghana.org',
    'from_name' => getenv('MAIL_FROM_NAME') ?: 'AG Care Ghana Website',

    // Where contact messages are delivered
    'to_email' => getenv('MAIL_TO_EMAIL') ?: 'info@agcareghana.org',

    // CORS: the Next.js app origin. Use * to allow any.
    'allowed_origin' => getenv('MAILER_ALLOWED_ORIGIN') ?: '*',
];
