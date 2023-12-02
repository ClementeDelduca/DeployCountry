const axios = require('axios');
const { Country, Activity } = require('../db');
const { Sequelize } = require('sequelize');

const allCountry = async () => {                               //Define una función asincrónica
  try {
    const result = await axios.get('https://restcountries.com/v3/all');
    const filteredData = result.data.map(element => {
      return {
        id: element.cca3,
        name: element.name['common'],
        flags: element.flags[0],
        continents: element.continents[0],
        capital: element.capital !== undefined ? element.capital[0] : 'No está definido el capital',
        subregion: element.subregion !== undefined ? element.subregion : 'No está definida la subregión',
        area: element.area,
        population: element.population,
      };
    });
    return filteredData;
  } catch (error) {
    throw error;
  }
};

const getCountriesALL = async function () {                 //Define una función asincrónica
  try { 
    const getCountries = await Country.findAll({          // Consultar la información de los países desde la base de datos
      attributes: ['id', 'name', 'flags', 'continents', 'population'],
      include: {
        model: Activity,
        attributes: ['name', 'difficulty', 'duration', 'season'],
        through: {
          attributes: [],
        },
      },
    });

    if (getCountries.length === 0) {      // Si no hay datos en la base de datos, obtenerlos desde la API y guardarlos 
      const apiData = await allCountry();
      await Country.bulkCreate(apiData); // Guardar los datos en la tabla 'countries' de la base de datos
      return apiData;
    }
    return getCountries;
  } catch (error) {
    console.log(error);
  }
};

const searchCountryByName = async (name) => {             //Define una función asincrónica
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const databaseCountry = await Country.findAll({ where: { name: capitalizedName } });
  return databaseCountry;
};

const getCountryById = async (id) => {                    //Define una función asincrónica
  const iD = id.toUpperCase();
  const country = await Country.findOne({
    where: {
      id: iD,
    },
    include: {
      model: Activity,
      attributes: ['name', 'difficulty', 'duration', 'season'],
      through: {
        attributes: [],
      },
    },
  });
  return country;
};

module.exports = {
  getCountryById,
  searchCountryByName,
  getCountriesALL,
};