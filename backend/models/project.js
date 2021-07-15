'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

//Crear esquemas o molde en la base de datos

let instancia = new schema({
   name:String,
   desc:String,
   category:String,
   year:Number,
   langs:String,
   image: String
})

//Guardar el esquema enlazando la conexion projects(colección)
module.exports = mongoose.model("projects",instancia);