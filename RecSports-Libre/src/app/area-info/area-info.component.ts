import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../service/crud.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-area-info',
  templateUrl: './area-info.component.html',
  styleUrls: ['./area-info.component.css', '../app.component.css']
})
export class AreaInfoComponent {

  constructor(private route: ActivatedRoute, private htttp: HttpClient, public crudService:CrudService, private sanitizer: DomSanitizer) { }

  aID : any = null;
  area : any = [];
  linkCalendar!: string; 
  secureLinkCalendar: any = null;

  ngOnInit() {
    // obtiene el id del área de la ruta
    const idArea = this.route.snapshot.paramMap.get('idArea');
    this.aID = idArea;
    return this.crudService.AreaGetXId(this.aID).subscribe((data:{}) => {
      this.area = data;
      this.linkCalendar = this.area.LinkCalendar;
      this.secureLinkCalendar = this.sanitizer.bypassSecurityTrustResourceUrl(this.linkCalendar);
      console.log(this.area);
      console.log(this.area.LinkCalendar);
    })
  }

}
