import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaInfoComponent } from './area-info/area-info.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',  // home
    component: HomeComponent
  },
  {
    path: 'area-info',
    component: AreaInfoComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,pathMatch: "full" 
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'admin', component: AdminComponent},
      {path: '', redirectTo: '/admin', pathMatch: 'full'},
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

