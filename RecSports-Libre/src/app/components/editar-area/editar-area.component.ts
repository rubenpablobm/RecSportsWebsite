import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-editar-area',
  templateUrl: './editar-area.component.html',
  styleUrls: ['./editar-area.component.css']
})
export class EditarAreaComponent {
  // Variables para recibir informacion de area
  eID : any = null;
	area : any = [];
	mensaje?:string;
	theIdArea:any;
  listaEdificios:any;
  nombre?:string;
  avisos?:string;
  foto?:string;
  horarios?:string;
  descripcion?:string;
  tipoDeArea:any;
  capacidad?:number;
  linkZcal?:string;
  croquis?:string;
  areaAgregada:boolean = false;
  idEdificio!:number;
// Variables para validaciones
  listaAreas : any = [];
  nombreError: boolean = false;
  nombreVacio: boolean = false;
  avisoVacio: boolean = false;
  avisoError: boolean = false;
  fotoError: boolean = false;
  fotoVacia: boolean = false;
  horariosError: boolean = false;
  descripcionError: boolean = false;
  capacidadError: boolean = false;
  capacidadVacio: boolean = false;
  linkZcalError: boolean = false;
  linkZcalVacio: boolean = false;
  croquisError: boolean = false;
  croquisVacio: boolean = false;
  flagAforo:boolean = false;
	// Grupo de formulario para recolectar datos del formulario
	formularioDeArea: FormGroup;
  
	// Constructor con dependencias inyectadas
	constructor(private route: ActivatedRoute, private htttp: HttpClient, private router: Router, public crudService:CrudService, public formulario: FormBuilder, private cdr: ChangeDetectorRef) { 
    // Obtener el parametro 'IdArea' de la ruta
    this.theIdArea = this.route.snapshot.paramMap.get('idArea');
    // Recuperar los datos del área si 'theIdArea' tiene un valor
    if (this.theIdArea) {
      this.crudService.AreaGet(this.theIdArea).subscribe(respuesta =>{
        console.log(respuesta['Nombre']);
        this.nombre = respuesta['Nombre'];
        this.foto = respuesta['Foto'];
        this.croquis = respuesta['Croquis'];
        this.tipoDeArea = respuesta['Tipo'];
        this.linkZcal = respuesta['LinkCalendar'];
        this.descripcion = respuesta['Descripcion'];
        this.horarios = respuesta['Horarios'];
        this.avisos = respuesta['Avisos'];
        this.idEdificio = respuesta['IdEdificio']
        this.capacidad = respuesta['Capacidad'];
        // Establecer los valores del formulario con los datos recuperados
        this.formularioDeArea.setValue({
          IdEdificio: respuesta['IdEdificio'],
          Nombre: respuesta['Nombre'],
          Foto: respuesta['Foto'],
          Croquis: respuesta['Croquis'],
          Tipo: respuesta['Tipo'],
          LinkCalendar: respuesta['LinkCalendar'],
          Descripcion: respuesta['Descripcion'],
          Horarios: respuesta['Horarios'],
          Avisos: respuesta['Avisos'],
          Capacidad: respuesta['Capacidad'],
        });
      },
      (error) => {
        this.mensaje=String(error.error);
      })
    }
    // Crear el grupo de formulario
    this.formularioDeArea=this.formulario.group({
        IdEdificio: [''],
        Nombre: [''],
        Avisos: [''],
        Foto: [''],
        Horarios: [''],
        Descripcion: [''],
        Tipo: [''],
        Capacidad: [''],
        LinkCalendar: [''],
        Croquis: ['']
    });
	}

  // Obtener edificios desde la API
  ngOnInit() {
    this.getAreas(this.idEdificio);
    console.log(this.listaAreas)
  }

  endForm() {
    this.router.navigate(['/']);
  }

