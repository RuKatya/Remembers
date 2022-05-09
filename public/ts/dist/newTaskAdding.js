var addBtn = document.querySelector('.tasksPage__addTask--openBtn');
var addTaskWindow = document.querySelector('#addTask');
var closeBtn = document.querySelector('.tasksPage__addTask--closeBtn');
addBtn.addEventListener('click', handleShowForm);
closeBtn.addEventListener('click', handleCloseForm);
function handleShowForm() {
    console.log(addTaskWindow);
    addTaskWindow.classList.add('openedForm');
}
function handleCloseForm() {
    if (addTaskWindow.classList.contains('openedForm')) {
        addTaskWindow.classList.remove('openedForm');
        addTaskWindow.classList.add('closeForm');
        setTimeout(function () {
            addTaskWindow.classList.remove('closeForm');
        }, 600);
    }
}
