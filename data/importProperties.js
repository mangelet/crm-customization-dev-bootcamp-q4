const axios = require('axios');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env file

// Your HubSpot private app token from .env
const privateAppToken = process.env.cca;

// Function to import properties
async function importProperties(objectType, propertiesFilePath) {
  // Read the JSON file
  const propertiesData = JSON.parse(
    fs.readFileSync(propertiesFilePath, 'utf8')
  );

  // HubSpot API URL
  const url = `https://api.hubapi.com/crm/v3/properties/${objectType}/batch/create`;

  try {
    const response = await axios.post(url, propertiesData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${privateAppToken}`,
      },
    });
    console.log(
      `Properties for ${objectType} imported successfully:`,
      response.data
    );
  } catch (error) {
    console.error(
      `Error importing properties for ${objectType}:`,
      error.response ? error.response.data : error.message
    );
  }
}

// Example usage
// importProperties('p_locations', 'data/2.properties-locations.json');
// importProperties('p_vehicles', 'data/2.properties-vehicles.json');
// importProperties('p_rental_agreements', 'data/2.properties-rental-agreement.json');

module.exports = { importProperties };
