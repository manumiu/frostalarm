/**
 * Created by manu on 16.06.2016.
 */


/** wie sollte das ablaufen? Der Benutzer gibt einen Standort in ein Formularfeld ein.
 *Der Wert wird dann zuerst zwischengespeichert (warum?), dann als Abfragewert an die
 * OpenWeatherAPI geschickt. Von dieser soll dann die zugehörige Temperatur für diesen
 * Ort zurückgeliefert werden.
 * Diese Temperatur wird dann je nach Wert weiterverarbeitet:
 *      - Fall 1: Temperaturen über 5° C: - keine Notification- (oder„In den nächsten 24 Stunden ist keine Kälte zu erwarten.“).
 o	    - Fall 2: Temperaturen gleich oder unter 5° C: „Achtung! In den nächsten 24 Stunden kann die Temperatur auf x° C fallen.“
 o	    - Fall 3: falls Daten nicht abrufbar sein sollten: Ausgabe an Nutzer „Fehler: Wetterdaten konnten nicht abgefragt werden.“
                  (und was sollte dann im Hintergrund passieren?)
 */


// the function which handles the input field logic
function printLocation() {
    var location = document.getElementById('location').value;

    // TODO: Zuordnung Stadt zu City ID
    // TODO: Nutzereingabe "intelligent" machen (Autocomplete, "Did you mean...?")
    /* OpenWeatherMap empfiehlt, die API per CITY ID abzurufen. Liste mit City IDs ist unter res/citylist abgelegt

    Ich hab nun erstmal eine Abfrage der API händisch abgespeichert. Muss also später noch
    rausfinden, wie man das automatisiert. Aber gehen wir mal davon aus, dass das irgendwie funktioniert hat:
    Dann würde ich jetzt gerne erst mal zum Ausprobieren den Namen der Stadt ausgeben lassen...
    */

    var city = '{"name" : "Berlin "}';
    var object = JSON.parse(city);

    // Folgende zwei Zeilen geben die Location im p-Block "Result" aus
  var result = document.getElementById('result');
        // result.textContent = location;
        result.textContent = object.name;

        //ES FUNKTIONIERT!!!! Es wird "Berlin Ole!" ausgegeben! OMG!!!
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
    //
    // Noch eine Fehlermeldung: Cross-Origin-Anfrage wird blockiert.
*/
    // was machen die folgenden zwei Zeilen?
}

// use an eventlistener for the event
var subButton = document.getElementById('subButton');
subButton.addEventListener('click', printLocation, false);

