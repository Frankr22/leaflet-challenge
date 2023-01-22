// Initialize the map
var map = L.map('map').setView([0, 0], 2);;

// Define the tile layers
var openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
subdomains: 'abcd',
minZoom: 1,
maxZoom: 16,
ext: 'jpg'
});

// Add the tile layers to the map
map.addLayer(openStreetMap);

// Create the layer control
var baseMaps = {
"OpenStreetMap": openStreetMap,
"Satellite": satellite,
"Watercolor": watercolor
};

// Add the layer control to the map
L.control.layers(baseMaps, null, { position: 'topleft' }).addTo(map);

// Getting our GeoJSON data
d3.json(GEOJSON_URL).then(function(data) {

for (var i = 0; i < data.features.length; i++) {
var earthquake = data.features[i];
var coordinates = earthquake.geometry.coordinates;
var magnitude = earthquake.properties.mag;
var depth = earthquake.geometry.coordinates[2];

// Create a marker for the earthquake
var marker = L.circleMarker([coordinates[1], coordinates[0]], {
    radius: magnitude * 3, // adjust the size based on magnitude
    color: getColor(depth), // adjust the color based on depth
    fillOpacity: 0.5
}).addTo(map);

// Add a popup with information about the earthquake
marker.bindPopup("<b>Magnitude:</b> " + magnitude + "<br><b>Depth:</b> " + depth + " km<br><b>Location:</b> " + earthquake.properties.place);
};
});

// Getting our tectonic plate GeoJSON data
d3.json(TECTONIC_PLATE_URL).then(function(data) {

    // Add the tectonic plate data to the map as a layer
    L.geoJSON(data, {
      style: {
        color: "orange",
        weight: 2,
        opacity: 0.8
      }
    }).addTo(map);
  });  

// Create a legend for the map
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        depths = [0, 50, 100, 150, 200],
        labels = [];

    // loop through our depth intervals and generate a label with a colored square for each interval
    for (var i = 0; i < depths.length; i++) {
        var box = L.DomUtil.create('div', 'legend-box');
        box.style.backgroundColor = getColor(depths[i] + 1);
        div.appendChild(box);
        div.innerHTML += depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
