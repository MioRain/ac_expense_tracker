require('dotenv').config()
require('./config/mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const session = require('express-session')
const usePassport = require('./config/passport')
const routes = require('./routes')

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

usePassport(app)

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`The express server is running on http://localhost:${port}`)
})