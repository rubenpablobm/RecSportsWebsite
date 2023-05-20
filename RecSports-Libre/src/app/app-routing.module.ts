import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaInfoComponent } from './area-info/area-info.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AccesoComponent } from './components/acceso/acceso.component';

//import { CrudService } from './service/crud.service';
// inject, router
import { authGuard } from './service/auth.guard';

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

const routes: Routes = [
  {
    path: '',  // home
    //,pathMatch:'full',redirectTo: 'agregar-libro'
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
    path: 'admin/login',
    component: AdminComponent,pathMatch:'full'
  },
  {
    path: 'area-info/:idArea/acceso',
    component: AccesoComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }