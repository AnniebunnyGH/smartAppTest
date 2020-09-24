var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5uaWVidW5ueW1iIiwiYSI6ImNrYXV3a3FyZDA2OHgycnU5MzJ0eWVtd20ifQ.VEDWv1Llwk54uBap2b8lFQ";
export var map = new mapboxgl.Map({
  container: "mapContainer",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-73.9302941747, 40.737360644],
  zoom: 11.15,
});
