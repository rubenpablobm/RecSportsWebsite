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
  EdificioGet():Observable<any>{
    return this.clientehttp.get<Edificio>(this.API+"edificio");
  }
  /* AREA */
  AreaGetMultiple():Observable<any>{
    return this.clientehttp.get<Area>(this.API+"area");
  }
  AreaGetXedificio():Observable<any>{ //creo que este no es correcto todavia
    return this.clientehttp.get<Area>(this.API+"area/"+this.IdEdificio);
  }
  AreaGetXId(id: number):Observable<any>{
    return this.clientehttp.get<Area>(this.API+"area/" + id);
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
