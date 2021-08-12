const keys = require('../keys')
module.exports = function (mail, name, password) {
    return {
        to: mail,
        from: keys.EMAIL_FROM,
        subject: 'Account created',
        html: `
        <div style="width: 80%; margin: 5% auto;text-align: center;">
        <h1>Welcome ${name}</h1>
        <p style="color: green;font-weight: bold;font-size: 1.8rem;">We glad that you joined to our family!</p>
        <p style="color: indigo;">You created account with email - ${mail} and your password is - ${password}</p>
        <hr />
        <a href="${keys.BASE_URL}"
            style=" padding: 0.5% 1%; font-size: 1.2rem; text-decoration: none; border-radius: 0.5rem; background-color: rgb(85, 206, 85); color: white; position: relative; top:3vh;">Follow
            to the
            site</a>
    </div>
        `
    }
}