var eachTask = document.querySelectorAll('.tasksPage__allTasks__eachTask');
var infoText = document.querySelectorAll('.tasksPage__allTasks__eachTask--infoTask');
var xStart = null;
var yStart = null;
eachTask.forEach(function (task) {
    task.addEventListener('touchstart', handleTouchStart); //start of swipe
});
eachTask.forEach(function (task) {
    task.addEventListener('touchmove', handleTouchMove); //move of swipe
});
function handleTouchStart(evt) {
    xStart = evt.touches[0].clientX;
    yStart = evt.touches[0].clientY;
}
;
function handleTouchMove(evt) {
    if (!xStart || !yStart) { //if we don't have the coordinates nothing happend
        return;
    }
    var xMove = evt.touches[0].clientX; //get the x and y move coordinate
    var yMove = evt.touches[0].clientY;
    var xDiff = xStart - xMove; //geet the diff
    var yDiff = yStart - yMove;
    if (Math.abs(xDiff) > Math.abs(yDiff)) { /* catch the difference in movement */
        var target = evt.target;
        var infoDiv_1 = target;
        var parentDiv_1 = target.parentElement;
        var targetContainClass = infoDiv_1.classList.contains('tasksPage__allTasks__eachTask--infoTask');
        var parentContainClass = parentDiv_1.classList.contains('tasksPage__allTasks__eachTask--infoTask');
        if (xDiff > 0) {
            /* swipe left */
            console.log('left');
            if (targetContainClass) { //touched on info task div
                infoDiv_1.classList.remove("right");
                infoDiv_1.classList.add("left");
                setTimeout(function () {
                    infoDiv_1.classList.remove("left");
                    infoDiv_1.classList.add("setRegularLeft");
                    setTimeout(function () {
                        infoDiv_1.classList.remove("setRegularLeft");
                    }, 600);
                }, 3000);
            }
            else if (parentContainClass) { //touched on child
                parentDiv_1.classList.remove("right");
                parentDiv_1.classList.add("left");
                setTimeout(function () {
                    parentDiv_1.classList.remove("left");
                    parentDiv_1.classList.add("setRegularLeft");
                    setTimeout(function () {
                        parentDiv_1.classList.remove("setRegularLeft");
                    }, 600);
                }, 3000);
            }
        }
        else {
            /* swipe right */
            console.log('right');
            if (targetContainClass) { //touched on info task div
                infoDiv_1.classList.remove("left");
                infoDiv_1.classList.add("right");
                setTimeout(function () {
                    infoDiv_1.classList.remove("right");
                    infoDiv_1.classList.add("setRegularRight");
                    setTimeout(function () {
                        infoDiv_1.classList.remove("setRegularRight");
                    }, 600);
                }, 3000);
            }
            else if (parentDiv_1.classList.contains('tasksPage__allTasks__eachTask--infoTask')) { //touched on child
                parentDiv_1.classList.remove("left");
                parentDiv_1.classList.add("right");
                setTimeout(function () {
                    parentDiv_1.classList.remove("right");
                    parentDiv_1.classList.add("setRegularRight");
                    setTimeout(function () {
                        parentDiv_1.classList.remove("setRegularRight");
                    }, 600);
                }, 3000);
            }
        }
    }
    /* reset the coordinates */
    xStart = null;
    yStart = null;
}
