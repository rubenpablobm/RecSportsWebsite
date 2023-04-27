import { Component, Input, HostListener } from '@angular/core';
import { Edificio } from '../models/edificio';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../app.component.css']
})
export class NavbarComponent {

  ngOnInit() {
    this.getEdificios();
  }
  
  listaEdificios : any = [];
  
  constructor(public crudService:CrudService){ }
  
  getEdificios() {
    console.log('Llamando edificios...')
    return this.crudService.EdificioGet().subscribe((data:{}) => {
      console.log(data);
      this.listaEdificios = data;
    })
  }

}
