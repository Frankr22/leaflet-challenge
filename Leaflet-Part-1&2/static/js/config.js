// URL for the GeoJSON data
const GEOJSON_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to determine the color of the marker based on the depth of the earthquake
const getColor = d => {
    return d > 200 ? '#800026' :
           d > 150  ? '#BD0026' :
           d > 100  ? '#E31A1C' :
           d > 50  ? '#FC4E2A' :
                      '#FD8D3C';
};

// URL for the tectonic plate GeoJSON data
const TECTONIC_PLATE_URL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
