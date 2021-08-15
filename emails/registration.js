const keys = require('../keys')
module.exports = function (mail, name, password) {
    return {
        to: mail,
        from: keys.EMAIL_FROM,
        subject: 'Account created',
        html: `
        <div style="text-align: center;">
            <div style="background-color: rgb(0, 217, 255);">
                <h1 style="padding: 2% 0%;color: rgb(0, 22, 122); text-shadow: 0px 0px 10px white;font-family:'Permanent Marker', cursive;">
                    Be organized
                </h1>
            </div>

            <h1>Welcome ${name}</h1>

            <p style="font-weight: bold;font-size: 1.8rem;color:rgb(100, 6, 183)">
                We glad that you joined to our family!
            </p>

            <div style="background-color: rgba(141, 248, 207, 0.685);">
                <p style="color: rgb(0, 0, 0); font-size: 1.1rem;padding: 2%;">
                    You created account with email - 
                    <b>
                        ${mail}
                    </b>
                        and your password is - 
                    <b>
                        ${password}
                    </b>
                </p>
            </div>

            <hr />
            <a href="${keys.BASE_URL}" style=" padding: 0.5% 1%; font-size: 1.2rem; text-decoration: none; border-radius: 0.5rem; background-color: rgb(85, 206, 85); color: white; position: relative; top:3vh;">
                Follow to the site
            </a>
        </div>
        `
    }
}