//DATE
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

//MENU BUTTON
const menuBtn = document.getElementById('menu');
const sideMenu = document.getElementById('sideMenu');
console.log(menuBtn)
console.log(sideMenu)


menuBtn.addEventListener('click', () => {
    sideMenu.classList.toggle("isOpen")
})

//REMOVE TASK AJAX
const $remembers = document.querySelector('#remembers')

if ($remembers) {
    $remembers.addEventListener('click', event => {
        console.log('da')
        console.log(event)
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
                            <div class="remembers__eachTask">
                                        <div class="remembers__eachTask--text">
                                            ${task.text}
                                        </div>
                                        <div class="date remembers__eachTask--date">
                                            ${toDate(task.date)}
                                        </div>
                                        <!-- EDIT BTN -->
                                        <div>
                                            <a href="/remembers/${task._id}/edit?allow=true"
                                                class="remembers__eachTask--editBtn">
                                                <img src="./icons/editTask.png" alt="Edit">
                                            </a>
                                        </div>
                                        <!-- DELETE BTN -->
                                        <div>
                                            <button type="button" class="deleteTask remembers__eachTask--deleteBtn">
                                                <img class="deleteTask" src="./icons/delete.png" alt="Delete"
                                                    data-id="${task._id}" data-csrf="${csrf}">
                                            </button>
                                        </div>
                                    </div>
                                    `
                        }).join('')
                        $remembers.querySelector('.remembers').innerHTML = html
                    } else {
                        $remembers.querySelector('.remembers').innerHTML = `
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
