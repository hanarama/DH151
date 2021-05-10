// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;
let path = '';
let geojsonPath = 'data/world.json';
let geojson_data;
let geojson_layer;

// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
    getGeoJSON();
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to get the geojson data
function getGeoJSON(){

	$.getJSON(geojsonPath,function(data){
		console.log(data)

		// put the data in a global variable
		geojson_data = data;

		// call the map function
		mapGeoJSON()
	})
}