const profileBtn = document.querySelector("#profileBtn")
const menu = document.querySelector("#menu")

profileBtn.addEventListener('click', () => {
    menu.classList.toggle('showMenu')
})