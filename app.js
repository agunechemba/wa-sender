const IS_EMAIL = window.location.pathname.includes('email.html');
const KEYS = {
    data: IS_EMAIL ? 'PRO_EMAIL_DATA' : 'PRO_WA_DATA',
    msg: IS_EMAIL ? 'PRO_EMAIL_MSG' : 'PRO_WA_MSG',
    sub: 'PRO_EMAIL_SUB',
    sent: IS_EMAIL ? 'PRO_EMAIL_SENT' : 'PRO_WA_SENT'
};

const PLACEHOLDERS = ['name', 'phone', 'email', 'address', 'company', 'interest', 'date', 'other'];

window.onload = () => {
    const data = localStorage.getItem(KEYS.data);
    const msg = localStorage.getItem(KEYS.msg);
    if (msg) document.getElementById('messageBox').value = msg;
    if (IS_EMAIL) {
        const sub = localStorage.getItem(KEYS.sub);
        if (sub) document.getElementById('subjectBox').value = sub;
    }
    if (data) renderTable(JSON.parse(data));
};

function processData() {
    const file = document.getElementById('csvFile').files[0];
    const msg = document.getElementById('messageBox').value;
    const sub = IS_EMAIL ? document.getElementById('subjectBox').value : '';

    if (!file && !localStorage.getItem(KEYS.data)) return alert("Please upload a CSV file.");

    if (file) {
        Papa.parse(file, {
            header: true, skipEmptyLines: true,
            complete: (results) => saveAndExecute(results.data, msg, sub)
        });
    } else {
        saveAndExecute(JSON.parse(localStorage.getItem(KEYS.data)), msg, sub);
    }
}

function saveAndExecute(data, msg, sub) {
    localStorage.setItem(KEYS.data, JSON.stringify(data));
    localStorage.setItem(KEYS.msg, msg);
    if (IS_EMAIL) localStorage.setItem(KEYS.sub, sub);
    renderTable(data);
}

// This function is the "Engine" that makes all 8 placeholders work
function replacePlaceholders(template, row) {
    let text = template;
    const supported = ['name', 'phone', 'email', 'address', 'company', 'interest', 'date', 'other'];
    
    supported.forEach(key => {
        // Look for the column in the CSV (case-insensitive)
        const csvHeader = Object.keys(row).find(h => h.toLowerCase() === key);
        const value = csvHeader ? row[csvHeader] : `[no ${key}]`;
        
        // Globally replace @key with the CSV value
        const regex = new RegExp(`@${key}`, 'g');
        text = text.replace(regex, value);
    });
    return text;
}

// Inside your renderTable function, simply call it:
// const finalMsg = replacePlaceholders(msgTpl, row);
// const finalSub = IS_EMAIL ? replacePlaceholders(subTpl, row) : '';

function renderTable(data) {
    const container = document.getElementById('contactList');
    const msgTpl = document.getElementById('messageBox').value;
    const subTpl = IS_EMAIL ? document.getElementById('subjectBox').value : '';
    const sent = JSON.parse(localStorage.getItem(KEYS.sent) || "[]");
    
    container.innerHTML = `<h3 style="margin: 20px 0; font-size: 1rem; color: #666;">Generated List (${data.length})</h3>`;

    data.forEach((row, i) => {
        const email = row.Email || row.email || "";
        const phone = row.Phone || row.phone || "";
        if ((IS_EMAIL && !email) || (!IS_EMAIL && !phone)) return;

        const finalMsg = replacePlaceholders(msgTpl, row);
        const finalSub = IS_EMAIL ? replacePlaceholders(subTpl, row) : '';

        let link = IS_EMAIL 
            ? `mailto:${email}?subject=${encodeURIComponent(finalSub)}&body=${encodeURIComponent(finalMsg)}`
            : `https://api.whatsapp.com/send?phone=${phone.replace(/\D/g, '')}&text=${encodeURIComponent(finalMsg)}`;

        const card = document.createElement('div');
        card.className = 'contact-item';
        card.innerHTML = `
            <div>
                <div class="contact-name">${row.Name || row.name || 'User'}</div>
                <div style="font-size: 0.8rem; color: #888;">${IS_EMAIL ? email : phone}</div>
            </div>
            <a href="${link}" target="_blank" class="send-link ${sent.includes(i) ? 'opened' : ''}" onclick="markSent(${i})">
                ${sent.includes(i) ? 'Completed ✓' : 'Send'}
            </a>`;
        container.appendChild(card);
    });
}

function markSent(i) {
    let sent = JSON.parse(localStorage.getItem(KEYS.sent) || "[]");
    if (!sent.includes(i)) {
        sent.push(i);
        localStorage.setItem(KEYS.sent, JSON.stringify(sent));
        setTimeout(() => processData(), 300);
    }
}

function resetApp() {
    if(confirm("Reset all data?")) {
        localStorage.clear();
        location.reload();
    }
}