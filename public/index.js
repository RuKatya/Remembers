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
            const csrf = event.target.dataset.csrf

            fetch('/remembers/remove/' + id, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': csrf
                }
            }).then(res => res.json())
                .then(tasks => {
                    if (tasks.length) {
                        const html = tasks.map(task => {
                            return `
                            <div class="eachTask">
                                        <div class="eachTask__text">
                                            ${task.text}
                                        </div>
                                        <div class="date eachTask__date">
                                            ${toDate(task.date)}
                                        </div>
                                        <!-- EDIT BTN -->
                                        <div>
                                            <a href="/remembers/${task._id}/edit?allow=true"
                                                class="eachTask__editBtn">Edit</a>
                                        </div>
                                        <!-- DELETE BTN -->
                                        <div>
                                            <button type="button" class="deleteTask eachTask__deleteBtn"
                                                data-id="${task._id}" data-csrf="${csrf}">Delete</button>
                                        </div>
                                    </div>
                                    `
                        }).join('')
                        $remembers.querySelector('.remembers__tasks').innerHTML = html
                    } else {
                        $remembers.querySelector('.remembers__tasks').innerHTML = `
                        <div class="remembers__noTask">
                            <div>There no tasks.</div>
                            <div>Just write your task and</div>
                            <div style="color:rgb(221, 72, 13)">Be organized!</div>
                        </div>
                        `
                    }
                })
        }
    })
}
