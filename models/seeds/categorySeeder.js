const db = require('../../config/mongoose')
const Category = require('../category')

const SEED_CATEGORIES = [
  {
    id: 1,
    name: '家居物業',
    icon: 'fa-solid fa-house'
  },
  {
    id: 2,
    name: '交通出行',
    icon: 'fa-solid fa-van-shuttle'
  },
  {
    id: 3,
    name: '休閒娛樂',
    icon: 'fa-solid fa-face-grin-beam'
  },
  {
    id: 4,
    name: '餐飲食品',
    icon: 'fa-solid fa-utensils'
  },
  {
    id: 5,
    name: '其他',
    icon: 'fa-solid fa-pen>'
  }
]

db.once('open', async () => {
  try {
    await Category.create(SEED_CATEGORIES)
    console.log('done!')
  }
  catch (err) {
    console.log('catch', err)
  }
  finally {
    process.exit()
  }
})