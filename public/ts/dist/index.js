var loginWindow = document.querySelector('#login');
var regWindow = document.querySelector('#registration');
var addTask = document.querySelector('#addTask');
var date = document.querySelectorAll(".date");
var datetaskAdd = document.querySelector('#date');
var toDate = function (date) {
    return new Intl.DateTimeFormat('en-EN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date));
};
date.forEach(function (node) {
    var today = new Date(); //date of user
    var sliceDate = today.toISOString().slice(0, 10); //create format for date input
    datetaskAdd.defaultValue = sliceDate;
    node.textContent = toDate(node.textContent);
});
function hendleShowFormLog() {
    // location.href = `${location.href}#login`
    regWindow.style.display = "none";
    loginWindow.style.display = "block";
    // console.log(location.href)
}
function hendleShowFormReg() {
    // location.href = `${location.href}#reg`
    loginWindow.style.display = "none";
    regWindow.style.display = "block";
    // console.log(location.href)
}
