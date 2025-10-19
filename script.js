// Xử lý sự kiện click button

document.getElementById('clickBtn').addEventListener('click', function() {

    alert('Xin chào! Website đang hoạt động!');

});

// Smooth scroll cho navigation

document.querySelectorAll('nav a').forEach(anchor => {

    anchor.addEventListener('click', function(e) {

        e.preventDefault();

        const targetId = this.getAttribute('href');

        document.querySelector(targetId).scrollIntoView({

            behavior: 'smooth'

        });

    });

});