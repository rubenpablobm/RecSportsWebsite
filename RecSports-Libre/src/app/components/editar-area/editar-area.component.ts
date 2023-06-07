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
  capacidad?:Int16Array;
  linkZcal?:string;
  croquis?:string;
  edificioAgregado:boolean = false;
  nombreError: boolean = false;
  nombreVacio: boolean = false;
  fotoError: boolean = false;
  fotoVacia: boolean = false;
  linkMapsError: boolean = false;
  linkMapsVacio: boolean = false;

	// Grupo de formulario para recolectar datos del formulario
	formularioDeArea: FormGroup;
  
	// Constructor con dependencias inyectadas
	constructor(private route: ActivatedRoute, private htttp: HttpClient, private ruteador: Router, public crudService:CrudService, public formulario: FormBuilder) { 
    // Obtener el parametro 'IdEdificio' de la ruta
    this.theIdArea = this.route.snapshot.paramMap.get('idEdificio');
    console.log("Este es el id de edificio");
    console.log(this.theIdArea);
    // Recuperar los datos del edificio si 'theIdEdificio' tiene un valor
    if (this.theIdArea) {
      this.crudService.AreaGet(this.theIdArea).subscribe(respuesta =>{
        console.log(respuesta['Nombre']);
        this.nombre = respuesta['Nombre'];
        this.avisos = respuesta['Avisos'];
        this.horarios = respuesta['Horarios'];
        this.descripcion = respuesta['Descripcion'];
        this.tipoDeArea = respuesta['TipoDeArea'];

        // Establecer los valores del formulario con los datos recuperados
        this.formularioDeArea.setValue({
          Nombre: respuesta['Nombre'],
          Horarios: respuesta['Horarios'],
          Descripcion: respuesta['Descripcion'],
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
        TipoDeArea: ['', Validators.required],
        Capacidad: ['', Validators.required],
        LinkZcal: ['', Validators.required],
        Croquis: ['', Validators.required]
    });
	}

  // Obtener edificios desde la API
  ngOnInit() {
    this.getArea();
  }

  // Metodo para obtener los edificios
  getArea() {
    console.log('Cargando edificios existentes...')
    return this.crudService.AreaGetMultiple().subscribe((data:{}) => {
      console.log(data);
      this.listaEdificios = data;
    })
  }

  // Metodo que valida si el nombre del edificio ya existe
  isDuplicateNombre(nombre: string): boolean {
    return this.listaEdificios.some((area: any) => area.Nombre === nombre);
  }
  
  get nombreControl() {
    return this.formularioDeArea.get('Nombre');
  }
  get avisoControl() {
    return this.formularioDeArea.get('Nombre');
  }

  get fotoControl() {
    return this.formularioDeArea.get('Foto');
  }

  get linkMapsControl() {
    return this.formularioDeArea.get('LinkMaps');
  }

	// Metodo para manejar el envio del formulario
  enviarDatos(){
    const nombre = this.formularioDeArea.get('Nombre')?.value;
    const horarios = this.formularioDeArea.get('Horarios')?.value;
    const descripcion = this.formularioDeArea.get('Descripcion')?.value;
    this.edificioAgregado = false;
  
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
  
    // Validacion de Foto
        if(!horarios){
          this.fotoError = false;
          this.fotoVacia = true;
        } else if(!horarios && horarios == this.horarios) {
          this.fotoVacia = false;
          this.fotoError = true;
        }
      else {
        this.fotoError = false;
        this.fotoVacia = false;
      }
  
      // Validacion de Link Maps
        if(!descripcion){
          this.fotoError = false;
          this.fotoVacia = true;
        } else if(!descripcion && descripcion == this.descripcion) {
          this.fotoVacia = false;
          this.fotoError = true;
        }
       else {
        this.fotoError = false;
        this.fotoVacia = false;
      }

      if(!this.nombreError && !this.nombreVacio && !this.fotoError && !this.fotoVacia && !this.linkMapsError && !this.linkMapsVacio){
        this.edificioAgregado = true;
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
    ;
  }
  
}
