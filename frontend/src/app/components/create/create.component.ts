import { Component, OnInit } from '@angular/core';
//Importar modelo y servicio del modelo
import {Project} from "../../models/project"
import {ProjectService} from "../../services/proyect.service"
import {UploadService} from "../../services/upload.service"
import {Global} from "../../services/global"

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService,UploadService]
})
export class CreateComponent implements OnInit {

  public title:string;
  public proyecto:Project;
  public status:number;
  public filetoupload: Array<File>;
    constructor(
      private _projectService:ProjectService,
      private _UploadService:UploadService
    ) { 
      this.title="Añadir un nuevo Proyecto"
      this.status=0;
      //Instancia el modelo de proyecto
      this.proyecto= new Project ("","","","",-1,"","na");
    }

    ngOnInit(): void {
    }

    //Submit del formulario
    onSubmit(projectform){
      console.log("Formulario:",this.proyecto);
      //Guardar proyecto en el backend
      //Suscribrise al observable de respuesta
      this._projectService.saveProject(this.proyecto).subscribe(res=>{
        console.log("Respuesta:",res);
        if(res.project){
          
          alert("¡Proyecto añadido correctamente!");
          //subir imagen
          if(this.filetoupload){
          this._UploadService.
          makeFileRequest(Global.url+"uploadimage/"+res.project._id,[],this.filetoupload,"image").then((result:any)=>{
            console.log("Respuesta XHR:", result)
            this.status=1;
            projectform.reset();
          });
          //projectform.reset();
        }}else{
          this.status=-1;
        }
      }), err =>{
        console.error(err);
      }
    }

    fileChangeEvent(fileInput:any){
      //Obtener archivo del fichero
      console.log(fileInput);
      this.filetoupload = <Array<File>>fileInput.target.files;
    }

}
