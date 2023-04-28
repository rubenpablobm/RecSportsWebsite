import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-area-info',
  templateUrl: './area-info.component.html',
  styleUrls: ['./area-info.component.css', '../app.component.css']
})
export class AreaInfoComponent {

  constructor(private route: ActivatedRoute, private htttp: HttpClient, public crudService:CrudService ) { }

  aID : any = null;
  area : any = [];

  ngOnInit() {
    // obtiene el id del área de la ruta
    const idArea = this.route.snapshot.paramMap.get('idArea');
    this.aID = idArea;
    return this.crudService.AreaGetXId(this.aID).subscribe((data:{}) => {
      this.area = data;
      console.log(this.area);
    })
  }

}
