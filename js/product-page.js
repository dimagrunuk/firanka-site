// Дані товарів
const products = {
    1: {
        name: "Комплект декоративних подушок Firanka Damask",
        code: "p_0854",
        currentPrice: "800 грн",
        oldPrice: "900 грн",
        img: "../assets/imagescatalog/catalog1.jpg",
        category: "Декоративні подушки",
        quantity: "2 шт",
        color: "Бежевий",
        size: "47x33 см",
        stock: 1,
        description: "<p>Наволочки + подушки.</p><p>Подушки двосторонні.</p><p>Прихована блискавка.</p><p>Тканина Туреччина.</p><p>Наповнювач холофайбер.</p>"
    },
    2: {
        name: "Комплект декоративних подушок Firanka Simple оксамит 44x32см 3шт рожевий з бузковим",
        code: "p_0859",
        currentPrice: "850 грн",
        oldPrice: "970 грн",
        img: "../assets/imagescatalog/catalog2.jpg",
        category: "Декоративні подушки",
        quantity: "3 шт",
        color: "Бузковий, Рожевий",
        size: "44x32 см",
        stock: 1,
        description: "<p>Наволочки + подушки.</p><p>Подушки двосторонні.</p><p>Прихована блискавка.</p><p>Тканина Туреччина.</p>"
    },
    3: {
        name: "Комплект декоративних подушок Firanka Venzel",
        code: "p_0857",
        currentPrice: "1200 грн",
        oldPrice: "1500 грн",
        img: "../assets/imagescatalog/catalog3.jpg",
        category: "Декоративні подушки",
        quantity: "3 шт",
        color: "Бежевий, Золотий",
        size: "44x32 см",
        stock: 1,
        description: "<p>Наволочки + подушки.</p><p>Вишуканий дизайн.</p>"
    }
};

// Функція для завантаження header/footer
async function loadSection(id, file) {
    try {
        console.log(`Завантаження ${file}...`);
        const res = await fetch(file);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.text();
        document.getElementById(id).innerHTML = data;
        console.log(`✅ ${file} завантажено`);
        return true;
    } catch (error) {
        console.error(`❌ Помилка завантаження ${file}:`, error);
        return false;
    }
}

// Функція для оновлення даних товару
function loadProductData() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    console.log("ID товару:", productId);

    if (productId && products[productId]) {
        const p = products[productId];
        console.log("Товар знайдено:", p.name);

        const elements = {
            productName: document.getElementById('productName'),
            productCode: document.getElementById('productCode'),
            currentPrice: document.getElementById('currentPrice'),
            oldPrice: document.getElementById('oldPrice'),
            productImage: document.getElementById('productImage'),
            category: document.getElementById('category'),
            quantity: document.getElementById('quantity'),
            color: document.getElementById('color'),
            size: document.getElementById('size'),
            stockCount: document.getElementById('stockCount'),
            productDescription: document.getElementById('productDescription')
        };

        if (elements.productName) elements.productName.textContent = p.name;
        if (elements.productCode) elements.productCode.textContent = p.code;
        if (elements.currentPrice) elements.currentPrice.textContent = p.currentPrice;
        if (elements.oldPrice) elements.oldPrice.textContent = p.oldPrice;
        if (elements.productImage) elements.productImage.src = p.img;
        if (elements.category) elements.category.textContent = p.category;
        if (elements.quantity) elements.quantity.textContent = p.quantity;
        if (elements.color) elements.color.textContent = p.color;
        if (elements.size) elements.size.textContent = p.size;
        if (elements.stockCount) elements.stockCount.textContent = p.stock;
        if (elements.productDescription) elements.productDescription.innerHTML = p.description;

        document.title = `${p.name} | Firanka.top`;
    } else {
        console.log("Товар не знайдено. ID:", productId);
    }
}

// Бургер-меню
function setupBurger() {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');

    if (!burger) {
        setTimeout(setupBurger, 200);
        return;
    }

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
    if (closeMenu) closeMenu.addEventListener('click', closeMenuFunc);
    overlay.addEventListener('click', closeMenuFunc);
}

// Кнопки
function setupButtons() {
    const buyBtn = document.getElementById('buyBtn');
    const cartBtn = document.getElementById('cartBtn');

    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            alert('Швидке замовлення! Скоро з вами зв\'яжуться.');
        });
    }

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            alert('Товар додано в кошик!');
        });
    }
}

