# Seismic Activity and Tectonic Plate Visualization
This project is a web-based map visualization that displays data on seismic activity and tectonic plate boundaries. The map uses data from the OpenStreetMap project and is built using Leaflet.js and D3.js.

## Getting Started
To run the project locally, you will need to have a web server installed on your machine. You can use a tool like http-server or live-server to run the project.

- Clone or download the repository to your local machine.
- Open a command prompt or terminal window in the project directory.
- Start a web server in the project directory. For example, you can use the following command to start http-server:
- Open a web browser and navigate to http://localhost:8080/ to view the project.

## Features
- Displays seismic activity data as circles on the map, with the size and color of the circles indicating the magnitude and depth of the earthquake.
- Displays tectonic plate boundaries as orange lines on the map.
- Includes a legend to show the color and size of the seismic activity circles
- Includes a zoom feature that allows the user to zoom in and out on the map
- Includes a layer control that allows the user to toggle between different base maps such as satellite and light.

## Data Sources
- Seismic activity data is provided by the USGS (https://earthquake.usgs.gov/)
- Tectonic plate data is provided by Fraxen (https://github.com/fraxen/tectonicplates)
- Base maps are provided by OpenStreetMap (https://www.openstreetmap.org/)

## Built With
- Leaflet.js (https://leafletjs.com/) - an open-source JavaScript library for creating maps
