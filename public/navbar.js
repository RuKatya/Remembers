function getTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (hours < 10) {
        hours = "0" + hours;
    }

    let time = `${hours}:${minutes}:${seconds}`;
    document.querySelector(".navbar__timeNow").innerHTML = time;
}
setInterval(getTime, 0);

function getDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    let dateToday = `${day}/${month}/${year}`;
    document.querySelector(".navbar__dateNow").innerHTML = dateToday;
}
setInterval(getDate, 0);