import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaInfoComponent } from './area-info/area-info.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { VisComponent } from './vis/vis.component';
import { CompComponent } from './comp/comp.component';
import { EdtComponent  } from './edt/edt.component';

const routes: Routes = [
  {
    path: '',  // home
    component: HomeComponent
  },
  {
    path: ':idEdificio',
    component: HomeComponent
  },
  {path: ':comp',
  component: CompComponent
  },
  {path: ':edt',
  component: EdtComponent 
  },
  {
    path: 'area-info/:idArea',
    component: AreaInfoComponent
  },
  {
    path: 'admin/login',
    component: AdminComponent
  },
  {
    path: 'vis/tt',
    component: VisComponent
  },
  {
    path: 'area-info/:idArea/acceso',
    component: AccesoComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

