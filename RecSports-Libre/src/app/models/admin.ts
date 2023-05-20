/* Descripcion de admin.ts: modelo que define el objeto administrador. 
Su proposito es recibir los datos de un administrador. 
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 19/05/2023 */

export class Admin {
    idAdmin=0; // ID del administrador
    correo!:string; // Correo electronico del administrador
    contraseña!:string; // Contrasena del administrador
}
