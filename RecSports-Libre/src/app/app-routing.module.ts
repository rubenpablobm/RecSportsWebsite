import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AreaInfoComponent } from './area-info/area-info.component';

const routes: Routes = [
  {
    path: '',  // home
    component: AppComponent
  },
  {
    path: 'area-info',
    component: AreaInfoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
