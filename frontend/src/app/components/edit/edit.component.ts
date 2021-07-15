import { Component, OnInit } from '@angular/core';

//Importar modelo y servicios del modelo
import {Project} from "../../models/project"
import {ProjectService} from "../../services/proyect.service"
import {UploadService} from "../../services/upload.service"
import {Global} from "../../services/global"
//Importar servicios de rutas
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService,UploadService] //Proveedor de servicios
})
export class EditComponent implements OnInit {

  public title:string;
  public url:string;
  public proyecto:Project;
  public status:number;
  public filetoupload: Array<File>;
 
    constructor(
      private _projectService:ProjectService,
      private _UploadService:UploadService,
      private _router: Router,
      private _routeA:ActivatedRoute
    ) { 
      this.title="Editar el proyecto"
      this.status=0;
      this.url=Global.url;

      //Instancia el modelo de proyecto
     // this.proyecto= new Project ("","","","",-1,"","na");
    }

    ngOnInit(): void {
      //Recoger parametro por URL
      this._routeA.params.subscribe(params=>{
        let id= params.id;
  
        this.getProject(id);
      })
    }

  //Metodo para obtener el proyecto
  //Obtener el proyecto a detallar
  getProject(id){
    this._projectService.getProjet(id).subscribe(res=>{
      this.proyecto=res.project;
      console.log("Proyecto actual", this.proyecto)
    }),
    err=>{
      console.log("Error get:" , err);
    }
  }

  //Submit del formulario
  onSubmit(projectform){
    this._projectService.editProject(this.proyecto,this.proyecto._id).subscribe(res=>{
      console.log("Id:",this.proyecto._id);
      if(res.project){
        alert("¡Proyecto actualizado correctamente!");
        //subir imagen
        if(this.filetoupload){
        this._UploadService.
        makeFileRequest(Global.url+"uploadimage/"+res.project._id,[],this.filetoupload,"image")
        .then((result:any)=>{ //Capturar resolve
          console.log("Respuesta XHR:", result)
          this.proyecto=result.updated;
          console.log("Actualizado: " ,this.proyecto)
          this.status=1;
          //projectform.reset();
        })
        .catch((result:any)=>{console.log("Respuesta XHR erronea:", result)});
      }
      }else{
        this.status=-1;
      }
    }), err =>{
      console.error(err);
    }
  }
  
  //Evento que captura al subir imagen
  fileChangeEvent(fileInput:any){
    //Obtener archivo del fichero
    console.log("file:" ,fileInput);
    this.filetoupload = <Array<File>>fileInput.target.files;
  }
}
