'use strict'
//Intanciar el modelo de base de datos
var ProyectoModelo = require('../models/project');
//Libreria de FileSystem
var fs = require('fs')
var path  = require('path');


//Archivo controlador para node
let controller = {
    home: function(req,res){
        return res.status(200).send({
            message: "Soy la home"
        })
    },

    test: function(req,res){
        return res.status(200).send({
            message: "Soy el metodo test"
        })
    },

    //Metodo para recuperar una peticion de guardar nuevo proyecto
    saveProject: function(req,res){
        let proyecto = new ProyectoModelo();

        //Asignar parametros al modelo
        let params = req.body;
        proyecto.name=params.name;
        proyecto.desc=params.desc;
        proyecto.category=params.category;
        proyecto.year=params.year;
        proyecto.langs=params.langs;
        proyecto.image=params.image;

        //Guardar en mongodb
        proyecto.save((err,stored)=>{
            console.log("Objeto guardado MongoDB...")
            if(err) return res.status(500).send({message:"Error al guardar el registro"});

            if(!stored) return res.status(404).send({message:"No se guardo el objeto"});
            
            return res.status(200).send({project: stored});
        })

       // return res.status(200).send({
         //   message: "Metodo save project",
           // response: proyecto
       // })
    },

    //Metodo para buscar y listar un objeto de la base de datos
    getProyect: function(req,res){
       let id = req.params.id; //Recuperar el parametro por la url

       ProyectoModelo.findById(id,(err,object)=>{
           if(err) return res.status(500).send({message:"Error al devolver los datos"});

           if(!object) return res.status(404).send({message: "El objeto no fue encontrado"});

           return res.status(200).send({
               project: object
           });
       })

    },
    //Buscar y Listar toda la coleccion de proyectos , parametros de busqueda opcionales
    allProyects: function(req,res){
        ProyectoModelo.find({}).exec((err,projects)=>{
            if(err) return res.status(500).send({message:"Error al devolver los datos"});
            if(!projects) return res.status(404).send({message: "No se encontraron los proyectos solicitados"});
            
            return res.status(200).send(projects); //Enviar todo el array de objetos
        })
    },

    //Metodo para buscar proyecto y actualizarlo en la base de datos
    editProyect: function(req,res){
        let proyecId= req.params.id;
        let pupdate=req.body;

        ProyectoModelo.findByIdAndUpdate(proyecId,pupdate, (err,updated)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!updated) return res.status(404).send({message: "No se encontro el proyecto solicitados"});
            return res.status(200).send({
                project: pupdate   
            });
        })
    },

     
    //Metodo para eliminar de la base de datos

    deleteProyect : function(req,res){
        let idobject = req.params.id;

        ProyectoModelo.findByIdAndDelete(idobject, (err,projectremove)=>{
            if (err) {
                
                return res.status(500).send({
                    message: "Error en la acción de borrar el proyecto"
                })
            }

            if(!projectremove){
                return res.status(500).send({
                    message: "No se encuentra el proyecto para borrarlo"
                })
            }

            else{
                return res.status(200).send({
                    project: projectremove 
                })
            }
        })
    },
        //Actualizar una imagen del proyecto
    uploadimage: function(req,res){
        let idproyect = req.params.id;
        let fileName = "Imagen sin cargar";
        //Verificar ficheros por la request
        if(req.files){
            let filepath = req.files.image.path; //Obtener el path de la imagen
            let fileSplit = filepath.split("\\"); //Separar 
            fileName = fileSplit[1]; //Obtener path id
            let extfileSplit = fileName.split("."); //Obtener la extension
            let extfile = extfileSplit[1];

            //Guardar fileId en base de datos
            if(extfile=="png" || extfile=="jpg" || extfile=="jpeg" || extfile=="gif"){
            ProyectoModelo.findByIdAndUpdate(idproyect, {image:fileName },{new:true} ,(err, updated)=>{ 
                if(err) return res.status(500).send({message: "Error en la peticion"})
                if (!updated) return res.status(404).send({message: "No se encuentra el proyecto solicitado"})

                if(updated){
                return res.status(200).send({
                    idFile: fileName,
                    updated
                }); }
            })
        } else{ //Borrar el archivo con extension incorrecta
            fs.unlink(filepath, (err)=>{
                return res.status(200).send({message: "La extension no es valida"});
            })
        }

        } else{
            return res.status(500).send({
                message: "Error"
            });
        }
    },

    //Obtener imagen del filesystem 
    getImageFile: function(req,res){
        let img=req.params.img;
        var path_file = "./uploads/"+img;
        
        fs.exists(path_file, (exits)=>{
            if(exits){
         return res.sendFile(path.resolve(path_file));
        } else{
          return res.status(404).send({
              message: "No se encuentra la imagen"
          })  
        }
        })
    }
    
};

//Metodos de servidor



module.exports = controller;