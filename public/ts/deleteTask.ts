const $tasks: HTMLDivElement = document.querySelector('.tasksPage__allTasks')

if ($tasks) {
    $tasks.addEventListener('click', evt => {
        const target = evt.target as Element;
        if (target.classList.contains('deleteTask')) {
            const id = target.dataset.id
            const csrf = target.dataset.csrf

            fetch('/remembers/remove/' + id, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': csrf
                }
            }).then(res => res.json())
                .then(tasks => {
                    location.reload()
                })
        }
    })
}