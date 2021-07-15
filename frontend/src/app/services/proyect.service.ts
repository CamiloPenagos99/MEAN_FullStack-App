import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../models/project'; 
import {Global} from './global';

//Servicio inyectable
@Injectable()
    export class ProjectService{
        public url:string;
    

        constructor(public _http: HttpClient){
            this.url=Global.url;
        }

        testservice(){
            return "probando el servicio de angular";
        }

        //Enviar-Guardar proyecto en base de datos

        saveProject(proyecto:Project):Observable<any>{
            let params = JSON.stringify(proyecto);
            let header = new HttpHeaders().set('Content-Type','application/json');
            console.log("Params:", params);
            return this._http.post(this.url+'addProject',params,{headers:header});
        }

        //Obtener todos los protectos
        getProjects():Observable<any>{
            let header = new HttpHeaders().set('Content-Type','application/json');

            return this._http.get(this.url+"allProjects",
            {headers:header});
        }

        //Obtener unico proyecto

        getProjet(id):Observable<any>{
            let header = new HttpHeaders().set('Content-Type','application/json');
            return this._http.get(this.url+"findProject/"+id,{headers: header} )
        }

        //Borrar proyecto

        deleteProject(id):Observable<any>{
            let header = new HttpHeaders().set('Content-Type','application/json');

            return this._http.delete(this.url+"deleteProyect/"+id,{headers: header})
        }


        //Editar proyecto

        public editProject(proyecto:Project,id):Observable<any>{
            let params = JSON.stringify(proyecto)
            let header = new HttpHeaders().set('Content-Type','application/json');

            return this._http.put(this.url+"updateProject/"+id,params,{headers: header})
        }
    }

