const eachTask: NodeList = document.querySelectorAll('.tasksPage__allTasks__eachTask')
const infoText: NodeList = document.querySelectorAll('.tasksPage__allTasks__eachTask--infoTask')

let xStart: number = null;
let yStart: number = null;

eachTask.forEach(task => {
    task.addEventListener('touchstart', handleTouchStart); //start of swipe
})

eachTask.forEach(task => {
    task.addEventListener('touchmove', handleTouchMove); //move of swipe
})

function handleTouchStart(evt: TouchEvent) { //get the x and y start coordinate
    xStart = evt.touches[0].clientX;
    yStart = evt.touches[0].clientY;
};

function handleTouchMove(evt: TouchEvent) {
    if (!xStart || !yStart) { //if we don't have the coordinates nothing happend
        return;
    }

    const xMove: number = evt.touches[0].clientX; //get the x and y move coordinate
    const yMove: number = evt.touches[0].clientY;

    const xDiff: number = xStart - xMove; //geet the diff
    const yDiff: number = yStart - yMove;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/* catch the difference in movement */
        const target = evt.target as Element;
        const infoDiv = target
        const parentDiv = target.parentElement
        const targetContainClass = infoDiv.classList.contains('tasksPage__allTasks__eachTask--infoTask')
        const parentContainClass = parentDiv.classList.contains('tasksPage__allTasks__eachTask--infoTask')

        if (xDiff > 0) {
            /* swipe left */
            console.log('left')

            if (targetContainClass) { //touched on info task div
                infoDiv.classList.remove("right")
                infoDiv.classList.add("left")
                setTimeout(() => { //on timeout return to regular position
                    infoDiv.classList.remove("left")
                    infoDiv.classList.add("setRegularLeft")
                    setTimeout(() => {
                        infoDiv.classList.remove("setRegularLeft")
                    }, 600)
                }, 3000)
            } else if (parentContainClass) { //touched on child
                parentDiv.classList.remove("right")
                parentDiv.classList.add("left")
                setTimeout(() => { //on timeout return to regular position
                    parentDiv.classList.remove("left")
                    parentDiv.classList.add("setRegularLeft")
                    setTimeout(() => {
                        parentDiv.classList.remove("setRegularLeft")
                    }, 600)
                }, 3000)
            }
        } else {
            /* swipe right */
            console.log('right')
            if (targetContainClass) { //touched on info task div
                infoDiv.classList.remove("left")
                infoDiv.classList.add("right")
                setTimeout(() => { //on timeout return to regular position
                    infoDiv.classList.remove("right")
                    infoDiv.classList.add("setRegularRight")
                    setTimeout(() => {
                        infoDiv.classList.remove("setRegularRight")
                    }, 600)
                }, 3000)
            } else if (parentDiv.classList.contains('tasksPage__allTasks__eachTask--infoTask')) { //touched on child
                parentDiv.classList.remove("left")
                parentDiv.classList.add("right")
                setTimeout(() => {//on timeout return to regular position
                    parentDiv.classList.remove("right")
                    parentDiv.classList.add("setRegularRight")
                    setTimeout(() => {
                        parentDiv.classList.remove("setRegularRight")
                    }, 600)
                }, 3000)
            }
        }
    }

    /* reset the coordinates */
    xStart = null;
    yStart = null;
}

// const downBtn = document.querySelectorAll('.tasksPage__allTasks__eachTask--downBtn')

// downBtn.forEach(btn => {
//     btn.addEventListener('click', (evt) => {
//         console.log(btn.offsetHeight)
//         console.log(evt)
//         console.log(evt.target.offsetParent)
//         console.log(evt.target.offsetParent.offsetParent)
//         console.log(evt.target.offsetParent.offsetHeight)
//         console.log(evt.target.offsetParent.offsetParent.offsetHeight)
//         evt.target.offsetParent.offsetParent.offsetHeight.style.height = `"${evt.target.offsetParent.offsetHeight}px"`
//     })
// })

// tasksPage__allTasks__eachTask--infoTask

// const divHeight = document.querySelectorAll('.tasksPage__allTasks__eachTask--infoTask')

// divHeight.forEach(div => {
//     console.log(div)
//     console.log(div.offsetHeight)
// })