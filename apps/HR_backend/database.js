const { Pool } = require('pg')

const pool = new Pool({
  user: 'erpuser',
  host: 'pgm-zf825f5m9z0ji68guo.rwlb.kualalumpur.rds.aliyuncs.com',
  database: 'ceyinfoerp',
  password: 'Dbuser1#2',
  port: 5432,
})

// const createTable = `CREATE TABLE dilanga (
//   brand VARCHAR(255),
//   model VARCHAR(255),
//   year INT
// );`

// pool.query(createTable).then((Response) => {
//     console.log('table created')
//     console.log(Response)
// }).catch((err) => {
//     console.log(err)
// })

module.exports = pool
