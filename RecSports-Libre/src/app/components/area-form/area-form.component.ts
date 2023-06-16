/* Descripcion de area-form.component.ts: programa que define la logica del componente "area-form".
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 01/06/2023
Fecha de modificacion: 15/06/2023 */

// Declaracion de importaciones
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from '../../service/crud.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css'],
})

export class AreaFormComponent {
  // Variables
  listaEdificios : any = [];
  idEdificio:number = -1;
  listaAreas : any = [];
  tipoArea:string = '';
  mensaje?:string;
  areaAgregada:boolean = false;
  nombreError: boolean = false;
  nombreVacio: boolean = false;
  fotoError: boolean = false;
  fotoVacia: boolean = false;
  tipoAreaVacio: boolean = false;
  capacidadError: boolean = false;
  capacidadVacio: boolean = false;
  linkCalError: boolean = false;
  linkCalVacio: boolean = false;
  croquisError: boolean = false;
  croquisVacio: boolean = false;
  // Grupo de formulario para recolectar datos del formulario
  formularioDeAreas: FormGroup;

  // Constructor con dependencias inyectadas
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, public crudService:CrudService, private cdr: ChangeDetectorRef, public formulario: FormBuilder) { 
    // Crear el grupo de formulario
    this.formularioDeAreas=this.formulario.group({
      IdEdificio : [''],
      Nombre: [''],
      Avisos : [''],
      Foto: [''],
      Horarios : [''],
      Descripcion : [''],
      Tipo : [''],
      Capacidad : [''],
      LinkCalendar: [''],
      Croquis: ['']
    });
  }

  // Obtener edificios desde la API
  ngOnInit() {
    this.getEdificios();
  }

  // Metodo para obtener los edificios
  getEdificios() {
    return this.crudService.EdificioGetMultiple().subscribe((data:{}) => {
      this.listaEdificios = data;
    })
  }

  getAreas(id:number) {
    return this.crudService.AreaGetXedificio(id).subscribe((data:{}) => {
      this.listaAreas = data;
    })
  }

  onEdificioSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const option = target.value;

    if (option !== null) {
      this.idEdificio = Number(option);
    }

    this.getAreas(this.idEdificio);
    this.cdr.detectChanges();
  }

  // Metodo que valida si el nombre de la área ya existe en el edificio seleccionado
  isDuplicateNombre(nombre: string): boolean {
    return this.listaAreas.some((area: any) => area.Nombre === nombre);
  }
  
  // Metodo que valida si el link correponde a una imagen
  async validarImagenLink(url: string, campo: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      if(this.isGoogleDriveLink(url)){
        url = this.convertGoogleDriveLink(url);
        // Asignar nuevo valor al campo "Foto"
        this.formularioDeAreas.get(campo)?.setValue(url);
      }
      // La imagen se cargo correctamente
      img.onload = () => {
        resolve(true);
      };
      // La imagen no se cargo
      img.onerror = () => {
        resolve(false);
      };
      img.src = url;
    });
  }

  // Metodo para verificar si el enlace es de Google Drive
  isGoogleDriveLink(url: string): boolean {
    const googleDrivePattern = /https:\/\/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)\/.*$/;
    return googleDrivePattern.test(url);
  }

  // Metodo para convertir los enlaces de Google Drive en URL directas de imágenes
  convertGoogleDriveLink(url: string): string {
    const googleDrivePattern = /https:\/\/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)\/.*$/;
    const match = googleDrivePattern.exec(url);
    if (match && match.length === 2) {
      const fileId = match[1];
      return `https://drive.google.com/uc?id=${fileId}`;
    }
    return url;
  }

  onTipoSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const option = target.value;
    
    if (option !== null) {
      this.tipoArea = option;
    }
    this.cdr.detectChanges();
  }

  resetFields(){
    this.areaAgregada = false;
    this.nombreError = false;
    this.nombreVacio = false;
    this.fotoError = false;
    this.fotoVacia = false;
    this.tipoAreaVacio = false;
    this.capacidadError = false;
    this.capacidadVacio = false;
    this.linkCalError = false;
    this.linkCalVacio = false;
    this.croquisError = false;
    this.croquisVacio = false;
  }

  endForm() {
    this.router.navigate(['/']);
  }

  // Metodo que valida si el link correponde a un link de google maps
  isCalendarLink(link: string): boolean {
    const calendarPattern = /^https:\/\/zcal\.co\/i\/[A-Za-z0-9-]+$/;
    return calendarPattern.test(link);
  }
  
  // Metodo para manejar el envio del formulario
  enviarDatos() {
    const nombre = this.formularioDeAreas.get('Nombre')?.value;
    const aviso = this.formularioDeAreas.get('Avisos')?.value;
    const fotoUrl = this.formularioDeAreas.get('Foto')?.value;
    const tipo = this.tipoArea;
    const tipoArea = this.formularioDeAreas.get('Tipo')?.valueChanges.subscribe(value => {
      console.log('Selected Tipo:', value);
    });
    console.log('tipo = ' + tipo);
    console.log('tipoArea = ' + tipoArea);
    const capacidad = this.formularioDeAreas.get('Capacidad')?.value;
    const linkCalUrl = this.formularioDeAreas.get('LinkCalendar')?.value;
    console.log('Obteniendo LinkCalendar: ' + linkCalUrl);
    const croquis = this.formularioDeAreas.get('Croquis')?.value;

    this.resetFields();
  
    // Validacion de Nombre
    const isDuplicate = this.isDuplicateNombre(nombre);
    if (isDuplicate) {
      this.nombreVacio = false;
      this.nombreError = true;
    } else {
      if (!nombre) {
        this.nombreError = false;
        this.nombreVacio = true;
      } else {
        this.nombreError = false;
        this.nombreVacio = false
      }
    }

    if ((!aviso) || (aviso===''))  {
      console.log('Aviso existe');
      this.formularioDeAreas.get('Avisos')?.patchValue(null);
      console.log(aviso);
    }

    this.validarImagenLink(croquis, 'Croquis').then((isValidImage: boolean) => {
      if (!isValidImage) {
        if(!croquis){
          this.croquisError = false;
          this.croquisVacio = true;
        } else {
          this.croquisVacio = false;
          this.croquisError = true;
        }
      } else {
        this.croquisError = false;
        this.croquisVacio = false;
      }
    });
  
    // Validacion de Foto
    this.validarImagenLink(fotoUrl, 'Foto').then((isValidImage: boolean) => {
      if (!isValidImage) {
        if(!fotoUrl){
          this.fotoError = false;
          this.fotoVacia = true;
        } else {
          this.fotoVacia = false;
          this.fotoError = true;
        }
      } else {
        this.fotoError = false;
        this.fotoVacia = false;
      }

      if (!tipo) {
        this.tipoAreaVacio = true;
      }
      else {
        this.tipoAreaVacio = false;
      }

      if (this.tipoArea == 'Aforo') {
        if(!capacidad) {
          this.capacidadError = false;
          this.capacidadVacio = true;
        }
        else if (capacidad < 1){
          this.capacidadError = true;
          this.capacidadVacio = false;
        }
        else {
          this.capacidadError = false;
          this.capacidadVacio = false;
        }
        this.linkCalError = false;
        this.linkCalVacio = false;
        // this.formularioDeAreas.get('LinkCal')?.patchValue(null);
      }
      else {
        // Validacion de Link Cal
        const isCalLink = this.isCalendarLink(linkCalUrl);
        if (!isCalLink) {
          if(!linkCalUrl){
            console.log('condicion: vacía');
            console.log(linkCalUrl);
            this.linkCalError = false;
            this.linkCalVacio = true;
          } else {
            console.log('condicion: error');
            console.log(linkCalUrl);
            this.linkCalError = true;
            this.linkCalVacio = false;
          }
        } else {
          console.log('condicion: correcto');
          console.log(linkCalUrl);
          this.linkCalError = false;
          this.linkCalVacio = false;
        }
        this.capacidadError = false;
        this.capacidadVacio = false;
        // this.formularioDeAreas.get('Capacidad')?.patchValue(null);
      }

      if ((!linkCalUrl) || (linkCalUrl === "")) {
        console.log('LinkCal existe');
        this.formularioDeAreas.get('LinkCalendar')?.patchValue(null);
        console.log(linkCalUrl);
      }

      if ((!capacidad) || (capacidad === "")) {
        console.log('Capacidad existe');
        this.formularioDeAreas.get('Capacidad')?.patchValue(null);
        console.log(capacidad);
      }

      if(!this.nombreError && !this.nombreVacio && !this.fotoError && !this.fotoVacia && !this.tipoAreaVacio && !this.capacidadError && !this.capacidadVacio && !this.linkCalError && !this.linkCalVacio && !this.croquisError && !this.croquisVacio){
        this.areaAgregada = true;
        // Llamar al servicio para agregar el edificio
        this.crudService.AreaPost(this.formularioDeAreas.value).subscribe(
          (respuesta) => {
            this.ngOnInit();
          },
          (error) => {
            this.ngOnInit();
            this.mensaje = "Error: " + error.message;
          }
        );
        this.endForm();
        return;
      } else{
        // Marcar todos los valores como "touched"
        this.formularioDeAreas.markAllAsTouched();
      }
    });
  }
}
