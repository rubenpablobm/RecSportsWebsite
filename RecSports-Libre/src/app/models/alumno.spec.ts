/* Descripcion de alumno.spec.ts: programa default del modelo "alumno".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 19/05/2023 */

import { Alumno } from './alumno';

describe('Alumno', () => {
  it('should create an instance', () => {
    expect(new Alumno()).toBeTruthy();
  });
});
