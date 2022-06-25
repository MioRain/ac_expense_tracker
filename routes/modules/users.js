const express = require('express')
const User = require('../../models/User')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const user = await User.findOne({ email })
    if (user) {
      console.log('User already exists.')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      User.create({
        name,
        email,
        password
      })
    }
    res.redirect('/')
  }
  catch (err) {
    console.log('catch', err)
  }
})

module.exports = router