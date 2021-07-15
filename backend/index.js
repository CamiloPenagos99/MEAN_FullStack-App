'use strict'
let mongoose = require('mongoose');
const app = require('./app');
const port = 3800;

//Crear promesa de conexion
//mongoose.Promise = glogal.Promise;

//Conectarse a la base de datos

mongoose.connect("mongodb://localhost:27017/portafoliodb")
.then(()=>{
    console.log("Conexion a base de datos OK");

    //Creacion del servidor
    //Ejecutar el servidor
    app.listen(port, ()=>{
        console.log("Servidor OK en", port);
    })
    
})
.catch((err)=>console.error(err));

//Crear servidor con Express

