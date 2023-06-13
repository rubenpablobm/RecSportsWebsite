
// Declaracion de importaciones
import { Component, Input, Output, EventEmitter, HostListener} from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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
  constructor(private route: ActivatedRoute, private http: HttpClient, private ruteador: Router, public crudService:CrudService, private cdr: ChangeDetectorRef, public formulario: FormBuilder) { 
    // Crear el grupo de formulario
    this.formularioDeAreas=this.formulario.group({
      IdEdificio : [''],
      Nombre: [''],
      Aviso : [''],
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
      console.log('se obtuvieron edificios');
      console.log(this.listaEdificios);
    })
  }

  getAreas(id:number) {
    return this.crudService.AreaGetXedificio(id).subscribe((data:{}) => {
      this.listaAreas = data;
      console.log('se obtuvieron áreas:');
      console.log(this.listaAreas);
    })
  }

  onEdificioSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const option = target.value;

    if (option !== null) {
      this.idEdificio = Number(option);
    }

    console.log('Se seleccionó un edificio: ' + this.idEdificio);
    this.getAreas(this.idEdificio);
    console.log(this.listaAreas)
    this.cdr.detectChanges();
  }

  // Metodo que valida si el nombre de la área ya existe en el edificio seleccionado
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

  resetForm() {
    this.formularioDeAreas.reset();
  }

  // Metodo que valida si el link correponde a un link de google maps
  isCalendarLink(link: string): boolean {
    const calendarPattern = /^https:\/\/zcal.co\/[A-Za-z0-9]\/[A-Za-z0-9]+$/;
    return calendarPattern.test(link);
  }

  // Metodos para checar si los campos estan vacios
  get nombreControl() {
    return this.formularioDeAreas.get('Nombre');
  }

  get fotoControl() {
    return this.formularioDeAreas.get('Foto');
  }

  get linkCalControl() {
    return this.formularioDeAreas.get('LinkCal');
  }
  
  // Metodo para manejar el envio del formulario
  enviarDatos() {
    const nombre = this.formularioDeAreas.get('Nombre')?.value;
    const fotoUrl = this.formularioDeAreas.get('Foto')?.value;
    const tipo = this.tipoArea;
    const tipoArea = this.formularioDeAreas.get('Tipo')?.valueChanges.subscribe(value => {
      console.log('Selected Tipo:', value);
    });
    console.log('tipo = ' + tipo);
    console.log('tipoArea = ' + tipoArea);
    const capacidad = this.formularioDeAreas.get('Capacidad')?.value;
    const linkCalUrl = this.formularioDeAreas.get('LinkCal')?.value;
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

    this.validarImagenLink(croquis).then((isValidImage: boolean) => {
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
    this.validarImagenLink(fotoUrl).then((isValidImage: boolean) => {
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

      if (!tipo) {      // ************************************************************************************
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
        this.formularioDeAreas.get('LinkCal')?.patchValue(null);
      }
      else {
        // Validacion de Link Cal
        const isCalLink = this.isCalendarLink(linkCalUrl);
        if (!isCalLink) {
          if(!linkCalUrl){
            this.linkCalError = false;
            this.linkCalVacio = true;
          } else {
            this.linkCalError = true;
            this.linkCalVacio = false;
          }
        } else {
          this.linkCalError = false;
          this.linkCalVacio = false;
        }
        this.capacidadError = false;
        this.capacidadVacio = false;
        this.formularioDeAreas.get('Capacidad')?.patchValue(null);
      }

      if(!this.nombreError && !this.nombreVacio && !this.fotoError && !this.fotoVacia && !this.tipoAreaVacio && !this.capacidadError && !this.capacidadVacio && !this.linkCalError && !this.linkCalVacio && !this.croquisError && !this.croquisVacio){
        this.areaAgregada = true;
        // Proceed with form submission
        console.log('Form submitted successfully');
        console.log(this.formularioDeAreas.value);
        // Llamar al servicio para agregar el edificio
        this.crudService.AreaPost(this.formularioDeAreas.value).subscribe(
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
      } else{
        // Mark all fields as touched to show validation errors
        this.formularioDeAreas.markAllAsTouched();
      }
    });
  }
}