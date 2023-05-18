import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-vis',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.css']
})
export class VisComponent {

  foto? :string = "https://www.arquired.com.mx/wp-content/uploads/2017/05/campustecmtywh.jpg";

  @Input() descripcion! : string;
  @Output() linkFoto = new EventEmitter<string>();
  //@Output() reloadSignal = new EventEmitter<void>();

  ngOnInit() {
    this.getEdificios();
    console.log(this.linkFoto);
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
  recibirFoto($event : string){
    this.foto = $event;
  }
 
  enviarFoto(foto : string) {
    this.linkFoto.emit(foto);
  }
 

  
}
