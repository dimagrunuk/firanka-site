async function loadSection(id, file) {
    const res = await fetch(file);
    const data = await res.text();
    document.getElementById(id).innerHTML = data;
}

loadSection("header", "sections/header/header.html");
loadSection("hero", "sections/hero/hero.html");
loadSection("footer", "sections/footer/footer.html");
loadSection("advantages", "sections/advantages/advantages.html");
loadSection("catalog", "sections/catalog/catalog.html");
loadSection("banner", "sections/banner/banner.html");
loadSection("reviews", "sections/reviews/reviews.html");
loadSection("instagram", "sections/instagram/instagram.html");
loadSection("products", "sections/products/products.html");
loadSection("portfolio", "sections/portfolio/portfolio.html");

let index = 0;

function startSlider() {
    let slides = document.querySelectorAll(".slide");
    let index = 0;

    setInterval(() => {
        slides[index].classList.remove("active");

        index++;
        if (index >= slides.length) index = 0;

        slides[index].classList.add("active");
    }, 3000);
}

/* ЧЕКАЄМО ПОКИ ПІДВАНТАЖИТЬСЯ HERO */
setTimeout(startSlider, 500);
const track = document.querySelector('.reviews-track');
const dots = document.querySelectorAll('.dot');

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slide = dot.dataset.slide;

        track.style.transform = `translateX(-${slide * 100}%)`;

        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
    });
});