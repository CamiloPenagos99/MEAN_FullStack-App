//Modulos de rutas de angular
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

//Crear las rutas para los componentes
const appRoutes: Routes = [
    {path: "" , component: AboutComponent},
    {path: "sobre-mi" , component: AboutComponent},
    {path: "proyectos" , component: ProjectsComponent},
    {path: "crear-proyecto" , component: CreateComponent},
    {path: "contacto" , component: ContactComponent},
    {path: "detalle/:id" , component: DetailComponent},
    {path: "editar/:id" , component: EditComponent},
    {path: "**" , component: ErrorComponent},
]

//Exportar modulo de routing
export const appRoutingProviders: any[]=[]; //Servicio interno de ruta
//Cargar la configuracion de rutas en el modulo de router
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);