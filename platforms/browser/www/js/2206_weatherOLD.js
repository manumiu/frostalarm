/** Created by manu on 16.06.2016. */
// TODO: Nutzereingabe "intelligent" machen (Autocomplete, "Did you mean...?")

// the function which handles the input field logic
function printLocation() {
    var location = document.getElementById('location').value;

    // TODO: Zuordnung Stadt zu City ID
    // Liste mit City IDs ist unter res/citylist abgelegt

    //Abfrage der Daten, die von meinem Webserver ausgegeben werden
    var xhr = new XMLHttpRequest();
    var url = 'http://querbeetberlin.de:8080/';

    xhr.addEventListener("load", reqListener);
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send();

    /*
     // nun: versuchen, die daten von der api zu bekommen:

     var xhr = new XMLHttpRequest();
     var url =
     'http://api.openweathermap.org/data/2.5/forecast?id=6545310&units=metric&appid=d960f998d0f7f3556267a5a5a1e327be&mode=xml';
     xhr.open("GET", url, true);
     xhr.setRequestHeader('Content-Type', 'text/plain');
     xhr.send();

     //Funktioniert nicht. Problem scheint zu sein, dass Firefox http-Anfrage nicht akzeptiert. Aber OpenWeatherMap
     // hat keine https-Möglichkeit....
     // Mixed content blocking
     // Same Origin-Policy
     // Noch eine Fehlermeldung: Cross-Origin-Anfrage wird blockiert.
     */
}

function reqListener () {
    console.log(this.responseText);
    var xhrResponse = JSON.parse(this.responseText);
    xhrResponse = JSON.stringify(xhrResponse);
    var result = document.getElementById('result');
    result.textContent = xhrResponse;
}

// was machen die folgenden zwei Zeilen?
// use an eventlistener for the event
var subButton = document.getElementById('subButton');
subButton.addEventListener('click', printLocation, false);

