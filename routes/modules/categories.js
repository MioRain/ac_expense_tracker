const express = require('express')
const Record = require('../../models/record')
const Category = require('../../models/category')
const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const id = req.params.id
    const records = await Record.find({ categoryId: id, userId }).lean()
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