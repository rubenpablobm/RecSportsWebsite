import { Component } from '@angular/core';

import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  AreaList:any=[];
  constructor(public crudService:CrudService){ }
  getArea(){
    console.log("voy a llamar a la API :)");
    return this.crudService.AreaGetMultiple().subscribe((data:{})=>{
      console.log(data);
      this.AreaList=data;
    })
  }
}
