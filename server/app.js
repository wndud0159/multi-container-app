const express = require('express')

const db = require('./db')

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())

// db.pool.query(`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// );`, (err, results, fileds) => {
//     console.log(results)
// })

app.get('/api/values', (req, res) => {
    db.pool.query(`SELECT * FROM lists;`,
        (err, results, fields) => {
            if (err) return res.status(500).send(err)
            else return res.json(results)
    })
})

app.post('/api/value', (req, res) => {
    db.pool.query(`INSERT INTO (value) VALUES("${req.body.value}");`,
        (err, results, fields) => {
            if (err) return res.status(500).send(err)
            else return res.json({
                success: true, value: req.body.value
            })
        })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))