var loginWindow = document.querySelector('#login');
var regWindow = document.querySelector('#registration');
var addTask = document.querySelector('#addTask');
var date = document.querySelectorAll(".date");
var toDate = function (date) {
    return new Intl.DateTimeFormat('en-EN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date));
};
date.forEach(function (node) {
    node.textContent = toDate(node.textContent);
});
function hendleShowFormLog() {
    loginWindow.style.display = "block";
    regWindow.style.display = "none";
}
function hendleShowFormReg() {
    loginWindow.style.display = "none";
    regWindow.style.display = "block";
}
