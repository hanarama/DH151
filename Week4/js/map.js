// Global variables
let map;
let lat = 38.5816;
let lon = -121.4944;
let zl = 6;
// global variables
let markers = L.featureGroup();
// path to csv data
let path = "https://raw.githubusercontent.com/hanarama/DH151/main/Week4/data/California_Fire_Incidents.csv";
// let path = "https://raw.githubusercontent.com/hanarama/DH151/main/Week4/data/dunitz.csv";

// initialize
$( document ).ready(function() {
	createMap(lat,lon, zl);
    readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}
function mapCSV(data){
	
	// loop through each entry
	data.data.forEach(function(item,index){
		// create marker
        if ("latitude" in item){ 
            let marker = L.marker([item.latitude,item.longitude])

            // add marker to featuregroup
            markers.addLayer(marker)
        }
	})

	// add featuregroup to map
	markers.addTo(map)

	// fit markers to map
    map.fitBounds(markers.getBounds())
}
//define layers
// let layers = {
//     "My Markers": myMarkers
// }