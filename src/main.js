// Глобальный файл скриптов
document.addEventListener('DOMContentLoaded', () => {
    console.log("bynix-scope.org: Скрипты загружены.");

    // =======================================================
    // 1. Mobile Menu Logic (Изменений нет)
    // =======================================================
    const menuToggle = document.querySelector('.header__toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const menuCloseButton = document.querySelector('.mobile-menu__close');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    const openMenu = () => {
        mobileMenu.classList.add('mobile-menu--open');
        mobileOverlay.classList.add('mobile-menu-overlay--visible');
        document.body.style.overflow = 'hidden'; 
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('mobile-menu--open');
        mobileOverlay.classList.remove('mobile-menu-overlay--visible');
        document.body.style.overflow = ''; 
    };

    menuToggle.addEventListener('click', openMenu);
    menuCloseButton.addEventListener('click', closeMenu);
    mobileOverlay.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--open')) {
            closeMenu();
        }
    });

    // =======================================================
    // 2. Hero Section Animation (GSAP + SplitType) (Изменений нет)
    // =======================================================
    if (typeof gsap !== 'undefined' && typeof SplitType !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero Title Animation
        const heroTitle = new SplitType('.hero__title', { types: 'words' });

        gsap.from(heroTitle.words, {
            y: 50,
            opacity: 0,
            rotationX: -90,
            stagger: 0.05, 
            duration: 1.2,
            ease: "power3.out",
            delay: 0.5,
            onComplete: () => {
                heroTitle.revert();
            }
        });

        // Other elements
        gsap.from('.hero__subtitle', { y: 20, opacity: 0, duration: 1, delay: 1.5, ease: "power2.out" });
        gsap.from('.hero__actions .button', { opacity: 0, y: 20, duration: 0.8, delay: 1.8, stagger: 0.2, ease: "power2.out" });
        gsap.from('.hero__img-placeholder', { opacity: 0, scale: 0.9, duration: 1, delay: 2.2, ease: "power2.out" });
        
        // BONUS: Scroll animation for Benefits cards
        gsap.from('.benefits__card', {
            y: 50,
            opacity: 0,
            stagger: 0.3,
            duration: 0.8,
            ease: "power1.out",
            scrollTrigger: {
                trigger: '.benefits__grid',
                start: 'top 85%', 
                toggleActions: 'play none none none'
            }
        });
        
    } else {
        console.warn("GSAP или SplitType не загружены.");
    }

    // =======================================================
    // 3. Contact Form Logic (Этап 4)
    // =======================================================
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const captchaQuestion = document.getElementById('captchaQuestion');
    const phoneInput = document.getElementById('phone');

    // Капча: генерируем случайный пример
    let num1 = Math.floor(Math.random() * 5) + 3; // 3-7
    let num2 = Math.floor(Math.random() * 5) + 1; // 1-5
    let correctCaptchaAnswer = num1 + num2;
    captchaQuestion.textContent = `${num1} + ${num2}`;

    // Валидация телефона: только цифры
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, ''); // Удаляем все, кроме цифр
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const captchaInput = document.getElementById('captcha');
        const submittedAnswer = parseInt(captchaInput.value, 10);
        
        // Проверка капчи
        if (submittedAnswer !== correctCaptchaAnswer) {
            alert('Неправильный ответ на капчу. Пожалуйста, попробуйте снова.');
            
            // Генерируем новый пример
            num1 = Math.floor(Math.random() * 5) + 3;
            num2 = Math.floor(Math.random() * 5) + 1;
            correctCaptchaAnswer = num1 + num2;
            captchaQuestion.textContent = `${num1} + ${num2}`;
            captchaInput.value = '';
            
            return;
        }

        // Имитация AJAX-отправки
        const formData = new FormData(contactForm);
        console.log('Form data:', Object.fromEntries(formData.entries()));
        
        // Скрываем форму и показываем сообщение об успехе
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';

        // Анимация успеха (опционально, но красиво)
        gsap.from(successMessage, { opacity: 0, scale: 0.8, duration: 0.5, ease: "back.out(1.7)" });

        // Очистка формы (не обязательно, так как она скрыта, но хорошая практика)
        contactForm.reset();
    });

    // =======================================================
    // 4. Cookie Popup Logic (Этап 5)
    // =======================================================
    const cookiePopup = document.getElementById('cookiePopup');
    const acceptButton = document.getElementById('acceptCookies');
    const localStorageKey = 'cookiesAccepted';

    // Проверка статуса в LocalStorage
    if (localStorage.getItem(localStorageKey) !== 'true') {
        // Показываем с небольшой задержкой для плавности
        setTimeout(() => {
            cookiePopup.classList.add('cookie-popup--visible');
        }, 1000);
    }

    // Обработчик кнопки "Принять"
    acceptButton.addEventListener('click', () => {
        // Устанавливаем статус в LocalStorage
        localStorage.setItem(localStorageKey, 'true');
        
        // Плавно скрываем окно
        gsap.to(cookiePopup, { 
            opacity: 0, 
            y: 20, 
            duration: 0.5, 
            onComplete: () => {
                cookiePopup.style.display = 'none';
            }
        });
    });

    // =======================================================
    // 5. Инициализация иконок Lucide (если не используется CDN)
    // =======================================================
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});