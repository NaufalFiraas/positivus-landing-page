// responsive navbar
const hamburgerMenu = document.getElementById("hamburgerMenu")
const menus = document.querySelector(".menus")
const navbar = document.querySelector(".navbar")
const menu = document.querySelectorAll(".menus a")
const btnExpand = document.querySelectorAll(".process .title p")
const process = document.querySelectorAll(".process")

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

// close side navbar when click outside it
document.addEventListener("click", (e) => {
    if (!hamburgerMenu.contains(e.target) && !navbar.contains(e.target)) {
        menus.classList.remove("active")
    }
})

// expand working process
for (let i = 0; i < btnExpand.length; i++) {
    btnExpand[i].addEventListener("click", (e) => {
        if (process[i].classList.contains("active")) {
            process[i].classList.remove("active")
            btnExpand[i].textContent = "+"
        } else {
            for (let j = 0; j < btnExpand.length; j++) {
                if (process[j].classList.contains("active")) {
                    process[j].classList.remove("active")
                    btnExpand[j].textContent = "+"
                }
            }
            process[i].classList.toggle("active")
            btnExpand[i].textContent = "-"
        }
    })
}