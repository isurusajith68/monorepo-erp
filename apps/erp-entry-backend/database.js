import pkg from 'pg'

const { Pool } = pkg

export const pool = new Pool({
  user: 'erpuser',
  host: 'pgm-zf825f5m9z0ji68guo.rwlb.kualalumpur.rds.aliyuncs.com',
  database: 'ceyinfoerp',
  password: 'Dbuser1#2',
  port: 5432,
})
