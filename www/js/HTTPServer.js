//Require/import the HTTP module
const http = require('http');
//Import npm request module
const request = require('request');

//Define a port to listen to
const PORT = 8080;

//Function which reads user input (postal code), handles request and sends response
function handleRequest(req, res){

    //get parameter from requesting URL
    var postalCode = req.url;

    //cut off the slash
    postalCode = postalCode.substr(1);
    console.log(postalCode);

    const urlGoogle= "https://maps.google.com/maps/api/geocode/json?key=AIzaSyCtssZDEcU11RffDWRkmyenarN_eG8S5Vs&components=country:DE|postal_code:"+postalCode;

    //get lat, long for postal code from Google GeoCoding
    request(urlGoogle, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            console.log("Google Geocoding erfolgreich angefragt");
            //save body of response
            var geoData = body;
            console.log(geoData);
            var geoDataJSN = JSON.parse(geoData);
            //get the address out of the response
            var address = geoDataJSN.results[0].formatted_address;
            console.log(address);
            //get latitude and longitude values for postal code
            var lat = geoDataJSN.results[0].geometry.location.lat;
            var lng = geoDataJSN.results[0].geometry.location.lng;
            console.log(lat);
            console.log(lng);

            const urlForecast = "https://api.forecast.io/forecast/4c631760f02a147c4eafe608562e327c/"+lat+","+lng+"?units=si&exclude=[currently,daily]"
            console.log(urlForecast);

            // get forcast for specified latitude and longitude
            request(urlForecast, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.writeHead(response.statusCode, {"Content-Type": "application/json"});
                    res.write(body);
                    // TODO: add adress to response
                    res.end();
                    console.log("Wetterdaten angekommen");
                // if statusCode from forecast.io ist not 200:
                } else {
                    res.writeHead(response.statusCode);
                    res.write(error);
                    res.end();
                }
            });

        //if status code from google geocoding is not 200
        } else {
            res.writeHead(response.statusCode);
            res.write(error);
            res.end();
        }
    });
}

//Create a server
const server = http.createServer(handleRequest);

//Start server
server.listen(PORT, function (){
    //Callback triggered when server is successfully listening.
    console.log("Server sucessfully listening"); //
});
