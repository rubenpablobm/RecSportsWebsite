/* Descripcion de edificio.spec.ts: programa default del modelo "edificio".
Porpiedad del equipo WellSoft. 
Ultima edicion por: Arturo Garza Campuzano
Fecha de creacion: dd/mm/aaaa < 05/05/2023
Fecha de modificacion: 19/05/2023 */

import { Edificio } from './edificio';

describe('Edificio', () => {
  it('should create an instance', () => {
    expect(new Edificio()).toBeTruthy();
  });
});
