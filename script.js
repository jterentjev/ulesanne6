(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let ampm = " EL";

            if (h > 11) {
                ampm = " PL"
            }

            if (h > 12) {
                h = h - 12;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + ampm;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
	
	function checkIfStringHasNumber(st) {
		var check = false;
		for (var i = 0; i < st.length; i++) {
			if (st.charAt(i) === "1" || st.charAt(i) === "2" || st.charAt(i) === "3" || st.charAt(i) === "4" || st.charAt(i) === "5" || st.charAt(i) === "6" || st.charAt(i) === "7" || st.charAt(i) === "8" || st.charAt(i) === "9" || st.charAt(i) === "0") {
				check = true;
			}
		}
		return check;
	}
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
		let fname = document.getElementById("fname");
		let lname = document.getElementById("lname");
		let v1 = document.getElementById("v1");
		let v2 = document.getElementById("v2");
		let radios = document.getElementById("radios");
        
        if (fname.value.length == 0) {
            alert("Sisestage eesnimi");
            fname.focus();
            return;
			
		} else if (checkIfStringHasNumber(fname.value)) {
            alert("Nimi ei tohi sisaldada numbreid");
            fname.focus();
            return;
			
		} else if (lname.value.length == 0) {
            alert("Sisestage perekonnanimi");
            lname.focus();
            return;
			
		} else if (checkIfStringHasNumber(lname.value)) {
            alert("Nimi ei tohi sisaldada numbreid");
            lname.focus();
            return;
				
		} else if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
			
		} else if ((document.getElementById('radio1').checked || document.getElementById('radio2').checked || document.getElementById('radio3').checked) == false) {
			 alert("Vali tarneviis");
            radios.focus();
            return;
			
        } else {
            
			var x = 0.0;
			if (linn.value === "tln") {
				x = 0;
			}
			else if (linn.value === "trt") {
				x = 2.5;
			}
			else if (linn.value === "nrv") {
				x = 2.5;
			}
			else if (linn.value === "prn") {
				x = 3;
			}
			
			if (v1.checked) {
				x = x + 5;
			}
			
			if (v2.checked) {
				x = x + 1;
			}
			
			e.innerHTML = x + "€"; 
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AvN7-E9v5koaImEGUxs4pAc4iaQeGAFJ7dZQM2SKaV5kwhskKn9XY7OxH8i9uaXB";

let map;

let infobox;

let pin;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.3852882, 
            24.4966621
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 14,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);

    pin = new Microsoft.Maps.Pushpin(centerPoint, {
        title: 'Endla Teater',
        subTitle: 'Kultuuriobjekt',
    });

    pin.metadata = {
        title: 'Endla Teater',
        description: 'Endla on traditsiooniline teater pakkudes lavastusi  maailmaklassikast kuni algupäraste näitemängudeni.'
    };

    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

    map.entities.push(pin);
    
    function pushpinClicked(e) {
        if (e.target.metadata) {
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }
}

