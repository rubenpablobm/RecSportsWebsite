import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../models/area';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  IdEdificio=1;
  API:string="http://localhost:5040/area/";
  //API: string="angular-test.eastus.cloudapp.azure.com/libros/";
  constructor(private clientehttp:HttpClient) { 
    
  }
  AreaGetMultiple():Observable<any>{
    return this.clientehttp.get<Area>(this.API);
  }
  AreaGetXedificio():Observable<any>{
    return this.clientehttp.get<Area>(this.API+""+this.IdEdificio);
  }
  AreaPost(datosArea:Area):Observable<any>{
    return this.clientehttp.post(this.API+"",datosArea);
  }
}
