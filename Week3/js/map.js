let locations = [
    {
        'title':'Las Vegas',
        'lat': 36.1504,
        'lon': -115.1522,
        'desc': 'Married at Chapel of Flowers',
    },
    {
        'title':'Los Angeles',
        'lat': 33.9416,
        'lon': -118.4085,
        'desc': 'After COVID, leave from LAX'
    },
    {
        'title':'Bath',
        'lat': 51.3811,
        'lon': -2.3590,
        'desc': 'Start trip in Bath'
    },
    {
        'title':'Hay-on-Wye',
        'lat': 52.0757,
        'lon': -3.1259,
        'desc': 'Visit bookshops in Hay-on-Wye'
    },
    {
        'title':'Cotswolds',
        'lat': 51.7740,
        'lon': -1.6534,
        'desc': 'Visit the Wildlife Park in the Cotswolds'
    },
    {
        'title':'Yorkshire',
        'lat': 53.4952,
        'lon': -1.0216,
        'desc': 'Stop by Yorkshire'
    },
    {
        'title':'Edinburgh',
        'lat': 55.9533,
        'lon': -3.1883,
        'desc': 'Going up to Scotland'
    },
    {
        'title':'Loch Ness',
        'lat': 57.3229,
        'lon': -4.4244,
        'desc': 'Finally up to the highlands'
    },
    {
        'title':'Inverness',
        'lat': 57.4778,
        'lon': -4.2247,
        'desc': 'Over to Inverness, ready to go home'
    },
]
    var map = L.map('map').setView([40.7128,-74.0060],3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    locations.forEach(function(item){
        var marker = L.marker([item.lat,item.lon]).addTo(map)
                    .bindPopup(item.title+": "+item.desc)
                    .openPopup()
    });