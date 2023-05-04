import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() linkFoto? : string;
  @Input() descripcion! : string;
  ngOnInit(){
    console.log(this.linkFoto);
    //this.linkFoto="./assets/images/wellness-center.jpeg";
    //this.descripcion="Conoce las areas y lleva el deporte al siguiente nivel";
  }
}
