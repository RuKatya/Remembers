const {body} = require('express-validator') 

exports.registerValidators = [
  //EMAIL
  body('email')
  .isEmail().withMessage('Enter correct email')
  .normalizeEmail(),
  //PASSWORD
  body('password', 'The password must to be at least 6 simbols')
  .isLength({min: 6, max: 56}).isAlphanumeric()
  .trim(),
  //REPEAT
  body('repeat')
  .custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Passwords not confirm')
    }
    return true
  })
  .trim(),
  //NAME
  body('name')
  .isLength({min: 3}).withMessage('The name must to be min 2 simbols')
]

exports.loginValidators = [
  //EMAIL
  body('email')
  .isEmail().withMessage('Enter correct email')
  .normalizeEmail(),
  //PASSWORD
  body('password', 'The password must to be at least 6 simbols')
  .isLength({min: 6, max: 56}).isAlphanumeric()
  .trim()
]