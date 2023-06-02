/* Descripcion de agregar-edificio.component.ts: programa que define la logica del componente "agregar-edificio".
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: 16/05/2023
Fecha de modificacion: 17/05/2023 */

// Declaracion de importaciones
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

// Decorador del componente
@Component({
  selector: 'app-agregar-edificio',
  templateUrl: './agregar-edificio.component.html',
  styleUrls: ['./agregar-edificio.component.css']
})
export class AgregarEdificioComponent {
  // Variables
  mensaje?:string;
  listaEdificios:any = [];
  edificioAgregado:boolean = false;
  nombreError: boolean = false;
  nombreVacio: boolean = false;
  fotoError: boolean = false;
  fotoVacia: boolean = false;
  linkMapsError: boolean = false;
  linkMapsVacio: boolean = false;
  // Grupo de formulario para recolectar datos del formulario
  formularioDeEdificios: FormGroup;

  // Constructor con dependencias inyectadas
  constructor(private route: ActivatedRoute, private http: HttpClient, private ruteador: Router, public crudService:CrudService, public formulario: FormBuilder) { 
    // Crear el grupo de formulario
    this.formularioDeEdificios=this.formulario.group({
      Nombre: [''],
      Foto: [''],
      LinkMaps: ['']
    });
  }

  // Obtener edificios desde la API
  ngOnInit() {
    this.getEdificios();
  }

  // Metodo para obtener los edificios
  getEdificios() {
    console.log('Cargando edificios existentes...')
    return this.crudService.EdificioGetMultiple().subscribe((data:{}) => {
      console.log(data);
      this.listaEdificios = data;
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
  
      // Validacion de Link Maps
      const isGoogleMapsLink = this.isGoogleMapsLink(linkMapsUrl);
      if (!isGoogleMapsLink) {
        if(!linkMapsUrl){
          this.linkMapsError = false;
          this.linkMapsVacio = true;
        } else {
          this.linkMapsError = true;
          this.linkMapsVacio = false;
        }
      } else {
        this.linkMapsError = false;
        this.linkMapsVacio = false;
      }

      if(!this.nombreError && !this.nombreVacio && !this.fotoError && !this.fotoVacia && !this.linkMapsError && !this.linkMapsVacio){
        this.edificioAgregado = true;
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
      } else{
        // Mark all fields as touched to show validation errors
        this.formularioDeEdificios.markAllAsTouched();
      }
    });
  }
}
  
  // enviarDatos(){
  //   if (this.formularioDeEdificios.valid) {
  //     const nombre = this.formularioDeEdificios.get('Nombre')?.value;
  //     const fotoUrl = this.formularioDeEdificios.get('Foto')?.value;
  //     const linkMapsUrl = this.formularioDeEdificios.get('LinkMaps')?.value;
    
  //     // Validacion de Nombre
  //     const isDuplicate = this.isDuplicateNombre(nombre);
  //     if (isDuplicate) {
  //       // Manejo de validacion de error para Nombre (duplicado)
  //       this.nombreControl?.setErrors({ duplicateNombre: true });
  //       return;
  //     }
    
  //     // Validacion de Foto
  //     this.validarImagenLink(fotoUrl).then((isValidImage: boolean) => {
  //       if (!isValidImage) {
  //         // Manejo de validacion de error para Foto
  //         this.fotoControl?.setErrors({ invalidImage: true });
  //       } else {
  //         // Proceed with form submission or other actions
  //         console.log('Form submitted successfully');
  //       }
  //     });
    
  //     // Validacion de Link Maps
  //     const isGoogleMapsLink = this.isGoogleMapsLink(linkMapsUrl);
  //     if (!isGoogleMapsLink) {
  //       // Manejo de validacion de error para Link Maps
  //       this.linkMapsControl?.setErrors({ invalidGoogleMapsLink: true });
  //       return;
  //     }
    
  //     // Proceed with form submission or other actions
  //     console.log('Form submitted successfully');
  //     console.log("Presionaste el boton enviar datos")
  //     console.log(this.formularioDeEdificios.value);
  //     // Llamar al servicio para agregar el edificio
  //     this.crudService.EdificioPost(this.formularioDeEdificios.value).subscribe(respuesta => {
  //       console.log("Super")
  //     },
  //     (error) => {
  //       this.mensaje=String(error.error);
  //     })
    
  //   } else {
  //     // Mark all fields as touched to show validation errors
  //     this.formularioDeEdificios.markAllAsTouched();
  //   }
  // }

  // console.log("Hola");
      // this.nombreControl?.setErrors({ duplicateNombre: true });
      // console.log(this.nombreControl?.hasError('duplicateNombre'));
      // this.nombreControl?.setErrors({ required: false });

      // const hasDuplicateNombreError = this.nombreControl?.hasError('duplicateNombre');
      // const hasRequiredError = this.nombreControl?.hasError('required');
      // console.log(this.nombreControl?.hasError('duplicateNombre'));
      // console.log('Has required error:', hasRequiredError);
// this.nombreControl?.setErrors({ duplicateNombre: false, required: true });
// this.nombreControl?.setErrors(null); Clear the errors
// this.nombreControl?.markAsTouched(); Mark the control as touched
      // this.nombreControl?.updateValueAndValidity(); Update the errors object