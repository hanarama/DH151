let locations = [
    {
        'title':'Las Vegas',
        'lat': 36.1504,
        'lon': -115.1522,
        'desc': 'I got married at Chapel of Flowers in a small ceremony.',
        'id': 0
    },
    {
        'title':'Los Angeles',
        'lat': 33.9416,
        'lon': -118.4085,
        'desc': 'After COVID, we will leave from LAX.',
        'id': 1
    },
    {
        'title':'Bath',
        'lat': 51.3811,
        'lon': -2.3590,
        'desc': 'Start trip in Bath, where we will see the Roman Baths, the Jane Austen Museum, and visit Stonehenge a short while away.',
        'id': 2
    },
    {
        'title':'Hay-on-Wye',
        'lat': 52.0757,
        'lon': -3.1259,
        'desc': 'This tiny town is full of independent booksellers. We want to visit them all!',
        'id': 3
    },
    {
        'title':'Cotswolds',
        'lat': 51.7740,
        'lon': -1.6534,
        'desc': 'Visit the Wildlife Park in the Cotswolds, where we can see animals and plantlife.',
        'id': 4
    },
    {
        'title':'York',
        'lat': 53.4952,
        'lon': -1.0216,
        'desc': 'Visit York to see the York Minster Cathedral, The Shambles, the York Maze, and to sample as much pub food as we can!  ',
        'id': 5
    },
    {
        'title':'Edinburgh',
        'lat': 55.9533,
        'lon': -3.1883,
        'desc': 'Going up to Scotland, to see castles, nature, and maybe try some Scotch whiskey.',
        'id': 6
    },
    {
        'title':'Loch Ness',
        'lat': 57.3229,
        'lon': -4.4244,
        'desc': 'Finally, up to the highlands to say "Hello!" to Nessie!',
        'id': 7
    },
    {
        'title':'Inverness',
        'lat': 57.4778,
        'lon': -4.2247,
        'desc': 'Over to Inverness, tired and probably ready to go home.',
        'id': 8
    },
]
var map = L.map('map').setView([40.7128,-74.0060],3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//custom icons
var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.iconscout.com/icon/free/png-256/heart-56-76703.png',
    //shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [35, 40],
    iconAnchor: [12, 40],
    popupAnchor: [1, -34],
    //shadowSize: [30, 30]
    });

//fly function 
function flyByID(index){
    console.log(index);        
    map.flyTo([locations[index].lat,locations[index].lon],12);
    
    // open the popup
    myMarkers.getLayers()[index].openPopup()
}

//create featureGroup
let myMarkers = L.featureGroup();

// loop data
locations.forEach(function(item){
    //create marker
    let marker = L.marker([item.lat,item.lon], {icon: greenIcon}).bindPopup(item.title+": "+item.desc);

    //add marker to featureGroup
    myMarkers.addLayer(marker);

    //add data to sidebar
    $('.sidebar').append(`<div class="sidebar-item" onclick="flyByID(${item.id})">${item.title}</div>`)
});

//add FeatureGroup to Map
myMarkers.addTo(map);

//define layers
let layers = {
    "My Markers": myMarkers
}

//layer controls
L.control.layers(null,layers).addTo(map)

// make the map zoom to the extent of markers
map.fitBounds(myMarkers.getBounds());

