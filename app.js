require('dotenv').config()
require('./config/mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const session = require('express-session')
const usePassport = require('./config/passport')
const routes = require('./routes')
const flash = require('connect-flash')

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  helpers: {
    checkCategory: function (id, checkId) {
      if (id === checkId) return 'selected'
    }
  }
}))
app.set('view engine', 'handlebars')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`The express server is running on http://localhost:${port}`)
})