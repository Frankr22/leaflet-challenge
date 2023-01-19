// Initialize the map
var map = L.map('map').setView([0, 0], 2);;

// Add the tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

  // Use this link to get the Austalian States GeoJSON data
  let link = "https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/australian-states.min.geojson";

  // Getting our GeoJSON data
  d3.json(link).then(function(data) {

// Iterate through the earthquake data and add markers to the map
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
    
// Create a legend for the map
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        depths = [0, 50, 100, 150, 200],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

// Function to determine the color of the marker based on the depth of the earthquake
function getColor(d) {
    return d > 200 ? '#800026' :
           d > 150  ? '#BD0026' :
           d > 100  ? '#E31A1C' :
           d > 50  ? '#FC4E2A' :
                      '#FD8D3C';
};