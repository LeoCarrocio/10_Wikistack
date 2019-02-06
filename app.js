let express = require('express')
let morgan = require('morgan')// me dice por consola q ruta y metodo se fueron invocados 
let app = express()// enrutador de libreria de expres
let bodyParser = require('body-parser')// parsea todo a json 
let nunjucks = require('nunjucks')// lo que permite escribir sobre html
let models = require('./models'); //requiere lo modelos de la base de datos
let db = models.db// lo mimo que arriba  
let routes = require('./routes')// todas mis rutas 

app.use(morgan('tiny'))// ejecuto morgan con la infotmacion basica
app.use(express.static('public'));// declaro la ruta estatica que esta en la carpeta public 
nunjucks.configure('views', { noCache: true }); // donde encontrar las views
app.engine('html', nunjucks.render); // como renderear templates html
app.set('view engine', 'html'); // que extensiones de archivo tienen los templates
app.use(bodyParser.urlencoded({ extended: false }))
app.use( bodyParser.json()); // parseo todo a json lo que me trae de las pag
app.use('/', routes)//renderizo a mis rutas 




db.sync({force: false})// sincronizo mi data base, y lo colocon en true asi cuando se reinicie el serv se reinicie el puerto 
    .then(function () {  // despues  pongo a escuchar en el puerto 3000
        app.listen(3000, function () {
            console.log('Server is listening on port 3001!');// y despues consolog que funciona bien 
        });
    })
    .catch(console.error);// si hay un error me lo consologuea