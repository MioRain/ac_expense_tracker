const express = require('express')
const Record = require('../../models/record')
const Category = require('../../models/category')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const records = await Record.find().lean()
    const categories = await Category.find().lean()
    let totalAmount = 0

    records.forEach(record => {
      totalAmount += record.amount
      categories.forEach(category => {
        if (category.id === Number(record.categoryId)) {
          return record.icon = category.icon
        }
      })
    })
    res.render('index', { records, totalAmount })
  }
  catch (err) {
    console.log('catch', err)
  }
})

module.exports = router