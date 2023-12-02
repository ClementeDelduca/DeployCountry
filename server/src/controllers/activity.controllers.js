const { Activity, Country } = require('../db');

const createActivity = async function(activity) {                     //Define una función asincrónica
  const { name, difficulty, duration, season, countries } = activity; // Desestructuración de la variable activity

  try {
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    for (let countryId of countries) {
      const country = await Country.findByPk(countryId);
      if (country) {
        await newActivity.addCountry(country);        //para asociar el país a la actividad
      }
    }

    console.log('Actividad creada correctamente y asignada a los países seleccionados');
  } catch (error) {
    console.error('Error al crear la actividad:', error);
  }
};

const getAllActivity = async () => {
  try {
    const databaseActivity = await Activity.findAll();    //se devuelve una copia del array de actividades
    return [...databaseActivity];
  } catch (error) {
    console.error('Error al obtener todas las actividades:', error);
    return [];
  }
};

module.exports = {
  createActivity,
  getAllActivity,
};