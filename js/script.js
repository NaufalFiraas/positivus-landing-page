// responsive navbar
const hamburgerMenu = document.getElementById("hamburgerMenu")
const menus = document.querySelector(".menus")
const navbar = document.querySelector(".navbar")
const menu = document.querySelectorAll(".menus a")

hamburgerMenu.addEventListener("click", (e) => {
    menus.classList.toggle("active")
    navbar.classList.toggle("active")
})

// add shadow to navbar when page scrolled
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
    } else {
        navbar.classList.remove("scrolled")
    }
})

// persist active on menus item
for (let i = 0; i < menu.length; i++) {
    menu[i].addEventListener("click", function (e) {
        for (let j = 0; j < menu.length; j++) {
            if (menu[j].classList.contains("active")) {
                menu[j].classList.remove("active")
            }
        }
        this.classList.add("active")
    })
}