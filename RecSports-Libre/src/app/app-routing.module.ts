import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaInfoComponent } from './area-info/area-info.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { EditarEdificioComponent } from './components/editar-edificio/editar-edificio.component';
import { AgregarEdificioComponent } from './components/agregar-edificio/agregar-edificio.component';

const routes: Routes = [
  {
    path: '',  // home
    component: HomeComponent
  },
  {
    path: ':idEdificio',
    component: HomeComponent
  },
  {
    path: 'area-info/:idArea',
    component: AreaInfoComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,pathMatch: "full" 
  },
  {
    path: 'area-info/:idArea/acceso',
    component: AccesoComponent,
  },
  {
    path: 'edificio/:idEdificio',
    component: EditarEdificioComponent,
  },
  {
    path: 'edificio-CRUD/agregar',
    component: AgregarEdificioComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

