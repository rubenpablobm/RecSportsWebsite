import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AreaAPI } from '../models/areaAPI';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  API:string="http://localhost:5040/area/";
  //API: string="angular-test.eastus.cloudapp.azure.com/libros/";
  constructor(private clientehttp:HttpClient) { 
    
  }
  AgregarLibro(datoslibro:Libro):Observable<any>{
    //se inserta datos de libro
    return this.clientehttp.get(this.API+"?insertar=1",datoslibro);
  }
}
