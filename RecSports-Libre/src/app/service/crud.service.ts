import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Area } from '../models/area';
import { Edificio } from '../models/edificio';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  IdEdificio=1;
  API:string="http://localhost:5040/";
  
  mensajeAPI:string="";
  //API: string="angular-test.eastus.cloudapp.azure.com/libros/";
  constructor(private clientehttp:HttpClient) { 
    
  }
  /* EDIFICIO */
  EdificioGetMultiple():Observable<any>{
    return this.clientehttp.get<Edificio>(this.API+"edificio");
  }
  EdificioGet(id: number):Observable<any>{
    return this.clientehttp.get<Edificio>(this.API+"edificio/"+id);
  }
  EdificioPost(datosEdificio:Edificio):Observable<any>{
    return this.clientehttp.post(this.API+"edificio",datosEdificio);
  }
  EdificioUpdate(id: number, datosEdificio:Edificio):Observable<any>{
  return this.clientehttp.put<Edificio>(this.API+"edificio/"+ id, datosEdificio);
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

}
