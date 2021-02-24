//Fetch to https://api.mapbox.com/geocoding/v5/mapbox.places/94 avenue des chalets, 31140,Launaguet .json?types=address&access_token=process.env.MAPBOX_ACCESS_TOKEN
const fetch = require('node-fetch');


const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
exports.geocodeAddress = async data => {
    const address = formatAddress(data);
    const response = await fetch(`${baseUrl}${address}.json?types=address&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`);
    if (!response.ok) {
         const message = `Can't geocode address : ${response.status}`;
         throw new Error(message);
     }
    const result = await response.json();
    return result.features[0].center;
}

const formatAddress = leisureCentreReqData => {
    console.log("leisureCentreReqData",leisureCentreReqData)
      const {
          addressName,
          zipCode,
          cite,
          country
      } = leisureCentreReqData;
      let address = `${addressName}, ${zipCode}, ${cite}, ${country}.`;
      return address;
}



