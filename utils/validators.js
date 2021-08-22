const {body} = require('express-validator/check') 

exports.registerValidators = [
  body('email').isEmail().withMessage('Enter correct email'),
  body('password', 'The password must to be at least 6 simbols').isLength({min: 6, max: 56}).isAlphanumeric(),
  body('repeat').custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Passwords not confirm')
    }
    return true
  }),
  body('name').isLength({min: 3}).withMessage('The name must to be min 2 simbols')
]