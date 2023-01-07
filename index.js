const axios = require('axios').default
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use('/static', express.static(__dirname + '/public/'))

const PORT = 3000
const HOST = `http://localhost:${PORT}`
const DATA_URL = 'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json'

app.get('/', (req, res) => {
    axios.get(DATA_URL, {})
        .then((response) => {
            const posts = response.data.map((post) => {
                return {
                    'author': post.author,
                    'date': convertToDate(post._start_day, post._start_month, post._start_year, true),
                    'link': post.link,
                    'title': post.title.rendered,
                    'type': post.type,
                }
            })
            res.render('index', { posts })
        })
        .catch((err) => {
            console.log(`Error occured while fetching blog posts: ${err}`)
            res.redirect('/error')
        })
})

app.get('/error', (res, req) => {
    res.render('error')
})

app.listen(PORT, () => {
    console.log(`Server is live and listening at ${HOST}`)
})

function convertToDate(day, month, year, monthAsWord) {
    const dateMonth = monthAsWord ? convertMonthToWord(month) : month;
    return `${day} ${dateMonth} ${year}`
}

function convertMonthToWord(month) {
    switch (Number.parseInt(month)) {
        case 1: return month = 'January'
        case 2: return month = 'February'
        case 3: return month = 'March'
        case 4: return month = 'April'
        case 5: return month = 'May'
        case 6: return month = 'June'
        case 7: return month = 'July'
        case 8: return month = 'August'
        case 9: return month = 'September'
        case 10: return month = 'October'
        case 11: return month = 'November'
        case 12: return month = 'December'
        default: return month = 'N/A'
    }
}
