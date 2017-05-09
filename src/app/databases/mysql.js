import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'rm-2ze8e8qzj6aa54837o.mysql.rds.aliyuncs.com',
  database: 'zgamedaer',
  user: 'root',
  password: 'Tczkj110',
})

export default pool
