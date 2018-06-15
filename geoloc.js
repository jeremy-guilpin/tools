function maPosition(position) {
		
		var infos = "Position déterminée :<br/>\n";
			infos += "Latitude : <strong>"+position.coords.latitude +"</strong><br/>\n";
			infos += "Longitude: <strong>"+position.coords.longitude+"</strong><br/>\n";
			infos += "Altitude : <strong>"+position.coords.altitude +"</strong>\n";

		//console.log(infos);

		$.ajax({
			method: "POST",
			url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&key=<?= $google_key ?>',
		}).done(function(data) {
			
			var results = data.results,
				postal_code = null,
				city = null;

			$(results).each(function(i, el) {
				if(this.types[0] == 'postal_code') {
					var loc = this;

					$(loc.address_components).each(function(j, e) {
						if(this.types[0] == 'postal_code') {
							postal_code = this.long_name;
						}
						if(this.types[0] == 'locality') {
							city = this.long_name;
						}
					});
				}
			});

		}).fail(function(error) {

			console.log(error);

		});
	}

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(maPosition, showErrorGeoloc, {
			enableHighAccuracy: true, // On demande à l'appareil de rechercher une position la plus précise possible
			timeout: 5000, // Le temps de réponse max pour la recherche de la position (ms)
			maximumAge: 0 // Age du cache de la position - actuellement aucune donc on demande de rechercher à chaque fois
		});
	} else {
		console.error('Votre navigateur n\'accepte pas la géolocalisation');
	}

// Pour tester en localhost
chrome://flags/#allow-insecure-localhost
