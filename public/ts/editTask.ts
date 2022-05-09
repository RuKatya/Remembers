// const dateToDefault: HTMLDivElement = document.querySelector('.dateToDefault')
const datetaskAdd: HTMLInputElement = document.querySelector('#date')
const date: NodeList = document.querySelectorAll(".date")

const toDate = date => {
    return new Intl.DateTimeFormat('en-EN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date))
}

date.forEach(node => {
    const userDate = new Date(node.textContent) //date of user
    const sliceDate = userDate.toISOString().slice(0, 10) //create format for date input
    datetaskAdd.defaultValue = sliceDate
    node.textContent = toDate(node.textContent)
})
