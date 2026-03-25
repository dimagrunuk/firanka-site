// Завантаження секцій
async function loadSection(id, file) {
    const res = await fetch(file);
    const data = await res.text();
    document.getElementById(id).innerHTML = data;
}

// Завантажуємо всі секції
loadSection("header", "sections/header/header.html");
loadSection("hero", "sections/hero/hero.html");
loadSection("advantages", "sections/advantages/advantages.html");
loadSection("catalog", "sections/catalog/catalog.html");
loadSection("banner", "sections/banner/banner.html");
loadSection("reviews", "sections/reviews/reviews.html");
loadSection("instagram", "sections/instagram/instagram.html");
loadSection("products", "sections/products/products.html");
loadSection("portfolio", "sections/portfolio/portfolio.html");
loadSection("contact", "sections/contact/contact.html");
loadSection("footer", "sections/footer/footer.html");

// Функція для запуску слайдера відгуків
function setupReviewsSlider() {
    const reviewsContainer = document.querySelector('.reviews-container');
    const slides = document.querySelectorAll('.review-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');

    if (!reviewsContainer || slides.length === 0) {
        console.log("Слайдер відгуків не знайдено, спробую ще раз");
        setTimeout(setupReviewsSlider, 500);
        return;
    }

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        reviewsContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Оновлюємо активну точку
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Додаємо обробники подій
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Навігація точками
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Автоматичне перемикання кожні 5 секунд
    let autoSlide = setInterval(nextSlide, 5000);

    // Зупиняємо автоперемикання при наведенні
    const slider = document.querySelector('.reviews-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });

        slider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });
    }

    console.log("Слайдер відгуків запущено!", totalSlides + " слайдів");
}

// Функція для налаштування бургер-меню
function setupBurger() {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');

    if (!burger) {
        console.log("Бургер не знайдено");
        return;
    }

    // Створюємо оверлей
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }

    function openMenu() {
        if (mobileMenu) mobileMenu.classList.add('active');
        burger.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenuFunc() {
        if (mobileMenu) mobileMenu.classList.remove('active');
        burger.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    burger.addEventListener('click', openMenu);

    if (closeMenu) {
        closeMenu.addEventListener('click', closeMenuFunc);
    }

    overlay.addEventListener('click', closeMenuFunc);

    // Закриття по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMenuFunc();
        }
    });

    // Дропдаун в мобільному меню
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    if (mobileDropdown) {
        const dropdownLink = mobileDropdown.querySelector('.mobile-nav-link');
        if (dropdownLink) {
            dropdownLink.addEventListener('click', (e) => {
                e.preventDefault();
                mobileDropdown.classList.toggle('active');
            });
        }
    }

    console.log("Бургер-меню налаштовано");
}

// Функція для запуску слайдера hero (якщо потрібен)
function startHeroSlider() {
    let slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;

    let currentIndex = 0;
    slides[currentIndex].classList.add("active");

    setInterval(() => {
        slides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
    }, 3000);
}

// Запускаємо всі скрипти після завантаження
let checkCount = 0;
const checkInterval = setInterval(() => {
    const heroSection = document.querySelector('.hero');
    const reviewsSection = document.querySelector('.reviews');

    if ((heroSection || checkCount > 20) && (reviewsSection || checkCount > 20)) {
        clearInterval(checkInterval);
        startHeroSlider();
        setupReviewsSlider();
        setupBurger();
    }
    checkCount++;
}, 200);

// Додатковий запуск після повного завантаження
window.addEventListener('load', () => {
    setTimeout(() => {
        startHeroSlider();
        setupReviewsSlider();
        setupBurger();
    }, 500);
});


// Десктопний слайдер
function startDesktopSlider() {
    let slides = document.querySelectorAll(".desktop-slider .slide");
    if (slides.length === 0) return;

    let currentIndex = 0;

    setInterval(() => {
        slides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
    }, 3000);
}

// Мобільний слайдер
function startMobileSlider() {
    const slides = document.querySelectorAll(".mobile-slider .slide-mobile");
    if (slides.length === 0) return;

    let currentIndex = 0;
    const sliderContainer = document.querySelector(".mobile-slider");

    // Створюємо точки навігації
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "slider-dots-mobile";

    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.className = "dot-mobile";
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });

    sliderContainer.parentNode.insertBefore(dotsContainer, sliderContainer.nextSibling);

    function goToSlide(index) {
        slides[currentIndex].classList.remove("active-mobile");
        dotsContainer.children[currentIndex].classList.remove("active");

        currentIndex = index;

        slides[currentIndex].classList.add("active-mobile");
        dotsContainer.children[currentIndex].classList.add("active");
    }

    function nextSlide() {
        let next = (currentIndex + 1) % slides.length;
        goToSlide(next);
    }

    // Автоматичне перемикання кожні 3 секунди
    let autoSlide = setInterval(nextSlide, 3000);

    // Пауза при наведенні
    sliderContainer.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    sliderContainer.addEventListener("mouseleave", () => {
        autoSlide = setInterval(nextSlide, 3000);
    });
}

// Запускаємо після завантаження
setTimeout(() => {
    startDesktopSlider();
    startMobileSlider();
}, 500);