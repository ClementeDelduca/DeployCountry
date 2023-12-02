const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {           //Define un bloque de pruebas para el modelo Country
  before(() => conn.authenticate()          //Define un bloque de código que se ejecuta antes de todas las pruebas
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync());
    describe('name', () => {
      it('should throw an error if name is null', (done) => { //Define una prueba que verifica si se produce un error cuando el atributo name es nulo
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => { //Define una prueba que verifica si se puede crear un registro con un nombre válido
        Country.create({ name: 'CountriDePrueba' });
      });
    });
  });
});
