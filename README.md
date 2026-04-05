# 📱 Personalized WhatsApp Bulk Sender (Manual)

A lightweight, privacy-focused web application that allows you to send personalized WhatsApp messages to a list of contacts uploaded via a CSV spreadsheet. This tool uses the **WhatsApp Click-to-Chat API**, meaning it works natively on both mobile and desktop without requiring a paid WhatsApp Business API account.

## ✨ Features
* **Zero Backend:** No server, no database, and no API keys required. It runs entirely in your browser.
* **Smart Personalization:** Use placeholders like `@name`, `@phone`, `@email`, and `@address` to customize every message.
* **Local Persistence:** Uses `LocalStorage` to save your progress. If you refresh the page or close the tab, your contacts and "Sent" status remain intact.
* **Mobile Optimized:** A clean, responsive UI designed for easy tapping on smartphones.
* **Privacy First:** Your contact list never leaves your device. Data is processed locally and is never uploaded to an external server.

---

## 🚀 How to Use

### 1. Prepare your Spreadsheet
Create a CSV file (e.g., in Excel or Google Sheets) with the following headers:
| Name | Phone | Email | Address |
| :--- | :--- | :--- | :--- |
| John Doe | 2348012345678 | john@example.com | Lagos, Nigeria |

> **Note:** Phone numbers **must** include the country code without the `+` sign or leading zeros.

### 2. Set Up the App
1.  Download the `index.html` and `app.js` files into the same folder.
2.  Open `index.html` in any modern web browser (Chrome, Safari, Firefox).

### 3. Send Messages
1.  **Upload:** Select your CSV file.
2.  **Draft:** Type your message in the text area using placeholders (e.g., *"Hi @name, we are delivering to @address today!"*).
3.  **Generate:** Click **Generate Personalized List**.
4.  **Send:** Click the **Send** button next to each contact. It will open WhatsApp with the message pre-filled. Simply hit "Send" in WhatsApp and return to the browser.

---

## 🛠️ Technical Stack
* **HTML5 & CSS3:** For the responsive, mobile-first interface.
* **Vanilla JavaScript:** For logic and DOM manipulation.
* **[PapaParse](https://www.papaparse.com/):** A powerful library used to parse CSV files directly in the browser.
* **LocalStorage API:** To ensure data persistence across browser refreshes.

---

## ⚠️ Safety & Best Practices
WhatsApp has strict anti-spam policies. To protect your phone number from being banned:
* **Permission:** Only send messages to people who have consented to receive them.
* **Pacing:** Do not send hundreds of messages in a very short window. Aim for 20-30 messages per session, then take a break.
* **Variety:** Use the `@name` placeholder to make each message unique; identical bulk messages are more likely to be flagged by automated systems.

---

## 📄 License
This project is open-source. Feel free to modify and adapt it for your own personal or business use.

---

### Pro-Tip for Mobile
To use this easily on your smartphone, you can host these files for free using **GitHub Pages** or **Netlify**. Simply upload the folder, open the link on your mobile browser, and you can send messages on the go!