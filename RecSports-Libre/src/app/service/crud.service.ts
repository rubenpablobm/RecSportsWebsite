import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Area } from '../models/area';
import { Edificio } from '../models/edificio';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  IdEdificio=1;
  API:string="http://localhost:5040/";
  
  mensajeAPI:string="";

  logeado:Boolean=false;
  //API: string="angular-test.eastus.cloudapp.azure.com/libros/";
  constructor(private clientehttp:HttpClient) { 
    
  }
  /* EDIFICIO */
  EdificioGet():Observable<any>{
    return this.clientehttp.get<Edificio>(this.API+"edificio");
  }
  /* AREA */
  AreaGetMultiple():Observable<any>{
    return this.clientehttp.get<Area>(this.API+"area/");
  }
  AreaGetXedificio(id: number):Observable<any>{
    if (id === 0) {
      return this.AreaGetMultiple();
    }
    else {
      return this.clientehttp.get<Area>(this.API + "area/xedificio/" + id);
    }
  }
  AreaGetXId(id: number):Observable<any>{
    return this.clientehttp.get<Area>(this.API + "area/" + id);
  }
  AreaPost(datosArea:Area):Observable<any>{
    return this.clientehttp.post(this.API+"area",datosArea);
  }
  /* REGISTRO */
  MasAforo(id: number):Observable<any>{
    return this.clientehttp.get(this.API+"area/masaforo/"+id);
  }
  MenosAforo(id: number):Observable<any>{
    return this.clientehttp.get(this.API+"area/menosaforo/"+id);
  }

  /* ADMIN */
  AdminLogin(datosAdmin:Admin):Observable<any>{
    this.logeado=true;
    return this.clientehttp.post(this.API+"admin/iniciosesion", datosAdmin);
  }
  EstaLogeado(){
    return this.logeado
  }
  AdminLogout(){
    this.logeado = false;
    return this.logeado
  }

}
