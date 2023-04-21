import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {path: 'admin',
  component: AdminComponent,pathMatch: "full" },
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

