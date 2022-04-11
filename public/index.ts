const loginWindow: HTMLDivElement = document.querySelector('#login')
const regWindow: HTMLDivElement = document.querySelector('#registration')

function hendleShowFormLog() {
    loginWindow.style.display = "block"
    regWindow.style.display = "none"
}

function hendleShowFormReg() {
    loginWindow.style.display = "none"
    regWindow.style.display = "block"
}