import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-area-info',
  templateUrl: './area-info.component.html',
  styleUrls: ['./area-info.component.css', '../app.component.css']
})
export class AreaInfoComponent {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // obtiene el id del área de la ruta
    const idArea = this.route.snapshot.paramMap.get('idArea');
    console.log('ID del área: ' + idArea);
  }

}
