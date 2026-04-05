// 1. On Page Load: Check for saved data
window.onload = function() {
    const savedData = localStorage.getItem('wa_bulk_data');
    const savedMsg = localStorage.getItem('wa_template');
    
    if (savedMsg) {
        document.getElementById('messageBox').value = savedMsg;
    }

    if (savedData) {
        renderTable(JSON.parse(savedData));
    }
};

function processContacts() {
    const fileInput = document.getElementById('csvFile').files[0];
    const messageTemplate = document.getElementById('messageBox').value;

    if (!fileInput) {
        // If no file but we have saved data, just update the message
        const savedData = localStorage.getItem('wa_bulk_data');
        if (savedData) {
            saveAndRender(JSON.parse(savedData), messageTemplate);
            return;
        }
        alert("Please upload a CSV file.");
        return;
    }

    Papa.parse(fileInput, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            saveAndRender(results.data, messageTemplate);
        }
    });
}

function saveAndRender(data, template) {
    // Save to LocalStorage
    localStorage.setItem('wa_bulk_data', JSON.stringify(data));
    localStorage.setItem('wa_template', template);
    renderTable(data);
}

function renderTable(data) {
    const listContainer = document.getElementById('contactList');
    const messageTemplate = document.getElementById('messageBox').value;
    const sentList = JSON.parse(localStorage.getItem('wa_sent_indices') || "[]");
    
    listContainer.innerHTML = ''; 

    data.forEach((row, index) => {
        const name = row.Name || row.name || "Customer";
        const phone = row.Phone || row.phone || "";
        const email = row.Email || row.email || "N/A";
        const address = row.Address || row.address || "N/A";

        if (!phone) return;

        let cleanPhone = phone.replace(/\D/g, '');
        let personalizedMsg = messageTemplate
            .replace(/@name/g, name)
            .replace(/@phone/g, cleanPhone)
            .replace(/@email/g, email)
            .replace(/@address/g, address);

        const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(personalizedMsg)}`;
        
        // Check if this specific index was already sent
        const isSent = sentList.includes(index);

        const item = document.createElement('div');
        item.className = 'contact-item';
        item.innerHTML = `
            <div class="contact-info">
                <span class="contact-name">${name}</span>
                <span class="contact-phone">${phone}</span>
            </div>
            <a href="${waUrl}" target="_blank" 
               class="send-link ${isSent ? 'opened' : ''}" 
               onclick="markOpened(this, ${index})">
                ${isSent ? 'Opened ✓' : 'Send'}
            </a>
        `;
        listContainer.appendChild(item);
    });
}

function markOpened(el, index) {
    el.innerText = "Opened ✓";
    el.classList.add("opened");
    
    // Save the "Sent" status for this specific index
    let sentList = JSON.parse(localStorage.getItem('wa_sent_indices') || "[]");
    if (!sentList.includes(index)) {
        sentList.push(index);
        localStorage.setItem('wa_sent_indices', JSON.stringify(sentList));
    }
}

function clearData() {
    if (confirm("Clear all loaded contacts and progress?")) {
        localStorage.clear();
        location.reload();
    }
}