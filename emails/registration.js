const keys = require('../keys')
module.exports = function (mail, name) {
    return {
        to: mail,
        from: keys.EMAIL_FROM,
        subject: 'Account created',
        html: `
        <div>
        <h1>Welcome ${name}</h1>
        <p>You created account with email - ${mail}</p>
        <hr/>
        <a href="${keys.BASE_URL}">Follow to the site</a>
        </div>
        `
    }
}