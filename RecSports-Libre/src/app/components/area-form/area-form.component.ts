
// Declaracion de importaciones
import { Component, Input, Output, EventEmitter, HostListener} from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../service/crud.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent {
  // Variables
  listaEdificios : any = [];
  idEdificio:number = -1;
  listaAreas : any = [];
  tipoArea:string = '';
  mensaje?:string;
  // Grupo de formulario para recolectar datos del formulario
  formularioDeAreas: FormGroup;

  // Constructor con dependencias inyectadas
  constructor(private route: ActivatedRoute, private http: HttpClient, private ruteador: Router, public crudService:CrudService, private cdr: ChangeDetectorRef, public formulario: FormBuilder) { 
    // Crear el grupo de formulario
    this.formularioDeAreas=this.formulario.group({
      IdEdificio : [''],
      Nombre: [''],
      Aviso : [''],
      Foto: [''],
      Horarios : [''],
      Descripcion : [''],
      TipoArea : [''],
      Capacidad : [''],
      LinkCal: [''],
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
    return this.crudService.AreaGetXId(id).subscribe((data:{}) => {
      this.listaAreas = data;
    })
  }

  onEdificioSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const option = target.value;
    
    if (option !== null) {
      this.idEdificio = Number(option);
    }
    this.cdr.detectChanges();
    this.getAreas(this.idEdificio);
  }

  // Metodo que valida si el nombre del edificio ya existe
  isDuplicateNombre(nombre: string): boolean {
    return this.listaAreas.some((area: any) => area.Nombre === nombre);
  }
  
  // Metodo que valida si el link correponde a una imagen
  async validarImagenLink(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const img = new Image();
  
      img.onload = () => {
        resolve(true); // Image loaded successfully
        console.log("Se cargo la imagen");
      };
  
      img.onerror = () => {
        resolve(false); // Image failed to load
        console.log("La imagen no se cargo");
      };
  
      img.src = url;
    });
  }

  onTipoSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const option = target.value;
    
    if (option !== null) {
      this.tipoArea = option;
    }
    this.cdr.detectChanges();
  }

  // Metodo que valida si el link correponde a un link de google maps
  isCalendarLink(link: string): boolean {
    const calendarPattern = /^https:\/\/[A-Za-z0-9]+$/;
    return calendarPattern.test(link);
  }

  // Metodos para checar si los campos estan vacios
  get nombreControl() {
    return this.formularioDeAreas.get('Nombre');
  }

  get fotoControl() {
    return this.formularioDeAreas.get('Foto');
  }

  get tipoControl() {
    return this.formularioDeAreas.get('Tipo')
  }

  get linkCalControl() {
    return this.formularioDeAreas.get('LinkCal');
  }
  
  // Metodo para manejar el envio del formulario
  enviarDatos() {
    const idEdificio = this.formularioDeAreas.get('idEdificio')?.value;
    const nombre = this.formularioDeAreas.get('Nombre')?.value;
    const aviso = this.formularioDeAreas.get('Aviso')?.value;
    const fotoUrl = this.formularioDeAreas.get('Foto')?.value;
    const horarios = this.formularioDeAreas.get('Horarios')?.value;
    const descripcion = this.formularioDeAreas.get('Descripcion')?.value;
    const tipo = this.formularioDeAreas.get('Tipo')?.value;
    const capacidad = this.formularioDeAreas.get('Capacidad')?.value;
    const linkCalUrl = this.formularioDeAreas.get('LinkCal')?.value;
    const croquis = this.formularioDeAreas.get('Croquis')?.value;
  
    // Validacion de Nombre
    const isDuplicate = this.isDuplicateNombre(nombre);
    if (isDuplicate) {
      this.nombreControl?.setErrors({ duplicateNombre: true });
      console.log(this.nombreControl?.errors?.['required']);
      console.log(this.nombreControl?.errors?.['duplicateNombre']);
    } else {
      this.nombreControl?.setErrors({ duplicateNombre: false });
    }
  
    // Validacion de Foto
    this.validarImagenLink(fotoUrl).then((isValidImage: boolean) => {
      if (!isValidImage) {
        this.fotoControl?.setErrors({ invalidImage: true });
        console.log(this.nombreControl?.errors?.['required']);
        console.log(this.nombreControl?.errors?.['invalidImage']);
      } else {
        this.fotoControl?.setErrors({ invalidImage: false });
      }
      
      // VALIDACIÓN PARA ÁREAS DE TIPO AFORO
      if (this.tipoArea == 'aforo') {
        if(!isDuplicate && isValidImage){
          // Proceed with form submission
          console.log('Form submitted successfully');
          // Llamar al servicio para agregar el edificio
          this.crudService.EdificioPost(this.formularioDeAreas.value).subscribe(
            (respuesta) => {
              this.ngOnInit();
              console.log('Success');
            },
            (error) => {
              this.ngOnInit();
              console.log(error);
              this.mensaje = "Error: " + error.message;
            }
          );
          return;
        }
      }
      // VALIDACIÓN PARA ÁREAS DE TIPO INSTRUCTIVA O RESERVA
      else {
        // Validacion de Link Calendario (Reservaciones de clases y espacios)
        const isCalendarLink = this.isCalendarLink(linkCalUrl);
        if (!isCalendarLink) {
          this.linkCalControl?.setErrors({ invalidCalendarLink: true });
        } else {
          this.linkCalControl?.setErrors({ invalidCalendarLink: false });
        }
  
        if(!isDuplicate && isValidImage && isCalendarLink){
          // Proceed with form submission
          console.log('Form submitted successfully');
          // Llamar al servicio para agregar el edificio
          this.crudService.EdificioPost(this.formularioDeAreas.value).subscribe(
            (respuesta) => {
              this.ngOnInit();
              console.log('Success');
            },
            (error) => {
              this.ngOnInit();
              console.log(error);
              this.mensaje = "Error: " + error.message;
            }
          );
          return;
        }
      }
    });
  }
}