// Ініціалізація сторінки
async function init() {
    console.log("Ініціалізація сторінки товару...");

    // ПРАВИЛЬНІ ШЛЯХИ для файлу в папці productcard/
    await loadSection("header", "../sections/header/header.html");
    await loadSection("footer", "../sections/footer/footer.html");

    // Налаштовуємо всі компоненти
    setTimeout(() => {
        setupBurger();
        loadProductData();
        setupButtons();
    }, 200);
}

// Запускаємо
document.addEventListener('DOMContentLoaded', init);
// Каунтер
const minus = document.querySelector('.qty-minus');
const plus = document.querySelector('.qty-plus');
const qtySpan = document.querySelector('.qty-value');

if (minus && plus && qtySpan) {
    minus.addEventListener('click', () => {
        let val = parseInt(qtySpan.innerText);
        if (val > 1) qtySpan.innerText = val - 1;
    });
    plus.addEventListener('click', () => {
        let val = parseInt(qtySpan.innerText);
        if (val < 99) qtySpan.innerText = val + 1;
    });
}
// ... ваші дані products (з правильними шляхами ../assets/...)

// Глобальні змінні для галереї
let galleryImages = [];
let currentLightboxIndex = 0;

// Функція створення галереї (мініатюри)
function setupGallery(images) {
    const container = document.getElementById('galleryThumbs');
    const mainImg = document.getElementById('productImage');
    if (!container || !mainImg) return;

    galleryImages = images;
    container.innerHTML = '';

    images.forEach((src, idx) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumb';
        const img = document.createElement('img');
        img.src = src;
        thumb.appendChild(img);
        thumb.addEventListener('click', () => {
            mainImg.src = src;
            document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
        container.appendChild(thumb);
    });

    if (container.firstChild) container.firstChild.classList.add('active');
    mainImg.src = images[0];

    // Лайтбокс по кліку на головне фото
    mainImg.addEventListener('click', () => {
        const currentSrc = mainImg.src;
        const index = galleryImages.findIndex(s => s === currentSrc);
        openLightbox(index !== -1 ? index : 0);
    });
}

// Лайтбокс зі стрілками
function openLightbox(startIndex) {
    if (!galleryImages.length) return;
    currentLightboxIndex = startIndex;

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); display: flex; align-items: center;
        justify-content: center; z-index: 10000;
    `;

    const imgContainer = document.createElement('div');
    imgContainer.style.position = 'relative';
    imgContainer.style.display = 'flex';
    imgContainer.style.alignItems = 'center';
    imgContainer.style.justifyContent = 'center';
    imgContainer.style.maxWidth = '90%';
    imgContainer.style.maxHeight = '90%';

    const img = document.createElement('img');
    img.src = galleryImages[currentLightboxIndex];
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.borderRadius = '10px';

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '❮';
    prevBtn.style.cssText = `
        position: absolute; left: -50px; background: rgba(255,255,255,0.7);
        border: none; font-size: 36px; width: 50px; height: 50px;
        border-radius: 50%; cursor: pointer;
    `;
    prevBtn.onclick = (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
        img.src = galleryImages[currentLightboxIndex];
    };

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '❯';
    nextBtn.style.cssText = `
        position: absolute; right: -50px; background: rgba(255,255,255,0.7);
        border: none; font-size: 36px; width: 50px; height: 50px;
        border-radius: 50%; cursor: pointer;
    `;
    nextBtn.onclick = (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
        img.src = galleryImages[currentLightboxIndex];
    };

    imgContainer.appendChild(img);
    imgContainer.appendChild(prevBtn);
    imgContainer.appendChild(nextBtn);
    lightbox.appendChild(imgContainer);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.remove();
    });

    document.body.appendChild(lightbox);
}

function loadProductData() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');   // ОГОЛОШЕННЯ ЗМІННОЇ

    if (productId && products[productId]) {
        const p = products[productId];
        document.getElementById('productName').textContent = p.name;
        document.getElementById('productCode').textContent = p.code;
        document.getElementById('currentPrice').textContent = p.currentPrice;
        document.getElementById('oldPrice').textContent = p.oldPrice;
        document.getElementById('productImage').src = p.img;
        document.getElementById('category').textContent = p.category;
        document.getElementById('quantity').textContent = p.quantity;
        document.getElementById('color').textContent = p.color;
        document.getElementById('size').textContent = p.size;
        document.getElementById('stockCount').textContent = p.stock;
        if (document.getElementById('productDescription')) {
            document.getElementById('productDescription').innerHTML = p.description;
        }

        // Галерея
        const images = [
            p.img,
            p.img2 || p.img,
            p.img3 || p.img,
            p.img4 || p.img
        ];
        if (typeof setupGallery === 'function') setupGallery(images);
    } else {
        console.log('Товар не знайдено. ID:', productId);
    }
}