import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent {
  
  constructor(private route: ActivatedRoute, private http: HttpClient, public crudService:CrudService, private router: Router ) {}

  eID : any = 0;
  areas : any;

  foto? :string = "https://www.arquired.com.mx/wp-content/uploads/2017/05/campustecmtywh.jpg";

  getAreas() {
    // obtiene el id del edificio de la ruta
    const idEdificio = this.route.snapshot.paramMap.get('idEdificio');
    
    if (idEdificio === null) {
      this.eID = null;
    }else{
      this.eID = Number(idEdificio);
    }
    
    return this.crudService.AreaGetXedificio(this.eID).subscribe((data : {}) => {
      console.log("Getting areas from ID edificio:" + this.eID);
      this.areas=data;
      //console.log(this.areas)
    });
  }

  // obtener edificios en cada 

  ngOnInit() {
    if(this.areas===undefined){ //si entra en la pagina, sin haber clickeado el dropdown, tendra la lista de areas
      this.getAreas();
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getAreas();
      }
    });
    console.log(this.areas);
  }

  recibirFoto($event : string){
    this.foto = $event;
  }

}
/*
  realoadData() {
    console.log('Actualizando home...')
    this.areas=null;
    console.log('Áreas:')
    this.getAreas();
    const idEdificio = this.route.snapshot.paramMap.get('idEdificio');
    if (idEdificio === null || idEdificio === '0') {
      this.foto = '../assets/images/wellness-center.jpeg'
    }
  }
  (reloadSignal)="realoadData()"
  */