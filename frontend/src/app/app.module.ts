import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Modulo de rutas
import {routing, appRoutingProviders} from "./app.routing";
//Moudulo de peticiones http
import {HttpClientModule} from "@angular/common/http";

//Modulo de two data bilding y formularios
import {FormsModule} from "@angular/forms";

//Componentes de la app
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { InfocontactoComponent } from './components/infocontacto/infocontacto.component';
import { ResaltadoDirective } from './resaltado.directive';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsComponent,
    CreateComponent,
    ContactComponent,
    ErrorComponent,
    DetailComponent,
    EditComponent,
    InfocontactoComponent,
    ResaltadoDirective
  ],
  imports: [ //Importar los modulos
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [appRoutingProviders], //Servicios de routing
  bootstrap: [AppComponent]
  
})
export class AppModule { }
