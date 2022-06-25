const express = require('express')
const User = require('../../models/User')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: '所有欄位都是必填。' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符！' })
    }
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    const user = await User.findOne({ email })
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      User.create({
        name,
        email,
        password: hash
      })
    }
    res.redirect('/')
  }
  catch (err) {
    console.log('catch', err)
  }
})

module.exports = router