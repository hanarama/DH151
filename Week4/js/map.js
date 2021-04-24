// Global variables
let map;
let lat = 38.5816;
let lon = -121.4944;
let zl = 6;
// global variables
let markers = L.featureGroup();
let f2018 = L.layerGroup();
let f2019 = L.layerGroup();

//define layers
let layers = {
    "2018 Fires": f2018,
	"2019 Fires": f2019
     
}
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
//show and hide paragraph 
function ShowAndHide() {
	var x = document.getElementById('info');
	if (x.style.display == 'none') {
		x.style.display = 'block';
	} else {
		x.style.display = 'none';
	}
}
//Zoom In function
function zoomTo(lat,lon) {
	// zoom to level 17 first
	map.setZoom(12);
	// pan to the marker
	map.panTo([lat, lon])
}

//Zoom back out function
function zoomOut(){
	map.fitBounds(markers.getBounds())
}

//Alternate zoom in + zoom out button
function inNOut(lat,lon) {
	var zoombutton = document.getElementById('zoombutton');
	if (zoombutton.textContent == 'Zoom In') { //if text says...
		zoombutton.textContent = 'Zoom Out';   //switch text to 
		zoomTo(lat,lon)							//do function
	} else {
		zoombutton.textContent = 'Zoom In';		//switch text back 
		zoomOut()								//do 2nd function
	}
}

function mapCSV(data){

	//circle markers
	let circleOptions = {
		radius: 6,
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
					<div class="sidebar-item" onclick="ShowAndHide()">More Information</div>
					<div id = "info" style="display: none">${item.SearchDescription}</div>
					<div id = "zoombutton" class="sidebar-item" onclick="inNOut(${item.Latitude}, ${item.Longitude})">Zoom In</div>`)
					
			})
			
            // add marker to featuregroup
            markers.addLayer(marker)

			//add items by year to layer groups
			if ("2018" == item.ArchiveYear){
				f2018.addLayer(marker)
			}
			else if ("2019" == item.ArchiveYear){
				f2019.addLayer(marker)
			}
		}
	})

	// add featuregroup to map
	//markers.addTo(map)

	// add layer groups to map
	f2018.addTo(map)
	f2019.addTo(map)

	//layer controls
	L.control.layers(null,layers).addTo(map)

	// fit markers to map
    map.fitBounds(markers.getBounds())
}
