import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from 'src/app/service/crud.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva-area',
  templateUrl: './nueva-area.component.html',
  styleUrls: ['./nueva-area.component.css', '../../app.component.css']
})
export class NuevaAreaComponent {
  constructor(private route: ActivatedRoute, private htttp: HttpClient, public crudService:CrudService, private sanitizer: DomSanitizer) { }

  aID : any = null;
  area : any = [];
  linkCalendar!: string; 
  descripcion!: string;
  horarios!: string;
  secureLinkCalendar: any = null;

  ngOnInit() {
    // obtiene el id del área de la ruta
    const idArea = this.route.snapshot.paramMap.get('idArea');
    this.aID = idArea;
    return this.crudService.AreaGetXId(this.aID).subscribe((data:{}) => {
      this.area = data;
      //selecciona la columna LinkCalendar
      this.linkCalendar = this.area.LinkCalendar;
      if(this.linkCalendar===null){
        this.linkCalendar='SinLink';
      }
      //lo purifica
      this.secureLinkCalendar = this.sanitizer.bypassSecurityTrustResourceUrl(this.linkCalendar);
      this.horarios = this.convertLineBreaks(this.area.Horarios);
      this.descripcion = this.convertLineBreaks(this.area.Descripcion);
      // console.log(this.descripcion);
      console.log(this.area);
      console.log(this.area.Avisos);
      //console.log("sencillamente "+this.area.LinkCalendar);
    })
  }

  convertLineBreaks(text: string): string {
    if (!text) {
      return '';
    }
    return text.replace(/\\n/g, '<br>');
  }

}