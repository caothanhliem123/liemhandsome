// ===== CẤU HÌNH LINK =====
const CONFIG = {
    links: {
        facebook: 'https://www.facebook.com/HandsomeLiem',
        discord: 'https://discord.gg/9A783qQrbQ',
        discordId: 'liemcao0602'
    },
    messages: {
        copySuccess: '✅ Đã copy ID Discord: ',
        copyError: '❌ Lỗi khi copy, vui lòng thử lại',
        redirecting: '🔄 Đang chuyển hướng...'
    }
};

// ===== BIẾN TOÀN CỤC =====
const hamburgerMenu = document.getElementById('hamburgerMenu');
const menuItems = document.getElementById('menuItems');
const closeBtn = document.getElementById('closeBtn');

// ===== HÀM XỬ LÝ LINK =====
class LinkHandler {
    // Mở link mạng xã hội
    static openSocialLink(type) {
        switch(type) {
            case 'facebook':
                this.openNewTab(CONFIG.links.facebook);
                break;
            case 'discord':
                this.openNewTab(CONFIG.links.discord);
                break;
            default:
                console.warn('Unknown link type:', type);
        }
    }

    // Copy ID Discord
    static async copyDiscordId() {
        try {
            await navigator.clipboard.writeText(CONFIG.links.discordId);
            this.showNotification(CONFIG.messages.copySuccess + CONFIG.links.discordId, 'success');
        } catch (err) {
            // Fallback cho trình duyệt cũ
            this.fallbackCopyText(CONFIG.links.discordId);
        }
    }

    // Mở tab mới
    static openNewTab(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    // Copy text fallback
    static fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification(CONFIG.messages.copySuccess + text, 'success');
        } catch (err) {
            this.showNotification(CONFIG.messages.copyError, 'error');
        }
        
        document.body.removeChild(textArea);
    }

    // Hiển thị thông báo
    static showNotification(message, type = 'info') {
        // Tạo thông báo
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Tự động xóa sau 3s
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// ===== HÀM XỬ LÝ MENU =====
class MenuHandler {
    // Mở menu
    static openMenu() {
        menuItems.classList.add('active');
        hamburgerMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Đóng menu
    static closeMenu() {
        menuItems.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Chuyển đến section
    static scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Highlight section
            this.highlightSection(section);
        }
    }

    // Highlight section
    static highlightSection(section) {
        section.style.transition = 'background-color 0.5s ease';
        section.style.backgroundColor = '#ffffcc';
        
        setTimeout(() => {
            section.style.backgroundColor = '';
        }, 2000);
    }
}

// ===== HÀM XỬ LÝ SCROLL ANIMATION =====
class ScrollHandler {
    static init() {
        this.checkVisibility();
        window.addEventListener('scroll', () => this.checkVisibility());
    }

    static checkVisibility() {
        const sections = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight - 100) {
                section.classList.add('visible');
            }
        });
    }
}

// ===== EVENT LISTENERS =====
// Menu events
hamburgerMenu.addEventListener('click', () => MenuHandler.openMenu());
closeBtn.addEventListener('click', () => MenuHandler.closeMenu());

// Đóng menu khi click outside
document.addEventListener('click', (event) => {
    const isClickInsideMenu = menuItems.contains(event.target);
    const isClickOnHamburger = hamburgerMenu.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnHamburger) {
        MenuHandler.closeMenu();
    }
});

// Xử lý click menu links
document.addEventListener('click', (event) => {
    const target = event.target;
    
    // Menu navigation links
    if (target.classList.contains('menu-link')) {
        event.preventDefault();
        const sectionId = target.getAttribute('href').substring(1);
        MenuHandler.closeMenu();
        setTimeout(() => MenuHandler.scrollToSection(sectionId), 300);
    }
    
    // Social links trong menu
    if (target.classList.contains('social-link')) {
        event.preventDefault();
        const type = target.getAttribute('data-type');
        LinkHandler.openSocialLink(type);
        MenuHandler.closeMenu();
    }
    
    // Copy button trong menu
    if (target.classList.contains('copy-btn')) {
        event.preventDefault();
        LinkHandler.copyDiscordId();
        MenuHandler.closeMenu();
    }
    
    // Contact buttons trong content
    if (target.classList.contains('contact-btn')) {
        const type = target.getAttribute('data-type');
        if (type === 'copyId') {
            LinkHandler.copyDiscordId();
        } else {
            LinkHandler.openSocialLink(type);
        }
    }
});

