import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CrudService } from '../service/crud.service';


@Component({
  selector: 'app-edt',
  templateUrl: './edt.component.html',
  styleUrls: ['./edt.component.css']
})
export class EdtComponent {
  @Input() nomedf? :string;
  //@Output() reloadSignal = new EventEmitter<void>();

  ngOnInit() {
    this.getEdificios();
    console.log(this.nomedf);
  }
  
  listaEdificios : any = [];
  
  constructor(public crudService:CrudService){ }
  
  getEdificios() {
    console.log('Generando dropdown de navbar...')
    return this.crudService.EdificioGet().subscribe((data:{}) => {
      console.log(data);
      this.listaEdificios = data;
    })
  }

}
