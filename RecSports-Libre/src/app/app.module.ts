import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { AreaCardComponent } from './area-card/area-card.component';
import { AreaInfoComponent } from './area-info/area-info.component';
import { HomeComponent } from './home/home.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { EditarEdificioComponent } from './components/editar-edificio/editar-edificio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgregarEdificioComponent } from './components/agregar-edificio/agregar-edificio.component';
// import { MatDialogModule } from '@angular/material/dialog'
import { VisComponent } from './vis/vis.component';
import { CompComponent } from './comp/comp.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    AreaCardComponent,
    AreaInfoComponent,
    HomeComponent,
    AdminComponent,
    AdminNavbarComponent,
    AccesoComponent,
    EditarEdificioComponent,
    AgregarEdificioComponent
    VisComponent,
    CompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule, //nuevos añadidos
    ReactiveFormsModule,
    HttpClientModule,
    // MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }