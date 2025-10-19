<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu Hamburger</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar">
        <div class="logo">Logo</div>
        <div class="hamburger-menu" id="hamburgerMenu">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>

    <!-- Menu Items -->
    <div class="menu-items" id="menuItems">
        <button class="close-btn" id="closeBtn">&times;</button>
        <a href="#trangchu" class="menu-link">🏠 Trang chủ</a>
        <a href="#gioithieu" class="menu-link">ℹ️ Giới thiệu</a>
        <a href="#lienhe" class="menu-link">📞 Liên hệ</a>
        
        <!-- Phần kết nối mạng xã hội -->
        <div class="social-section">
            <div class="social-divider"></div>
            <h3 class="social-title">Kết nối với tôi</h3>
            <a href="#" class="social-link" data-type="facebook">📘 Facebook</a>
            <a href="#" class="social-link" data-type="discord">🎮 Discord Server</a>
            <div class="discord-info">
                <p>ID Discord: <strong>liemcao0602</strong></p>
                <button class="copy-btn" data-type="copyId">📋 Copy ID</button>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="content">
        <section id="trangchu">
            <h1>Trang Chủ</h1>
            <p>Chào mừng đến với website của Liêm!</p>
        </section>

        <section id="gioithieu">
            <h1>Giới Thiệu</h1>
            <p>Thông tin về tôi :
Là 1 thằng ất ơ đẹp trai nhất Việt Nam
Với quả thành tích học tập luôn đội sổ :))</p>
        </section>

        <section id="lienhe">
            <h1>Liên Hệ</h1>
            <div class="contact-links">
                <button class="contact-btn" data-type="facebook">📘 Facebook</button>
                <button class="contact-btn" data-type="discord">🎮 Discord Server</button>
                <button class="contact-btn" data-type="copyId">📋 Copy Discord ID</button>
            </div>
        </section>
<!-- Thêm vào CUỐI phần content, sau section liên hệ -->
<section id="pdf-viewer">
    <h1>📄 Tài liệu PDF</h1>
    
    <!-- Controls zoom -->
    <div class="pdf-controls">
        <button onclick="zoomPDF(1.2)" class="pdf-control-btn">🔍 Zoom In</button>
        <button onclick="zoomPDF(0.8)" class="pdf-control-btn">🔍 Zoom Out</button>
        <button onclick="resetZoom()" class="pdf-control-btn">🔄 Reset</button>
        <span class="zoom-level">Zoom: 100%</span>
    </div>
    
    <div class="pdf-container">
        <div class="pdf-scroll-wrapper">
            <iframe src="Ve3maucasio580vnx.pdf" 
                    width="100%" 
                    height="100%"
                    frameborder="0"
                    class="pdf-frame">
            </iframe>
        </div>
    </div>
    
    <div class="pdf-download">
        <a href="Ve3maucasio580vnx.pdf" download class="download-btn">📥 Tải PDF về máy</a>
    </div>
</section>
    </div>

    <script src="script.js"></script>
</body>
</html>
