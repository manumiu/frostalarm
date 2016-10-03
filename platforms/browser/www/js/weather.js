/** Created by manu on 16.06.2016. */

// the function which handles the input field logic
function printLocation() {
    let xhr = new XMLHttpRequest();
    //get user input
    let locationInput = document.getElementById('locationInputField').value;

    //URL and attached user input
    let url = 'http://querbeetberlin.de:8080/'+locationInput;

    xhr.addEventListener("load", reqListener);
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send();
    //Save location
    localStorage.setItem("location", locationInput);
    console.log(localStorage.getItem("location"));
}

//TODO: #14: Care for two cases: localStorage is full, localStorage is empty.

//case one: localStorage is empty (that means, first start of the app)


//get forecast for next 24 hours and find out the minimum temperature
function reqListener () {
    //print out server response in console
    //console.log(this.responseText);

    //read text of the xmlhttpRequest
    let xhrResponse = this.responseText;
    console.log(xhrResponse);
    //transform text to JSON object
    let xhrResponseJSN = JSON.parse(xhrResponse);

    //define key to look up address data
    let addressKey = "addressFromGoogle";
    let addressData = getValues (xhrResponseJSN,addressKey);
    console.log(addressData[0]);
    let addressField = document.getElementById('addressAccordingToLatLng');
    addressField.textContent = "Vorhersage für: " + addressData;

    //define key to look up temperatures
    let tempKey = 'temperature';

    //call function that retrieves all values for the key temp
    let temperature = getValues(xhrResponseJSN,tempKey);

    //select first 24 temperature values (forecast.io provides data in 1 hour-steps)
    let forecast24 = temperature.slice(0,24);
    console.log(forecast24);

    //get lowest value
    let lowestTemp = Math.min.apply(Math, forecast24);
    console.log(lowestTemp);

    //get element to print out statement about min temperature
    let minResult = document.getElementById('forecastText');

    //print out statement depending on temperature minimum in forecast:

    //if temp below or equal 5 degree celcius
    if (lowestTemp <= 5){
      minResult.textContent = "Achtung! Heute Nacht sind Temperaturen von "+lowestTemp+" Grad oder weniger zu erwarten."

    //if temperature above 5 degree celcius
    } else {
      minResult.textContent = "Alles fein. Heute Nacht wird es voraussichtlich nicht kälter als "+lowestTemp+" Grad."
    }
}

//generic function to retrieve keys in JSON data
function getValues(obj, key) {
    let objects = [];
    for (let i in obj) {
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
    let locationInput = document.getElementById('location').value;
    let locationDisplay = document.getElementById('locationResult');
    locationDisplay.textContent = locationInput;

    //print out locationInput in console
    console.log(locationInput);
}
//TODO: Display address from Google GeoCoding

//eventlistener for click on LocationButton
//let locationButton = document.getElementById('locationButton');
//locationButton.addEventListener('click', printLocationHelper, false);

//eventlistener for click on forecastButton
let forecastButton = document.getElementById('forecastButton');
forecastButton.addEventListener('click', printLocation, false);
