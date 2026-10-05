# Contact Mailer (PHPMailer)

PHP endpoint that the Next.js contact API calls to deliver contact-form emails.
Every submission is also logged to the `contact_messages` table by the Next.js
API, so email delivery is best-effort and never loses data.

## Setup

1. Install dependencies (requires [Composer](https://getcomposer.org)):

   ```bash
   cd mailer
   composer install
   ```

2. Configure SMTP credentials. Either:
   - Copy `config.example.php` to `config.php` and edit it, **or**
   - Set environment variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
     `SMTP_PASS`, `SMTP_SECURE`, `MAIL_FROM_EMAIL`, `MAIL_FROM_NAME`,
     `MAIL_TO_EMAIL`, `MAILER_ALLOWED_ORIGIN`.

3. Make the endpoint reachable. With XAMPP this folder is already under
   `htdocs/agcare/mailer`, so the endpoint is:

   ```
   http://localhost/agcare/mailer/send.php
   ```

4. Set `MAILER_URL` in the Next.js `.env` to that URL (see `.env.example`).

## Gmail note

For Gmail, enable 2FA and create an **App Password** — regular account passwords
won't work over SMTP.

## Testing

```bash
curl -X POST http://localhost/agcare/mailer/send.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"hi","message":"hello"}'
```
