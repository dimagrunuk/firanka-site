async function loadSection(id, file) {
    const res = await fetch(file);
    const data = await res.text();
    document.getElementById(id).innerHTML = data;
}

loadSection("header", "sections/header/header.html");
loadSection("hero", "sections/hero/hero.html");
loadSection("footer", "sections/footer/footer.html");