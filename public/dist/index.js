var loginWindow = document.querySelector('#login');
var regWindow = document.querySelector('#registration');
function hendleShowFormLog() {
    loginWindow.style.display = "block";
    regWindow.style.display = "none";
}
function hendleShowFormReg() {
    loginWindow.style.display = "none";
    regWindow.style.display = "block";
}
