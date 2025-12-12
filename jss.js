/* ===== matrix background ===== */
(function() {
    const canvas = document.getElementById('matrix');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const fontSize = 16;
    let columns = Math.floor(w / fontSize);
    let drops = new Array(columns).fill(0);
    const chars = 'アィウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$%&*()<>?/|{}[]';
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        columns = Math.floor(w / fontSize);
        drops = new Array(columns).fill(0);
    }
    window.addEventListener('resize', resize);
    function draw() {
        // fade old
        ctx.fillStyle = 'rgba(0,0,0,0.06)';
        ctx.fillRect(0, 0, w, h);
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            // brighter head sometimes
            ctx.fillStyle = (Math.random() > 0.92) ? 'rgba(180,255,200,0.95)' : 'rgba(0,255,136,0.7)';
            ctx.fillText(text, x, y);
            if (y > h && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    // smooth animation
    setInterval(draw, 45);
})();
/* ===== typing effect for hero ===== */
(function() {
    const el = document.getElementById('typingText');
    if (!el) return;
    const text = "Men Mamarajab Musulmonov — dasturchi va kiberxavfsizlik mutaxassisi. Tizimlarni tahlil qilish, himoya qilish va ishonchli yechimlar yaratish bilan shug'ullanaman.";
    let i = 0;
    function step() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(step, 40);
        }
    }
    // delay so hero renders first
    setTimeout(step, 600);
})();
/* ===== burger (mobil menyu) ===== */
(function() {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    if (!burger || !navLinks) return;
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    // close on nav click (smooth scroll)
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }
            navLinks.classList.remove('active');
        });
    });
})();
/* ===== contact form handler (EmailJS integratsiyasi) ===== */
// DIQQAT: EmailJS ishlatish uchun https://www.emailjs.com/ da ro'yxatdan o'ting va quyidagi ID larni o'zingiznikiga almashtiring.
// Public Key: 'YOUR_PUBLIC_KEY'
// Service ID: 'YOUR_SERVICE_ID'
// Template ID: 'YOUR_TEMPLATE_ID'
(function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // EmailJS ni ishga tushirish
    emailjs.init('YOUR_PUBLIC_KEY'); // Bu yerni o'zingizning public key bilan almashtiring

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name || !email || !subject || !message) {
            alert('Iltimos, barcha maydonlarni to‘ldiring.');
            return;
        }

        // EmailJS orqali yuborish
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        }).then(function(response) {
            alert('Xabaringiz muvaffaqiyatli yuborildi! Tez orada bog‘lanaman.');
            form.reset();
        }, function(error) {
            alert('Xatolik yuz berdi: ' + JSON.stringify(error));
        });
    });
})();
