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