/* Descripcion de app-routing.module.ts: modulo que define la logica del enrutamiento. 
Su proposito es definir las rutas manejadas en la aplicacion. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Jesús Sebastián Jaime Oviedo
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 13/06/2023 */

// Declaracion de importaciones
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaInfoComponent } from './area-info/area-info.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { EditarEdificioComponent } from './components/editar-edificio/editar-edificio.component';
import { AgregarEdificioComponent } from './components/agregar-edificio/agregar-edificio.component';

import { CompComponent } from './comp/comp.component';
import { DescargarHistoricoComponent } from './components/descargar-historico/descargar-historico.component';
import { SubirAlumnosComponent } from './components/subir-alumnos/subir-alumnos.component';

import { authGuard } from './service/auth.guard';
import { TablaEdificioComponent } from './components/tabla-edificio/tabla-edificio.component';
import { CambioContrasenaComponent } from './components/cambio-contrasena/cambio-contrasena.component';
import { EditarAreaComponent } from './components/editar-area/editar-area.component';

//Definicion de cada ruta
const routes: Routes = [
  {
    path: '',  // Ruta principal (home)
    component: HomeComponent
  },
  {
    path: ':idEdificio', // Ruta con parametro dinamico
    component: HomeComponent
  },
  {path: ':comp', // Ruta con parametro dinamico
  component: CompComponent
  },
  {path: ':cambio/contrasena', // Ruta con parametro dinamico
  component: CambioContrasenaComponent,
  canActivate: [authGuard]
  },
  {
    path: 'area-info/:idArea', // Ruta con parametro dinamico
    component: AreaInfoComponent
  },
  {
    path: 'editar-area/editar/:idArea', // Ruta con parametro dinamico
    component: EditarAreaComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/login', // Ruta para el componente de administracion de inicio de sesion
    component: AdminComponent,
    pathMatch:'full'
  },
 
  {
    path: 'area-info/:idArea/acceso', // Ruta con parametro dinamico
    component: AccesoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edificio-editar/:idEdificio', // Ruta con parametro dinamico
    component: EditarEdificioComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'edificio-tabla/tabla', // Ruta con parametro dinamico
    component: TablaEdificioComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edificio-agregar/agregar', // Ruta para agregar un edificio
    component: AgregarEdificioComponent,
    canActivate: [authGuard]
  },
  {
    path: 'historico/descargar',
    component: DescargarHistoricoComponent,
    pathMatch:'full',
    canActivate: [authGuard]
  },
  {
    path: 'alumnos/subir-archivo',
    component: SubirAlumnosComponent,
    pathMatch:'full',
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), // Configuracion de enrutamiento
  ],
  exports: [RouterModule] // Exportacion del modulo de enrutamiento
})

export class AppRoutingModule { }