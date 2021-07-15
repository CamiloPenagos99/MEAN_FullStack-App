'use stric'
//Archivo de routing para el backend
let express = require("express");
let projectController = require("../controllers/project"); 
let router = express.Router();

//Middleware de multipart, trabajar con archivos

let multipart = require("connect-multiparty");
let middleware = multipart({uploadDir: "./uploads"});

//Definir las URI ( rutas de conexion)
router.get("/home",projectController.home);
router.post("/test",projectController.home);
router.post("/addProject",projectController.saveProject); //Añadir nuevo proyecto
router.get("/findProject/:id",projectController.getProyect);
router.get("/allProjects",projectController.allProyects);
router.put("/updateProject/:id",projectController.editProyect);
router.delete("/deleteProyect/:id",projectController.deleteProyect);
router.post("/uploadimage/:id",middleware,projectController.uploadimage); //Endpoint para subir archivo
router.get("/getImage/:img",projectController.getImageFile); //Enviar imagen del servidor

module.exports = router;
