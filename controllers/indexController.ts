import color from 'colors';

export const hendleIndexPage = async (req: any, res: any) => {
    try {
        res.render('index', {
            title: 'Home Page',
            HomePage: true,
            registError: req.flash('registError'),
            loginError: req.flash('loginError')
        })
    } catch (err) {
        console.log(color.bgRed.black(err))
    }
}