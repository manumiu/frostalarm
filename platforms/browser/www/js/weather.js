/** Created by manu on 16.06.2016. */
// TODO: Nutzereingabe "intelligent" machen (Autocomplete, "Did you mean...?")

// the function which handles the input field logic
function printLocation() {
    //var location = document.getElementById('location').value;

    // TODO: Zuordnung Stadt zu City ID
    // Liste mit City IDs ist unter res/citylist abgelegt

    //Abfrage der Daten, die von meinem Webserver ausgegeben werden
    var xhr = new XMLHttpRequest();
    var locationInput = document.getElementById('location').value;

    //URL and attached user input
    var url = 'http://querbeetberlin.de:8080/'+locationInput;

    xhr.addEventListener("load", reqListener);
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send();

    //Beobachtung: Request wird alle paar Sekunden neu abgeschickt. Zählt das dann jedes Mal als ein eigener Aufruf
    // der API?
}

//diese Funktion gibt die Temperatur für die kommenden 24h aus.
function reqListener () {
    //print out server response in console
    //console.log(this.responseText);

    //read text of the xmlhttpRequest
    var xhrResponse = this.responseText;

    //transform text to JSON object
    var xhrResponseJSN = JSON.parse(xhrResponse);

    //define key to look up temperatures
    var key = 'temperature';

    //call function that retrieves all values for the key temp
    var temperature = getValues(xhrResponseJSN,key);

    //select first 24 temperature values (forecast provides data in 1 hour-steps)
    var forecast24 = temperature.slice(0,24);
    console.log(forecast24);

    var lowestTemp = Math.min.apply(Math, forecast24);
    console.log(lowestTemp);

    //get element to print out statement about min temperature
    var minResult = document.getElementById('weatherResultText');

    //print out statement depending on temperature minimum in forecast

    //if temp below or equal 5 degree celcius:
    if (lowestTemp <= 5){
      minResult.textContent = "Achtung! Heute Nacht sind Temperaturen von "+lowestTemp+" Grad oder weniger zu erwarten."

    //if temperature above 5 degree celcius:
    } else {
      minResult.textContent = "Alles fein. Heute Nacht wird es voraussichtlich nicht kälter als "+lowestTemp+" Grad."
    }

    var lowestTempString = JSON.stringify(lowestTemp);

    //TODO: prüfen, ob ein wert unterhalb einer Temperatur x enthalten ist.


    //find paragraph with ID "WeatherResult" to print out the temperature data in it
    var owmResult = document.getElementById('weatherResultTemp');

    // print out next 24 temperature values in "weatherResult"
    owmResult.textContent = "Erwartetes Temperatur-Minimum der nächsten 24 Stunden: "+lowestTempString+"°C ";
}

//generic function to retrieve keys in JSON data
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

//diese Funktion printet aktuell die Nutzereingabe aus, soll zukünftig die Nutzereingabe an den Server schicken
function printLocationHelper () {
    //print out users input of location in paragraph "locationResult"
    var locationInput = document.getElementById('location').value;
    var locationDisplay = document.getElementById('locationResult');
    locationDisplay.textContent = locationInput;

    //print out locationInput in console
    console.log(locationInput);
}
//TODO: "name" der location mit ausgeben
//id for Berlin Pankow is 2855598


//use eventlistener for click on LocationButton
var LocationButton = document.getElementById('LocationButton');
LocationButton.addEventListener('click', printLocationHelper, false);


// was machen die folgenden zwei Zeilen?
// use an eventlistener for the event
var subButton = document.getElementById('subButton');
subButton.addEventListener('click', printLocation, false);
