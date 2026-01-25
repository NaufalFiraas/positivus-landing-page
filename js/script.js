// responsive navbar
const hamburgerMenu = document.getElementById("hamburgerMenu")
const menus = document.querySelector(".navbar .menus")
const navbar = document.querySelector(".navbar")
const menu = document.querySelectorAll(".navbar .menus a")
const btnExpand = document.querySelectorAll(".process .title p")
const process = document.querySelectorAll(".process")
const contactBtn = document.getElementById("submit-contact")
const contactForm = document.querySelector(".contact .content form")
const formName = document.getElementById("name")
const formEmail = document.getElementById("email")
const formMessage = document.getElementById("message")
const messageError = document.querySelectorAll(".message-error")
const toast = document.getElementById("toast")
const subscribeBtn = document.getElementById("subscribe-btn")
const emailSubscribe = document.getElementById("email-subscribe")
const subscribeForm = document.getElementById("subscribe")
const sendContactURL = "https://jsonplaceholder.typicode.com/posts"

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

contactBtn.addEventListener("click", (e) => {
    e.preventDefault()

    if (!contactBtn.disabled) {
        const selectedRadio = document.querySelector(`input[name="hi-quote"]:checked`)
        const validation = contactFormValidation(formName.value, formEmail.value, formMessage.value, selectedRadio)
        if (validation) {
            const payload = {
                name: formName.value,
                email: formEmail.value,
                message: formMessage.value,
                radio: selectedRadio.value
            }

            postContact(payload)
        }
    }
})

function contactFormValidation(name, email, message, radio) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    for (let i = 0; i < messageError.length; i++) {
        messageError[i].classList.remove("active")
    }

    if (radio === '' || radio === null) {
        messageError[0].textContent = 'Required!'
        messageError[0].classList.add("active")
        return false
    }
    if (name.trimStart() === '' || name === null) {
        messageError[1].textContent = "Required!"
        messageError[1].classList.add("active")
        return false
    }
    if (email.trimStart() === '' || email === null) {
        messageError[2].textContent = "Required!"
        messageError[2].classList.add("active")
        return false
    }
    if (!emailPattern.test(email)) {
        messageError[2].textContent = 'Email Invalid!'
        messageError[2].classList.add("active")
        return false
    }
    if (message.trimStart() === '' || message === null) {
        messageError[3].textContent = "Required!"
        messageError[3].classList.add("active")
        return false
    }

    return true
}

async function postContact(payload) {
    contactBtn.disabled = true
    contactBtn.textContent = "Sending..."
    contactBtn.classList.add("disable")

    try {
        const response = await fetch(sendContactURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            throw new Error(`Failed to post data on ${sendContactURL}`)
        }

        const data = await response.json()
        console.log(data)
        toast.textContent = "Success Send Message!"
        toast.classList.add("active")
    } catch (err) {
        contactBtn.textContent = "Failed"
        console.log(err)
        toast.textContent = "Failed to Send Message!"
        toast.classList.add("active")
        toast.classList.add("failed")
    } finally {
        setTimeout(() => {
            toast.classList.remove("active")
            toast.classList.remove("failed")
        }, 2000)
        contactBtn.classList.remove("disable")
        contactBtn.textContent = "Send Message"
        contactForm.reset()
        contactBtn.disabled = false
    }
}

subscribeBtn.addEventListener("click", function (e) {
    e.preventDefault()
    if (!this.disabled) {
        const validation = validateEmailSubscribe(emailSubscribe.value)
        if (validation) {
            const payload = {
                email: emailSubscribe.value
            }
            sendSubscribe(payload)
        } else {
            setTimeout(() => {
                toast.classList.remove("active")
                toast.classList.remove("failed")
            }, 2000)
        }
    }
})

function validateEmailSubscribe(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (email.trimStart() === '' || email === null) {
        toast.classList.add("active")
        toast.classList.add("failed")
        toast.textContent = "Email is Required!"
        return false
    }

    if (!emailPattern.test(email)) {
        toast.classList.add("active")
        toast.classList.add("failed")
        toast.textContent = "Invalid Email!"
        return false
    }

    return true
}

async function sendSubscribe(payload) {
    subscribeBtn.disabled = true
    subscribeBtn.textContent = "Sending..."
    subscribeBtn.classList.add("disable")

    try {
        const response = await fetch(sendContactURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch from ${sendContactURL}`)
        }

        const data = await response.json()
        console.log(data)

        toast.classList.add("active")
        toast.textContent = `Email already sent to ${payload.email}`

    } catch (err) {
        console.log(err)
        toast.classList.add("active")
        toast.classList.add("failed")
        toast.textContent = "Failed to send email"
    } finally {
        setTimeout(() => {
            toast.classList.remove("active")
            toast.classList.remove("failed")
        }, 2000)
        subscribeBtn.textContent = "Subscribe to news"
        subscribeBtn.disabled = false
        subscribeBtn.classList.remove("disable")
        subscribeForm.reset()
    }
}

// Swiper JS
new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
})