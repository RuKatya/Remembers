const formRegist = $('.reg')
const formLogin = $('.login')
const btnLogin = $('.btnLogin')
const btnReg = $('.btnReg')

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