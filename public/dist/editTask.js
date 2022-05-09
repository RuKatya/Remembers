// const dateToDefault: HTMLDivElement = document.querySelector('.dateToDefault')
var datetaskAdd = document.querySelector('#date');
var date = document.querySelectorAll(".date");
var toDate = function (date) {
    return new Intl.DateTimeFormat('en-EN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date));
};
date.forEach(function (node) {
    var userDate = new Date(node.textContent); //date of user
    var sliceDate = userDate.toISOString().slice(0, 10); //create format for date input
    datetaskAdd.defaultValue = sliceDate;
    node.textContent = toDate(node.textContent);
});
