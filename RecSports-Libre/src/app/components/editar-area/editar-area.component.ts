import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-editar-area',
  templateUrl: './editar-area.component.html',
  styleUrls: ['./editar-area.component.css']
})
export class EditarAreaComponent {

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
  idEdificio?: number;
//////////////////////////////////////
  nombreError: boolean = false;
  nombreVacio: boolean = false;
  avisoError: boolean = false;
  avisoVacio: boolean = false;
  fotoError: boolean = false;
  fotoVacia: boolean = false;
  horariosError: boolean = false;
  horariosVacio: boolean = false;
  descripcionError: boolean = false;
  descripcionVacio: boolean = false;
  tipoDeAreaError: boolean = false;
  tipoDeAreaVacio: boolean = false;
  capacidadError: boolean = false;
  capacidadVacio: boolean = false;
  linkZcalError: boolean = false;
  linkZcalVacio: boolean = false;
  croquisError: boolean = false;
  croquisVacio: boolean = false;

	// Grupo de formulario para recolectar datos del formulario
	formularioDeArea: FormGroup;
  
	// Constructor con dependencias inyectadas
	constructor(private route: ActivatedRoute, private htttp: HttpClient, private ruteador: Router, public crudService:CrudService, public formulario: FormBuilder) { 
    // Obtener el parametro 'IdEdificio' de la ruta
    this.theIdArea = this.route.snapshot.paramMap.get('idArea');
    console.log("Este es el id de area");
    console.log(this.theIdArea);
    // Recuperar los datos del edificio si 'theIdEdificio' tiene un valor
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
        Nombre: ['', Validators.required],
        Avisos: ['', Validators.required],
        Foto: ['', Validators.required],
        Horarios: ['', Validators.required],
        Descripcion: ['', Validators.required],
        Tipo: ['', Validators.required],
        Capacidad: ['', Validators.required],
        LinkCalendar: ['', Validators.required],
        Croquis: ['', Validators.required]
    });
	}

  // Obtener edificios desde la API
  ngOnInit() {
    this.getArea();
  }

  // Metodo para obtener los area
  getArea() {
    console.log('Cargando area existentes...')
    return this.crudService.AreaGetMultiple().subscribe((data:{}) => {
      console.log(data);
      this.listaEdificios = data;
    })
  }

  // Metodo que valida si el nombre del area ya existe
  isDuplicateNombre(nombre: string): boolean {
    return this.listaEdificios.some((area: any) => area.Nombre === nombre);
  }

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
  
  get nombreControl() {
    return this.formularioDeArea.get('Nombre');
  }
  get avisoControl() {
    return this.formularioDeArea.get('Aviso');
  }

  get fotoControl() {
    return this.formularioDeArea.get('Foto');
  }
   get horariosControl() {
    return this.formularioDeArea.get('Horarios');
  }

  get descripcionControl() {
    return this.formularioDeArea.get('Descripcion');
  }
  get tipoDeAreaControl() {
    return this.formularioDeArea.get('Tipo');
  }
  get capacidadControl() {
    return this.formularioDeArea.get('Capacidad');
  }
   get LinkZcalControl() {
    return this.formularioDeArea.get('LinkCalendar');
  }
   get croquisControl() {
    return this.formularioDeArea.get('Croquis');
  }
 

	// Metodo para manejar el envio del formulario
  enviarDatos(){
    const nombre = this.formularioDeArea.get('Nombre')?.value;
    const horarios = this.formularioDeArea.get('Horarios')?.value;
    const aviso = this.formularioDeArea.get('Aviso')?.value;
    const foto = this.formularioDeArea.get('Foto')?.value;
    const descripcion = this.formularioDeArea.get('Descripcion')?.value;
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

  // Validacion de Aviso
  if(!aviso){
    this.avisoError = false;
    this.avisoVacio = true;
  } else if(!aviso && aviso == this.avisos) {
    this.avisoVacio = false;
    this.avisoError = true;
  }
else {
  this.avisoError = false;
  this.avisoVacio = false;
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
          this.horariosVacio = true;
        } else if(!horarios && horarios == this.horarios) {
          this.horariosVacio = false;
          this.horariosError = true;
        }
      else {
        this.horariosError = false;
        this.horariosVacio = false;
      }
  
      // Validacion de Descripcion
        if(!descripcion){
          this.descripcionError = false;
          this.descripcionVacio = true;
        } else if(!descripcion && descripcion == this.descripcion) {
          this.descripcionVacio = false;
          this.descripcionError = true;
        }
       else {
        this.descripcionError = false;
        this.descripcionVacio = false;
      }
       // Validacion de TipoDeARea
       if(!this.tipoDeArea){
        this.tipoDeAreaError = false;
        this.tipoDeAreaVacio = true;
      } else if(!this.tipoDeArea && this.tipoDeArea == this.tipoDeArea) {
        this.tipoDeAreaVacio = false;
        this.tipoDeAreaError = true;
      }
     else {
      this.tipoDeAreaError = false;
      this.tipoDeAreaVacio = false;
    }

         // Validacion de Capacidad
         if(!capacidad){
          this.capacidadError = false;
          this.capacidadVacio = true;
        } else if(!capacidad && capacidad == this.capacidad) {
          this.capacidadVacio = false;
          this.capacidadError = true;
        }
       else {
        this.capacidadError = false;
        this.capacidadVacio = false;
      }

         // Validacion de linkZcal
         if(!linkZcal){
          this.linkZcalError = false;
          this.linkZcalVacio = true;
        } else if(!linkZcal && linkZcal == this.linkZcal) {
          this.linkZcalVacio = false;
          this.linkZcalError = true;
        }
       else {
        this.linkZcalError = false;
        this.linkZcalVacio = false;
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

      if(!this.nombreError && !this.nombreVacio && !this.avisoError && !this.avisoVacio && !this.fotoError && !this.fotoVacia && !this.horariosError && !this.horariosVacio 
        && !this.descripcionError && !this.descripcionVacio && !this.tipoDeAreaError && !this.tipoDeAreaVacio && !this.capacidadError && !this.capacidadVacio
         && !this.linkZcalError && !this.linkZcalVacio&& !this.croquisError && !this.croquisVacio){
        this.areaAgregada = true;
        console.log("Presionaste el boton enviar datos")
        console.log(this.formularioDeArea.value);
		    // Llamar al servicio para actualizar el edificio
        this.crudService.AreaUpdate(this.theIdArea, this.formularioDeArea.value).subscribe(respuesta => {
          console.log("Super")
        },
        (error) => {
          this.mensaje=String(error.error);
        });
        return;
       }
    });
  }
  
}
