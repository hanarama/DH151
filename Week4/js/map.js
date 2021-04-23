// Global variables
let map;
let lat = 38.5816;
let lon = -121.4944;
let zl = 6;
// global variables
let markers = L.featureGroup();
// if ("2018" in item) let markers = L.layerGroup1();
// if ("2019" in item) let markers = L.layerGroup2();
// if ("2020" in item) let markers = L.layerGroup3();

// path to csv data
let path = "https://raw.githubusercontent.com/hanarama/DH151/main/Week4/data/California_Fire_Incidents.csv";

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

	//circle markers
	let circleOptions = {
		radius: 5,
		weight: 1,
		color: 'white',
		fillColor: 'red',
		fillOpacity: 1
	}
	
	// loop through each entry
	data.data.forEach(function(item,index){

        if ("Latitude" in item && item.Longitude != 0){
            // create marker
            let marker = L.circleMarker([item.Latitude,item.Longitude],circleOptions)
			.on('mouseover',function(){
				this.bindPopup(item.Name+": "+item.AcresBurned+" acres burned").openPopup()
			})	

			//sidebar click event
			.on('click',function(){
				var sidebar = document.getElementById('firebar');
				sidebar.innerHTML = (
					`<div> <h3> ${item.Name} </h3> </div>
					<p>Location:
					${item.Location}</p>
					<p>Fire Description 
					${item.SearchDescription}</p>`)
			})

            // add marker to featuregroup
            // markers.addLayer(marker)

			//add items with 2018 to one layer group
			// if ("2018" == item.ArchiveYear){
			// 	f2018
			// }

			//add marker by year to layer
			
			}
	})

	// add featuregroup to map
	markers.addTo(map)

	// fit markers to map
    map.fitBounds(markers.getBounds())
}
//define layers
// let layers = {
//     "2018": myMarkers
     
// }