const pg = require('pg')
require('dotenv').config();

const pool = new pg.Pool({
  user: process.env.ENV_USER,
  host: process.env.ENV_HOST,
  database: process.env.ENV_DB,
  password: process.env.ENV_PASSWORD,
  port: 5432,
})

const getMemos = (request, response) => {
  pool.query('SELECT * FROM techsc.memo ORDER BY idmemo ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getMemoById = (request, response) => {

  pool.query('SELECT * FROM techsc.memo WHERE idmemo = $1', [request.params.id], (error, results) => {
    if (error) {
      response.status(500).json('DB Error')
    } else if(results.rowCount == 0) {
      response.status(500).json('No Data')
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const createMemo = (request, response) => {
  const { idmemo, title, note } = request.body

  pool.query('INSERT INTO techsc.memo (idmemo, title, note) VALUES ($1, $2, $3)', [idmemo, title, note], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${title}`)
  })
}

const updateMemo = (request, response) => {
  const idmemo = parseInt(request.params.id)
  const { title, note } = request.body

  pool.query(
    'UPDATE techsc.memo SET title = $1, note = $2 WHERE idmemo = $3',
    [title, note, idmemo],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${title}`)
    }
  )
}

const deleteMemo = (request, response) => {
  const idmemo = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [idmemo], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${idmemo}`)
  })
}

module.exports = {
  getMemos,
  getMemoById,
  createMemo,
  updateMemo,
  deleteMemo,
}