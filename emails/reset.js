const keys = require('../keys')

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Reset password',
        html: `
      <h1>Did you forget your password?</h1>
      <p>If not, just ignore this Email</p>
      <p>Otherwise press on the link below:</p>
      <p><a href="${keys.BASE_URL}/auth/password/${token}">Restore access</a></p>
      <hr />
      <a href="${keys.BASE_URL}"
            style=" padding: 0.5% 1%; font-size: 1.2rem; text-decoration: none; border-radius: 0.5rem; background-color: rgb(85, 206, 85); color: white; position: relative; top:3vh;">Follow
            to the
            site</a>
    `
    }
}