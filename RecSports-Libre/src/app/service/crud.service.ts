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
  AreaGet():Observable<any>{
    return this.clientehttp.get<AreaAPI>(this.API);
  }
  AreaPost(datosAreaAPI:AreaAPI):Observable<any>{
    return this.clientehttp.post(this.API+"",datosAreaAPI);
  }
}
