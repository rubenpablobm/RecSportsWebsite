/* Descripcion de admin.spec.ts: programa default del modelo "admin".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 19/05/2023 */

import { Admin } from './admin';

describe('Admin', () => {
  it('should create an instance', () => {
    expect(new Admin()).toBeTruthy();
  });
});
