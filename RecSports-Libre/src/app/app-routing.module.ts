/* Descripcion de app-routing.module.ts: modulo que define la logica del enrutamiento. 
Su proposito es definir las rutas manejadas en la aplicacion. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 19/05/2023 */

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

//import { CrudService } from './service/crud.service';
// inject, router
import { authGuard } from './service/auth.guard';
import { TablaEdificioComponent } from './components/tabla-edificio/tabla-edificio.component';
import { CambioContrasenaComponent } from './components/cambio-contrasena/cambio-contrasena.component';


/*
const authGuard = () => {
  const authService = inject(CrudService)
  const router = inject(Router)

  if (authService.EstaLogeado()) {
      console.log("Checó tu LogIn exitoso para entrar");
      return true
  }

  return router.navigate(['/login'])
}
*/

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
  component: CambioContrasenaComponent
  },
  {
    path: 'area-info/:idArea', // Ruta con parametro dinamico
    component: AreaInfoComponent
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
    path: 'edificio/:idEdificio', // Ruta con parametro dinamico
    component: EditarEdificioComponent,
  },
 { path: 'components/tabla', // Ruta con parametro dinamico
  component: TablaEdificioComponent,
  },
  {
    path: 'edificio-CRUD/agregar', // Ruta para agregar un edificio
    component: AgregarEdificioComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), // Configuracion de enrutamiento
  ],
  exports: [RouterModule] // Exportacion del modulo de enrutamiento
})

export class AppRoutingModule { }