  // Metodo para obtener las areas
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
    this.cdr.detectChanges();
  }

  onTipoSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const option = target.value;
    if (option !== null) {
      this.tipoDeArea = option;
    }
    this.cdr.detectChanges();
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

  // Metodo que valida si el nombre del area ya existe
  isDuplicateNombre(nombre: string): boolean {
    return this.listaAreas.some((area: any) => area.Nombre === nombre);
  }

  // Metodo que valida si el link correponde a un link de google maps
  isCalendarLink(link: string): boolean {
    const calendarPattern = /^https:\/\/zcal.co\/[A-Za-z0-9]\/[A-Za-z0-9]+$/;
    return calendarPattern.test(link);
  }

  async validarImagenLink(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      if(this.isGoogleDriveLink(url)){
        url = this.convertGoogleDriveLink(url);
        // Asignar nuevo valor al campo "Foto"
        this.formularioDeArea.get('Foto')?.setValue(url);
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
 
	// Metodo para manejar el envio del formulario
  enviarDatos(){
    // this.formularioDeArea.get('IdEdificio')?.patchValue(this.idEdificio);
    // this.formularioDeArea.get('Tipo')?.patchValue(this.tipoDeArea);
    // const idEdificio = this.formularioDeArea.get('IdEdificio')?.value;
    const nombre = this.formularioDeArea.get('Nombre')?.value;
    const horarios = this.formularioDeArea.get('Horarios')?.value;
    const aviso = this.formularioDeArea.get('Avisos')?.value;
    const foto = this.formularioDeArea.get('Foto')?.value;
    const descripcion = this.formularioDeArea.get('Descripcion')?.value;
    // const tipo =this.formularioDeArea.get('Tipo')?.value;
    const capacidad = this.formularioDeArea.get('Capacidad')?.value;
    const linkZcal = this.formularioDeArea.get('LinkCalendar')?.value;
    const croquis = this.formularioDeArea.get('Croquis')?.value;
    this.areaAgregada = false;
  
    // Validacion de Nombre
    const isDuplicate = this.isDuplicateNombre(nombre);
    if (isDuplicate && !(nombre == this.nombre)) {
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
      this.formularioDeArea.get('Avisos')?.patchValue(null);
    }
  
    // Validacion de Foto
    this.validarImagenLink(foto).then((isValidImage: boolean) => {
      if (!isValidImage) {
        if(!foto){
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

      //Validacion de horarios
      if(!horarios){
        this.horariosError = false;
      } else if(!horarios && horarios == this.horarios) {
        this.horariosError = true;
      } else {
        this.horariosError = false;
      }
  
      // Validacion de Descripcion
      if(!descripcion){
        this.descripcionError = false;
      } else if(!descripcion && descripcion == this.descripcion) {
        this.descripcionError = true;
      } else {
        this.descripcionError = false;
      }  

      if (this.tipoDeArea == 'Aforo') {
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
        this.flagAforo = true;
        this.linkZcalError = false;
        this.linkZcalVacio = false;
        // this.formularioDeAreas.get('LinkCal')?.patchValue(null);
      }
      else {
        // Validacion de Link Cal
        const isCalLink = this.isCalendarLink(linkZcal);
        if (!isCalLink) {
          if(!linkZcal){
            this.linkZcalError = false;
            this.linkZcalVacio = true;
          } else {
            this.linkZcalError = true;
            this.linkZcalVacio = false;
          }
        } else {
          this.linkZcalError = false;
          this.linkZcalVacio = false;
        }
        this.flagAforo = false;
        this.capacidadError = false;
        this.capacidadVacio = false;
        // this.formularioDeAreas.get('Capacidad')?.patchValue(null);
      }

      // Validacion de Link Maps
      if(!croquis){
        this.croquisError = false;
        this.croquisVacio = true;
      } else if(!croquis && croquis == this.croquis) {
        this.croquisVacio = false;
        this.croquisError = true;
      }
      else {
        this.croquisError = false;
        this.croquisVacio = false;
      }

      if(!this.nombreError && !this.nombreVacio && !this.avisoError && !this.fotoError && !this.fotoVacia && !this.horariosError && !this.descripcionError && !this.capacidadError && !this.capacidadVacio && !this.linkZcalError && !this.linkZcalVacio&& !this.croquisError && !this.croquisVacio)
      {
        this.areaAgregada = true;
		    // Llamar al servicio para actualizar el edificio
        this.crudService.AreaUpdate(this.theIdArea, this.formularioDeArea.value).subscribe(respuesta => {
          console.log("Se realizó el update correctamente")
        },
        (error) => {
          this.mensaje=String(error.error);
        });
        this.endForm();
        return;
       }
    });
  }
  
}
