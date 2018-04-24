console.log('the map');

// api endpoints stored in variables
const qpl_URL = 'https://data.cityofnewyork.us/resource/b67a-vkqb.json'
const post_office = 'https://data.cityofnewyork.us/resource/bdha-6eqy.json'

const filters = document.getElementById('filters');
const checkboxes = document.getElementsByClassName('filter');

// add map
L.mapbox.accessToken = 'pk.eyJ1IjoiY2xheW5lIiwiYSI6ImNqN3dqamVrMTU0cjQycXFuMTF6OWI0ZGsifQ.3v8Gth3Z6G_vtQJn2GMJKg';
const map = L.mapbox.map('map', 'mapbox.streets')
	.setView([40.7456769, -74.002375], 13)

function load() {
	// queens public library data
	$.ajax({
		headers: {
	      'Accept': 'application/vnd.github.v3.raw'
	    },
	    xhrFields: {
	      withCredentials: false
	    },
	    dataType: 'json',
	    url: qpl_URL,
	    success: function(geojson){
	    	for(var item in geojson){
	    		if(geojson.hasOwnProperty(item)){
	    			var location = geojson[item].location_1;
	    			var properties = geojson[item]
	    			if(typeof location !== 'undefined') 
	    			console.log(location)
	    			console.log(properties)
	    		} else {
	    			console.log(location)
	    			console.log(properties)
	    		}
	    		var markerLayer = L.mapbox.featureLayer(location).addTo(map)

	    		markerLayer.eachLayer(function(layer) {
	    			
	    			let qpl_name = properties.name
	    			let qpl_address = properties.address
	    			let qpl_city = properties.city
	    			let qpl_phone = properties.phone

	    			let content = '<p> Branch Name: ' + qpl_name + '<br \/> Branch Address: ' + qpl_address  + '<br \/> Branch City: ' + qpl_city  + '<br \/> Branch Phone: ' + qpl_phone  + '<\/p>';

	    			layer.bindPopup(content);
	    		})
	    		
	    	}
	    }
	})


	// 5 borough post office data
	$.ajax({
		headers: {
	      'Accept': 'application/vnd.github.v3.raw'
	    },
	    xhrFields: {
	      withCredentials: false
	    },
	    dataType: 'json',
	    url: post_office,
	    success: function(geojson){
	    	// console.log(geojson)
	    	for(var item in geojson){
	    		if(geojson.hasOwnProperty(item)){
	    			var location = geojson[item].the_geom;
	    			var properties = geojson[item]
	    			// if(typeof location !== 'undefined') 
	    			console.log(location)
	    			console.log(properties)

	    		} else {
	    			console.log(location)
	    			// console.log(properties)
	    		}
	    		var markerLayer = L.mapbox.featureLayer(location).addTo(map)


	    		markerLayer.eachLayer(function(layer) {
	    			
	    			let po_name = properties.name
	    			let po_address = properties.streetname
	    			let po_city = properties.city
	    			let po_housenum = properties.housenum

	    			let content = '<p> Branch Name: ' + po_name + '<br \/> Branch Address: ' + po_housenum + " " + po_address  + '<br \/> Branch City: ' + po_city  + '<\/p>';

	    			layer.bindPopup(content);

	    			console.log(properties)
	    		})

	    	}
	    		// connect the checkboxes to the markers
	    	function change() {

	    		markerLayer.setGeoJSON({
	    			type: "FeatureCollection",
	    			features: [{
	    			    type: "Feature",
	    			    geometry: location,
	    			    properties: {
	    			    	"id": "post office",
	    			    	"name": properties.name,
	    			    	"address": properties.streetname,
	    			    	"city": properties.city,
	    			    	"housenum": properties.housenum
	    			    }
	    			}]
	    		})

	    		var features = markerLayer.getGeoJSON()
	    		console.log(features)

	    		var on = [];
	    		for (var i = 0; i < checkboxes.length; i++) {
	    			if (checkboxes[i].checked) on.push(checkboxes[i].value);
	    			console.log(on)
	    	    }

	    	    markerLayer.setFilter(function (f) {
	    	    	console.log(f.properties)
	    	    	// return on.indexOf(f.properties['id']) !== -1;
	    	    })
	    	    return false;
	    	}

	    	filters.onchange = change;
	    	change()

	    }

	});

}


// function change() {
// 	var on = [];
// 	for (var i = 0; i < checkboxes.length; i++) {
// 		if (checkboxes[i].checked) on.push(checkboxes[i].value);
// 		console.log(on)
//     }

//     map.markerLayer.setFilter(function (f) {
//     	console.log(on.indexOf(f.properties))
//     	// return on.indexOf(f.properties['marker-symbol']) !== -1;
//     })
//     return false;
// }
// filters.onchange = change;

// change()

$(load);
