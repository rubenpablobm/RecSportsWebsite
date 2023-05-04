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

  eID : any =0;
  areas : any;

  getAreas() {
    // obtiene el id del edificio de la ruta
    const idEdificio = this.route.snapshot.paramMap.get('idEdificio');
    
    if (idEdificio === null) {
      this.eID = null;
    }else{
      this.eID = Number(idEdificio);
    }

    console.log(this.eID);
    
    console.log("voy a llamar a la API :)");
    return this.crudService.AreaGetXedificio(this.eID).subscribe((data : {}) => {
      console.log("Getting areas from ID edificio:" + this.eID);
      this.areas=data;
      console.log(this.areas)
    });
  }

  // obtener edificios en cada 

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getAreas();
      }
    });
  }

}
