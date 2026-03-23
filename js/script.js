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
loadSection("history", "sections/history/history.html");
loadSection("products", "sections/products/products.html");
loadSection("portfolio", "sections/portfolio/portfolio.html");
loadSection("contact", "sections/contact/contact.html");
let slides = document.querySelectorAll(".slide");
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