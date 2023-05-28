//Preguntar si se puede quitar el modelo

export class AreaAPI {
  idArea=0;
  nombre!:string;
  foto!:string;
  croquis!:string;
  tipo!:string;
  linkCalendar!:string;
  descripcion!:string;
  horarios!:string;
  aviso = '';
  idEdificio!:number;
  Aforo?:number;
  Capacidad?:number;
}
