const axios = require('axios');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env file

// Your HubSpot private app token from .env
const privateAppToken = process.env.cca;

// Function to create custom object
async function createCustomObject(customObjectSchema) {
  // Read the JSON file
  const customObjectData = JSON.parse(
    fs.readFileSync(customObjectSchema, 'utf8')
  );

  // Utilizing the custom-object JSON files, and the /crm-object-schemas/v3/schemas
  const url = 'https://api.hubapi.com/crm-object-schemas/v3/schemas';

  try {
    const response = await axios.post(url, customObjectData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${privateAppToken}`,
      },
    });
    console.log('Custom object created successfully:', response.data);
  } catch (error) {
    console.error(
      'Error creating custom object:',
      error.response ? error.response.data : error.message
    );
  }
}

// Call the function
//createCustomObject('data/1.custom-object-locations.json');
//createCustomObject('data/1.custom-object-vehicles.json');
//createCustomObject('data/1.custom-object-rental-agreement.json');

module.exports = { createCustomObject };