// Đóng menu bằng phím ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        MenuHandler.closeMenu();
    }
});

// ===== KHỞI CHẠY =====
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo scroll animation
    ScrollHandler.init();
    
    // Thêm CSS animation cho notification
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🚀 Website đã được khởi chạy!');
});
// Các code JavaScript cũ của bạn ở đây

// 🔽 THÊM CODE NÀY VÀO CUỐI FILE JAVASCRIPT 🔽

// 🔽 THÊM CODE NÀY VÀO CUỐI FILE JAVASCRIPT 🔽

let currentScale = 1; // Tỷ lệ zoom hiện tại

// Hàm zoom PDF
function zoomPDF(scaleFactor) {
    const pdfFrame = document.querySelector('.pdf-frame');
    const zoomLevel = document.querySelector('.zoom-level');
    
    if (pdfFrame && zoomLevel) {
        // Cập nhật tỷ lệ zoom
        currentScale *= scaleFactor;
        
        // Giới hạn zoom (0.3 đến 5 lần)
        currentScale = Math.max(0.3, Math.min(5, currentScale));
        
        // Áp dụng zoom
        pdfFrame.style.transform = `scale(${currentScale})`;
        pdfFrame.style.width = `${100 / currentScale}%`;
        pdfFrame.style.height = `${100 / currentScale}%`;
        
        // Cập nhật hiển thị zoom level
        zoomLevel.textContent = `Zoom: ${Math.round(currentScale * 100)}%`;
        
        console.log(`Zoom: ${Math.round(currentScale * 100)}%`);
    }
}

// Hàm reset zoom
function resetZoom() {
    const pdfFrame = document.querySelector('.pdf-frame');
    const zoomLevel = document.querySelector('.zoom-level');
    
    if (pdfFrame && zoomLevel) {
        currentScale = 1;
        pdfFrame.style.transform = 'scale(1)';
        pdfFrame.style.width = '100%';
        pdfFrame.style.height = '100%';
        zoomLevel.textContent = 'Zoom: 100%';
        
        showNotification('Đã reset zoom về 100%', 'success');
    }
}

// Hàm xử lý PDF Viewer
function initPDFViewer() {
    const pdfWrapper = document.querySelector('.pdf-scroll-wrapper');
    const pdfFrame = document.querySelector('.pdf-frame');
    
    if (pdfFrame) {
        pdfFrame.onload = function() {
            console.log('PDF đã tải xong - Sẵn sàng zoom');
            
            // Reset zoom khi PDF load
            resetZoom();
        };
    }
    
    // Thêm sự kiện scroll bằng mouse wheel để zoom (tùy chọn)
    if (pdfWrapper) {
        pdfWrapper.addEventListener('wheel', function(e) {
            if (e.ctrlKey) { // Giữ Ctrl + scroll để zoom
                e.preventDefault();
                if (e.deltaY < 0) {
                    zoomPDF(1.1); // Scroll up -> zoom in
                } else {
                    zoomPDF(0.9); // Scroll down -> zoom out
                }
            }
        });
    }
}

// Thêm phím tắt zoom
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && !e.shiftKey) {
        if (e.key === '=' || e.key === '+') {
            e.preventDefault();
            zoomPDF(1.2);
        } else if (e.key === '-') {
            e.preventDefault();
            zoomPDF(0.8);
        } else if (e.key === '0') {
            e.preventDefault();
            resetZoom();
        }
    }
});

// Gọi hàm khi trang load
document.addEventListener('DOMContentLoaded', function() {
    initPDFViewer();
});
