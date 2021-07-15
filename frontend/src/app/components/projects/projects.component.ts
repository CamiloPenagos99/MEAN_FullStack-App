import { Component, OnInit } from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/proyect.service";
import {Global} from "../../services/global";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
 public proyectos: Project[];
 public url:string;
  constructor(
    private _projectservice:ProjectService
  ) { 
    this.url=Global.url;
  }

  ngOnInit(): void {
    //Cargar el metodo al ejecutar el componente
    this.getProjects()
  }
//Obtener todos los proyectos del api rest
  getProjects(){
    this._projectservice.getProjects().subscribe(
      response=>{
        console.log(response)
        if(response){
          //asignar respuesta al array de proyectos
          this.proyectos=response;
          console.log("Respuesta Get", response)
        }
       
      },
      error=>{
        console.log("Error Get", error)
      }
    )
  }

}
