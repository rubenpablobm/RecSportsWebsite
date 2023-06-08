
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
  tipoArea:string = '';
  mensaje?:string;
  // Grupo de formulario para recolectar datos del formulario
  formularioDeEdificios: FormGroup;

  // Constructor con dependencias inyectadas
  constructor(private route: ActivatedRoute, private http: HttpClient, private ruteador: Router, public crudService:CrudService, private cdr: ChangeDetectorRef, public formulario: FormBuilder) { 
    // Crear el grupo de formulario
    this.formularioDeEdificios=this.formulario.group({
      Nombre: ['', Validators.required],
      Foto: ['', Validators.required],
      LinkMaps: ['', Validators.required]
    });
  }

  // Obtener edificios desde la API
  ngOnInit() {
    // this.getEdificios();
    console.log('haciendo request de edificios en select');
    console.log(this.listaEdificios);
  }

  // Metodo para obtener los edificios
  getEdificios() {
    console.log('Cargando edificios existentes...')
    return this.crudService.EdificioGetMultiple().subscribe((eData:{}) => {
      console.log('data recuperada de edificios')
      console.log(eData);
      this.listaEdificios = eData;
    })
  }

  // Metodo que valida si el nombre del edificio ya existe
  isDuplicateNombre(nombre: string): boolean {
    return this.listaEdificios.some((edificio: any) => edificio.Nombre === nombre);
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
  isGoogleMapsLink(link: string): boolean {
    const googleMapsPattern = /^https:\/\/goo\.gl\/maps\/[A-Za-z0-9]+$/;
    return googleMapsPattern.test(link);
  }

  // Metodos para checar si los campos estan vacios
  get nombreControl() {
    return this.formularioDeEdificios.get('Nombre');
  }

  get fotoControl() {
    return this.formularioDeEdificios.get('Foto');
  }

  get linkMapsControl() {
    return this.formularioDeEdificios.get('LinkMaps');
  }
  
  // Metodo para manejar el envio del formulario
  enviarDatos() {
    const nombre = this.formularioDeEdificios.get('Nombre')?.value;
    const fotoUrl = this.formularioDeEdificios.get('Foto')?.value;
    const linkMapsUrl = this.formularioDeEdificios.get('LinkMaps')?.value;
  
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
  
      // Validacion de Link Maps
      const isGoogleMapsLink = this.isGoogleMapsLink(linkMapsUrl);
      if (!isGoogleMapsLink) {
        this.linkMapsControl?.setErrors({ invalidGoogleMapsLink: true });
      } else {
        this.linkMapsControl?.setErrors({ invalidGoogleMapsLink: false });
      }

      if(!isDuplicate && isValidImage && isGoogleMapsLink){
        // Proceed with form submission
        console.log('Form submitted successfully');
        // Llamar al servicio para agregar el edificio
        this.crudService.EdificioPost(this.formularioDeEdificios.value).subscribe(
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
    });
  }
}
