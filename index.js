const axios = require('axios')
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use('/static', express.static(__dirname + '/public/'))

const PORT = 3000
const HOST = `http://localhost:${PORT}`

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`Server is live and listening at ${HOST}`)
})
