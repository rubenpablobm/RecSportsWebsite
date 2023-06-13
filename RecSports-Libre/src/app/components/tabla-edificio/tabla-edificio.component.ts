import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-edificio',
  templateUrl: './tabla-edificio.component.html',
  styleUrls: ['./tabla-edificio.component.css']
})
export class TablaEdificioComponent {

    // Variables
    @Input() descripcion! : string;
    @Output() linkFoto = new EventEmitter<string>();
    //@Output() reloadSignal = new EventEmitter<void>();
    foto? :string = "https://www.arquired.com.mx/wp-content/uploads/2017/05/campustecmtywh.jpg";
    eID : number = 0;
    listaEdificios : any = [];
  
    constructor(public crudService:CrudService, private router: Router){ }
  
    // Metodo que obtiene los edificios al inicializar el componente
    ngOnInit() {
      this.getEdificios();
      console.log(this.linkFoto);
    }
    
    // Metodo que obtiene los edificios desde el servicio
    getEdificios() {
      console.log('Generando dropdown de navbar...')
      return this.crudService.EdificioGetMultiple().subscribe((data:{}) => {
        console.log(data);
        this.listaEdificios = data;
      })
    }
  
    // Metodo que recibe la URL de la foto seleccionada
    recibirFoto($event : string){
      this.foto = $event;
    }
   
    // Metodo que envia la URL de la foto seleccionada mediante un evento
    enviarFoto(foto : string) {
      this.linkFoto.emit(foto);
    }

    borrarRegistro(idEdificio: any, nombreEdificio: any){
      console.log(idEdificio);
      if(window.confirm("Realmente deseas eliminar el edificio "+nombreEdificio)){
        this.crudService.EdificioDelete(idEdificio).subscribe(respuesta =>{
          // Para actualizar la lista de libros en el template
          // this.listaEdificios = this.listaEdificios.filter((edificio: any) => edificio.IdEdificio !== idEdificio);
          console.log(this.listaEdificios);
        })
      }
      this.router.navigateByUrl('');
    }
   
}
