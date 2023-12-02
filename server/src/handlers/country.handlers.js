const { getCountryById, searchCountryByName, allCountry, getCountriesALL } = require("../controllers/country.controllers");

const countryRouterHandler = async (req, res) => {   //Define una función asincrónica
    const { name } = req.query;
    try {
      const results = name ? await searchCountryByName(name) : await getCountriesALL();
  
      if (name && results.length === 0) {
        throw new Error("Error: Country no encontrado");
      }
  
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  const countryRouterIdHandler = async (req, res) => {   //Define una función asincrónica
    const { id } = req.params;
    try {
      const country = await getCountryById(id);
  
      if (!country) {
        throw new Error("Error: Country no encontrado");
      }
  
      res.status(200).json(country);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  

module.exports = {
    countryRouterHandler,
    countryRouterIdHandler
}
