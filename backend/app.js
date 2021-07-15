'use strict'
//Importar dependencias
let express = require("express");
let bodyParser = require("body-parser");

//Importar archivos de rutas
let project_routes = require("./routes/project");


//Crear express app web
let app = express();

//Rutas

/*/Ruta de prueba
app.get('/test', (req,res)=>{
    res.status(200).send({
        message: "Hola Mundo, Api en NodeJS OK"
    })
});

app.get('/', (req,res)=>{
    res.status(200).send("<h2>Welcome to Node JS</h2>")
}); /*/

//Configuracion de CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //Origenes permitidos
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use("/api",project_routes); //Cargar rutas, asignar prefijo de ruta


//Exportar modulo
module.exports = app;