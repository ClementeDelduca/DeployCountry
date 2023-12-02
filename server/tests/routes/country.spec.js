const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../../src/server');
const { Country, conn } = require('../../src/db.js');

const agent = session(server);    //Crea una instancia de sesión de prueba
const country = {                 //Define un objeto country que contiene datos de ejemplo para crear un registro
  id: 'CDP',
  name: 'CountryToDelete',
  flags: 'flag-url',
  continents: 'Test Continent',
  capital: 'Test Capital',
  subregion: 'Test Subregion',
  area: 100,
  population: 1000000
};

describe('Country routes', () => {      //Define un bloque de pruebas para las rutas
  before(() => conn.authenticate()      //Define un bloque de código que se ejecuta antes de todas las pruebas
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Country.sync()       //Define un bloque de código que se ejecuta antes de todas las pruebas
    .then(() => Country.create(country)));

  afterEach(() => Country.destroy({ where: { id: country.id } }));

  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
});
