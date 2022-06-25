const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const User = require('../user')
const Record = require('../record')
const records = require('../seeds/records.json')

const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    records: records.slice(0, 2)
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    records: records.slice(2, 5)
  }
]

db.once('open', async () => {
  try {
    for (let i in SEED_USERS) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(SEED_USERS[i].password, salt)
      const user = await User.create({
        name: SEED_USERS[i].name,
        email: SEED_USERS[i].email,
        password: hash
      })
      const userId = user._id
      for (let j in SEED_USERS[i].records) {
        const record = SEED_USERS[i].records[j]
        record.userId = userId
        await Record.create(record)
      }
    }
    console.log('done!')
  }
  catch (err) {
    console.log('catch', err)
  }
  finally {
    process.exit()
  }
})