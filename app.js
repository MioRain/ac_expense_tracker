require('dotenv').config()
require('./config/mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`The express server is running on http://localhost:${port}`)
})