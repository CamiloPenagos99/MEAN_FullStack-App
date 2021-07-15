import { Component, OnInit } from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/proyect.service";
import {Global} from "../../services/global";
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers:[ProjectService]
})
export class DetailComponent implements OnInit {
  public url:string;
  public proyecto:Project;
  public confirm:boolean;
  constructor(
    private _projectservice: ProjectService,
    private _router: Router,
    private _routeA:ActivatedRoute
  ) { 
    this.url=Global.url;
    this.confirm=false;
  }

  ngOnInit(): void {
    //Recoger parametro por URL
    this._routeA.params.subscribe(params=>{
      let id= params.id;

      this.getProject(id);
    })
  }
//Obtener el proyecto a detallar
  getProject(id){
    this._projectservice.getProjet(id).subscribe(res=>{
      this.proyecto=res.project;
      console.log("Proyecto actual", this.proyecto)
    }),
    err=>{
      console.log("Error get:" , err);
    }
  }

  //Eliminar proyecto del backend
    //Eliminar proyecto
    deleteProject(id){
      this._projectservice.deleteProject(id).subscribe(
        response =>{
          if(response.project){
            alert("Proyecto eliminado");
            console.log("Eliminando:", id);
            this._router.navigateByUrl('/proyectos');
          }

        },
        error=>{
          console.log("error al borrar:",error)
        }
        )
    }

    //Pedir confirmacion

    setconfirmation(confirm){
      this.confirm=confirm;
    }

}
