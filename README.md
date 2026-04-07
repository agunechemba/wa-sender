# 🚀 Universal Bulk Sender (WhatsApp & Email)

A professional, lightweight, and privacy-focused web suite designed for personalized outreach. This project allows users to send bulk messages via **WhatsApp** or **Email** using data from a simple CSV spreadsheet, all without a backend server or expensive API subscriptions.

## ✨ Features
* **Dual-Service Suite:** Seamlessly switch between a WhatsApp Sender and an Email Sender via a centralized configuration.
* **Smart Personalization:** Supports 8 dynamic placeholders: `@name`, `@phone`, `@email`, `@address`, `@company`, `@interest`, `@date`, and `@other`.
* **Privacy-First Architecture:** Your data never leaves your browser. CSV files are parsed locally, and no information is ever uploaded to an external server.
* **Persistent Progress:** Uses `LocalStorage` to save your message templates, subjects, and "Sent" status across browser refreshes.
* **Mobile-Optimized UI:** A clean, responsive dashboard designed for professional use on both desktop and smartphones.
* **Zero-Cost Hosting:** Fully compatible with GitHub Pages.

---

## 🛠️ Technical Stack
* **Core:** Vanilla JavaScript (ES6+), HTML5, CSS3.
* **Library:** [PapaParse](https://www.papaparse.com/) for lightning-fast, client-side CSV parsing.
* **Config-Driven:** Centralized `config.js` for easy navigation and branding management.
* **Storage:** Browser `LocalStorage` API for data persistence.

---

## 🚀 Getting Started

### 1. Prepare your Spreadsheet
Create a CSV file (using Excel, Google Sheets, or Notepad) with headers matching your needs.
**Example Headers:** `Name`, `Phone`, `Email`, `Company`, `Interest`, `Date`

> **Note for WhatsApp:** Ensure the `Phone` column includes the country code without the `+` sign (e.g., `23480...`).

### 2. Usage Instructions
1.  **Select Service:** Use the footer navigation to choose between WhatsApp or Email.
2.  **Upload Data:** Select your `.csv` file.
3.  **Draft Template:** Write your message using placeholders (e.g., *"Hi @name, how is the team at @company?"*).
4.  **Generate:** Click the **Generate** button to create a personalized list.
5.  **Execute:** Click **Send** (WhatsApp) or **Draft** (Email) to launch the respective application with pre-filled data.

---

## 📂 Project Structure
* `index.html`: The primary WhatsApp Sender interface.
* `email.html`: The specialized Email Sender interface.
* `app.js`: The "Engine" containing the universal placeholder logic and state management.
* `styles.css`: The professional, mobile-friendly design system.
* `config.js`: The global controller for navigation, branding, and the auto-updating footer.

---

## ⚠️ Best Practices
* **Anti-Spam:** Only send messages to individuals who have consented to receive them.
* **Pacing:** When sending via WhatsApp, avoid sending too many messages in a single minute to stay within platform guidelines.
* **Verification:** Always test the first generated link in your list to ensure your placeholders are mapping correctly to your CSV headers.

---

## 📄 License & Attribution
This project is open-source and free to use. 
Developed and maintained by **Agunechemba Digital Tools**.
