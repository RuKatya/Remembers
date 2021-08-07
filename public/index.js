const toDate = date => {
    return new Intl.DateTimeFormat('en-EN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDate(node.textContent)
})

const $remembers = document.querySelector('#remembers')

if ($remembers) {
    $remembers.addEventListener('click', event => {
        if (event.target.classList.contains('deleteTask')) {
            const id = event.target.dataset.id

            fetch('/remembers/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
                .then(tasks => {
                    if (tasks.length) {
                        const html = tasks.map(task => {
                            return `
                            <div style="display: flex; flex-direction: row;">
                                <div>${task.text}</div>
                                <button type="button" class="deleteTask" data-id="${task._id}">Delete car</button>
                            </div>
                        `
                        }).join('')
                        $remembers.querySelector('.bla').innerHTML = html
                    } else {
                        $remembers.querySelector('.bla').innerHTML = `<div>There no tasks still</div>`
                    }
                })
        }
    })
}

