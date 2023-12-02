require("dotenv").config();  //Carga las variables de entorno definidas en un archivo .env
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize('postgres://myuser:NhJIs0DkJm7dCcCDTTY3gscr9qEXDLLV@dpg-cllptfcjtl8s73epo60g-a.oregon-postgres.render.com/countries_iiga?ssl=true', {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Country, Activity } = sequelize.models;

// Aca vendrian las relaciones
Country.belongsToMany(Activity, {through: 'Country_Activity'});
Activity.belongsToMany(Country, {through: 'Country_Activity'});


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};