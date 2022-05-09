const loginWindow: HTMLDivElement = document.querySelector('#login')
const regWindow: HTMLDivElement = document.querySelector('#registration')
const addTask: HTMLDivElement = document.querySelector('#addTask')
const date: NodeList = document.querySelectorAll(".date")
const datetaskAdd: HTMLInputElement = document.querySelector('#date')

const toDate = date => {
    return new Intl.DateTimeFormat('en-EN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        // hour: '2-digit',
        // minute: '2-digit',
        // second: '2-digit'
    }).format(new Date(date))
}

date.forEach(node => {
    const today = new Date() //date of user
    const sliceDate = today.toISOString().slice(0, 10) //create format for date input
    datetaskAdd.defaultValue = sliceDate
    node.textContent = toDate(node.textContent)
})

function hendleShowFormLog() {
    // location.href = `${location.href}#login`
    regWindow.style.display = "none"
    loginWindow.style.display = "block"
    // console.log(location.href)
}

function hendleShowFormReg() {
    // location.href = `${location.href}#reg`
    loginWindow.style.display = "none"
    regWindow.style.display = "block"
    // console.log(location.href)
}


