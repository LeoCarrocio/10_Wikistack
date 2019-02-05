let express = require('express')
let morgan = require('morgan')
let app = express()
let bodyParser = require('body-parser')
let nunjucks = require('nunjucks')

let env = nunjucks.configure('views', { noCache: true });


app.set('view engine', 'html');
app.engine('html', nunjucks.render);


app.use(morgan('tiny'))

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('index')
})

app.listen('3000', () => {
    console.log('Listening at port 3000')
})