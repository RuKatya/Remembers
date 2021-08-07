const formRegist = $('.reg')
const formLogin = $('.login')
const btnLogin = $('.btnLogin')
const btnReg = $('.btnReg')

const checkbox = $('.eachTask__checkbox')
const taskText = $('.eachTask__content--text')

let flag = 1;


function hendleShowReg() {
    formRegist.show();
    formLogin.hide();
    btnLogin.removeClass('active');
    btnReg.addClass('active');
}

function hendleShowLog() {
    formRegist.hide();
    formLogin.show();
    btnLogin.addClass('active');
    btnReg.removeClass('active');
}

function hendleTextDecoration() {
    if (flag === 1) {
        flag = 2
        taskText.css('text-decoration', 'line-through')
    } else if (flag === 2) {
        flag = 1
        taskText.css('text-decoration', 'none')
    }

    console.log(flag)
}