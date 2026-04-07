const AppConfig = {
    brandName: "Agunechemba Digital Marketing Tools",
    services: [
        { name: "Home", url: "https://agunechemba.github.io", icon: "" },
        { name: "WhatsApp Sender", url: "index.html", icon: "" },
        { name: "Email Sender", url: "email.html", icon: "" }
    ],
    renderFooter: function() {
        const footer = document.createElement('footer');
        footer.className = 'main-footer';
        
        // This variable automatically gets the current year (2026, 2027, etc.)
        const currentYear = new Date().getFullYear();
        
        let navHtml = `
            <div class="footer-content">
                <p class="footer-title">Switch Service</p>
                <div class="footer-links">`;
        
        this.services.forEach(service => {
            const isCurrent = window.location.pathname.includes(service.url) || 
                             (window.location.pathname === '/' && service.url === 'index.html');
            
            navHtml += `<a href="${service.url}" class="footer-item ${isCurrent ? 'active-link' : ''}">
                            ${service.icon} ${service.name}
                        </a>`;
        });

        // The ${currentYear} variable handles the auto-increment
        navHtml += `
                </div>
                <p class="copyright">© ${currentYear} ${this.brandName}</p>
            </div>`;
            
        footer.innerHTML = navHtml;
        document.body.appendChild(footer);
    }
};

document.addEventListener('DOMContentLoaded', () => AppConfig.renderFooter());