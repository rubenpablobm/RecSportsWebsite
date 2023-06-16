/* Descripcion de agregar-edificio.component.ts: programa que define la logica del componente "agregar-edificio".
Su proposito es llamar al servicio API por medio de funciones. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano.
Fecha de creacion: 16/05/2023
Fecha de modificacion: 17/05/2023 */

// Declaracion de importaciones
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder} from '@angular/forms';
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
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, public crudService:CrudService, public formulario: FormBuilder) { 
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
    return this.crudService.EdificioGetMultiple().subscribe((data:{}) => {
      this.listaEdificios = data;
    })
  }

  // Metodo que valida si el nombre del edificio ya existe
  isDuplicateNombre(nombre: string): boolean {
    return this.listaEdificios.some((edificio: any) => edificio.Nombre === nombre);
  }

  endForm() {
    this.router.navigate(['/edificio-tabla/tabla']);
  }
  
  // Metodo que valida si el link correponde a una imagen
  async validarImagenLink(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      if(this.isGoogleDriveLink(url)){
        url = this.convertGoogleDriveLink(url);
        // Asignar nuevo valor al campo "Foto"
        this.formularioDeEdificios.get('Foto')?.setValue(url);
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

  // Metodo que valida si el link correponde a un link de google maps
  isGoogleMapsLink(link: string): boolean {
    const googleMapsPattern = /^https:\/\/goo\.gl\/maps\/[A-Za-z0-9]+$/;
    return googleMapsPattern.test(link);
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
        // Llamar al servicio para agregar el edificio
        this.crudService.EdificioPost(this.formularioDeEdificios.value).subscribe(
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
        this.formularioDeEdificios.markAllAsTouched();
      }
    });
  }
}