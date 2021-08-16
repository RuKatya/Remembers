const keys = require('../keys')

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Reset password',
        html: `
        <div style="text-align: center;">
        <div style="background-color: rgb(0, 217, 255);">
            <h1 style="padding: 2% 0%;color: rgb(0, 22, 122); text-shadow: 0px 0px 10px white;font-family:'Permanent Marker', cursive;">
                Be organized
            </h1>
        </div>

        <div >
            <h2>Did you forget your password?</h2>
            <div style="font-size: 1.1rem;">
                <p style="text-decoration: underline;">If not, just ignore this Email</p>
                <p style="font-size: 1.1rem">Otherwise press on the link below:</p>
                <p>This link will 
                    <span style="color:red; font-weight: bold;">
                        active
                    </span>
                    only for 
                    <span style="color:red; font-weight: bold;">
                        10 minuts
                        </span>
                    !
                 </p>
                <p>
                    <a href="${keys.BASE_URL}/auth/password/${token}"
                        style="padding: 0.5% 1%; font-size: 1.2rem; text-decoration: none; border-radius: 0.5rem; background-color: rgb(85, 206, 85); color: white; position: relative; top:3vh;">
                        Restore access
                    </a>
                </p>
            </div>
        </div>
    </div>
    `
    }
}