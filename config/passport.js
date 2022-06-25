const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, req.flash('warning_msg', '此 email 尚未註冊'))
        }
        if (user.password !== password) {
          return done(null, false, req.flash('warning_msg', 'email 或 密碼 錯誤'))
        }
        return done(null, user)
      }
      catch (err) {
        console.log('catch', err)
        done(err, false)
      }
    }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      done(null, user)
    }
    catch (err) {
      console.log('catch', err)
      done(err, null)
    }
  })
}