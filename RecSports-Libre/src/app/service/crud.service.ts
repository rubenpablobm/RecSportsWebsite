/* Descripcion de crud.service.ts: programa que define la logica del servicio "crud.service". 
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 05/05/2023
Fecha de modificacion: 15/06/2023 */

// Declaracion de importaciones
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../models/area';
import { Edificio } from '../models/edificio';
import { Admin } from '../models/admin';
import { Fecha } from '../models/fecha';

//Injector del servicio
@Injectable({
  providedIn: 'root'
})

export class CrudService {
  IdEdificio=1;
  API:string="http://localhost:5040/";
  mensajeAPI:string="";
  // Datos del admin
  logeado:Boolean=false;
  emailString? : string;
  constructor(private clientehttp:HttpClient) { }
  
  /* EDIFICIO */

  // Obtener multiples edificios
  EdificioGetMultiple():Observable<any>{
    return this.clientehttp.get<Edificio>(this.API+"edificio");
  }

  // Obtener un edificio por su ID
  EdificioGet(id: number):Observable<any>{
    return this.clientehttp.get<Edificio>(this.API+"edificio/"+id);
  }

  // Agregar un nuevo edificio
  EdificioPost(datosEdificio:Edificio):Observable<any>{
    return this.clientehttp.post(this.API+"edificio",datosEdificio);
  }

  // Actualizar un edificio existente
  EdificioUpdate(id: number, datosEdificio:Edificio):Observable<any>{
    return this.clientehttp.put<Edificio>(this.API+"edificio/"+ id, datosEdificio);
  }

  EdificioDelete(id: number){
    return this.clientehttp.delete(this.API+"edificio/"+id)
  };

  /* AREA */
 
  AreaGet(id: number):Observable<any>{
    return this.clientehttp.get<Area>(this.API+"area/"+id);
  }

  // Actualizar area
  AreaUpdate(id: number, datosArea:Area):Observable<any>{
    return this.clientehttp.put<Area>(this.API+"area/"+ id, datosArea);
  }

  // Obtener multiples areas
  AreaGetMultiple():Observable<any>{
    return this.clientehttp.get<Area>(this.API+"area/");
  }

  // Obtener areas por ID de edificio
  AreaGetXedificio(id: number):Observable<any>{
    if (id === 0) {
      return this.AreaGetMultiple();
    }
    else {
      return this.clientehttp.get<Area>(this.API + "area/xedificio/" + id);
    }
  }

  // Obtener un area por su ID
  AreaGetXId(id: number):Observable<any>{
    return this.clientehttp.get<Area>(this.API + "area/" + id);
  }

  // Agregar un nuevo area
  AreaPost(datosArea:Area):Observable<any>{
    return this.clientehttp.post(this.API+"area",datosArea);
  }

  AreaDelete(id: number){
    return this.clientehttp.delete(this.API+"area/"+id);
  }

  /* REGISTRO */

  // Incrementar el aforo de un area
  MasAforo(id: number):Observable<any>{
    return this.clientehttp.get(this.API+"area/masaforo/"+id);
  }

  // Decrementar el aforo de un area
  MenosAforo(id: number):Observable<any>{
    return this.clientehttp.get(this.API+"area/menosaforo/"+id);
  }

  // Resetea a 0 el aforo
  LimpiarAforo(id: number):Observable<any>{
    return this.clientehttp.get(this.API+"area/limpiaraforo/"+id);
  }
  /* ADMIN */

  AdminLogin(datosAdmin:Admin):Observable<any>{
    this.logeado=false;
    this.emailString = datosAdmin.correo;
    return this.clientehttp.post(this.API+"admin/iniciosesion", datosAdmin);
  }

  AdminLoginAuth(){
    this.logeado=true;
  }

  EstaLogeado(){
    return this.logeado;
  }

  EstaLogeadoEmail(){
    //Ya tiene la proteccion de la misma pagina que incluye esta funcion
    return this.emailString;
  }

  AdminLogout(){
    this.logeado = false;
    this.emailString = undefined;
    return this.logeado
  }

  /* CAMBIO CONTRASEÑA */

  CambioContraseña(datosAdmin:Admin):Observable<any>{
   this.logeado=false;
   return this.clientehttp.put(this.API+"admin/cambiocontra", datosAdmin);
  }

  /* ESTADISTICA */

  HoraGet(id: number, fechaRange: Fecha):Observable<any>{
    if(id!=0){
      return this.clientehttp.post(this.API + "estadistica/hora/" + id, fechaRange);
    }else{
      return this.clientehttp.post(this.API+"estadistica/hora", fechaRange);
    }
  }

  DiaGet(id: number, fechaRange: Fecha):Observable<any>{
    if(id!=0){
      return this.clientehttp.post(this.API + "estadistica/dia/" + id, fechaRange);
    }else{
      return this.clientehttp.post(this.API+"estadistica/dia", fechaRange);
    }
    
  }
}
