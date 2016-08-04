/** Created by manu on 16.06.2016. */

// the function which handles the input field logic
function printLocation() {

    //Get Data from my webserver
    var xhr = new XMLHttpRequest();
    var locationInput = document.getElementById('location').value;

    //Save location
    localStorage.setItem("location", locationInput);
    console.log(localStorage.getItem("location"));

    //URL and attached user input
    var url = 'http://querbeetberlin.de:8080/'+locationInput;

    xhr.addEventListener("load", reqListener);
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send();
}

//TODO: #14: Fallunterscheidung, je nachdem ob Wert in localStorage gespeichert ist oder nicht.


//diese Funktion gibt die Temperatur für die kommenden 24h aus.
function reqListener () {
    //print out server response in console
    //console.log(this.responseText);

    //read text of the xmlhttpRequest
    var xhrResponse = this.responseText;
    console.log(xhrResponse);
    //transform text to JSON object
    var xhrResponseJSN = JSON.parse(xhrResponse);

    //define key to look up temperatures
    var key = 'temperature';

    //call function that retrieves all values for the key temp
    var temperature = getValues(xhrResponseJSN,key);

    //select first 24 temperature values (forecast.io provides data in 1 hour-steps)
    var forecast24 = temperature.slice(0,24);
    console.log(forecast24);

    var lowestTemp = Math.min.apply(Math, forecast24);
    console.log(lowestTemp);

    //get element to print out statement about min temperature
    var minResult = document.getElementById('weatherResultText');

    //print out statement depending on temperature minimum in forecast:

    //if temp below or equal 5 degree celcius
    if (lowestTemp <= 5){
      minResult.textContent = "Achtung! Heute Nacht sind Temperaturen von "+lowestTemp+" Grad oder weniger zu erwarten."

    //if temperature above 5 degree celcius
    } else {
      minResult.textContent = "Alles fein. Heute Nacht wird es voraussichtlich nicht kälter als "+lowestTemp+" Grad."
    }

    //var lowestTempString = JSON.stringify(lowestTemp);

}

//generic function to retrieve keys in JSON data // used for old Open Weather Map solution:
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

//print out User Input for debugging and demonstration
function printLocationHelper () {
    //print out users input of location in paragraph "locationResult"
    var locationInput = document.getElementById('location').value;
    var locationDisplay = document.getElementById('locationResult');
    locationDisplay.textContent = locationInput;

    //print out locationInput in console
    console.log(locationInput);
}
//TODO: Display address from Google GeoCoding

//eventlistener for click on LocationButton
var locationButton = document.getElementById('locationButton');
locationButton.addEventListener('click', printLocationHelper, false);

//eventlistener for click on forecastButton
var forecastButton = document.getElementById('forecastButton');
forecastButton.addEventListener('click', printLocation, false);
