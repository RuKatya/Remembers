var $tasks = document.querySelector('.tasksPage__allTasks');
if ($tasks) {
    $tasks.addEventListener('click', function (evt) {
        var target = evt.target;
        if (target.classList.contains('deleteTask')) {
            var id = target.dataset.id;
            var csrf = target.dataset.csrf;
            fetch('/remembers/remove/' + id, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': csrf
                }
            }).then(function (res) { return res.json(); })
                .then(function (tasks) {
                location.reload();
            });
        }
    });
}
