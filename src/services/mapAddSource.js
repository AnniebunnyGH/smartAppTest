var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
export default function addLayer(map, layerName, updatedChurches) {
  map.addSource(layerName, {
    type: "geojson",
    data: { type: "FeatureCollection", features: updatedChurches },
  });

  map.addLayer({
    id: layerName,
    type: "symbol",
    source: layerName,
    layout: {
      "icon-image": "{icon}-15",
      "icon-allow-overlap": true,
    },
  });
  map.on("click", layerName, function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on("mouseenter", layerName, function () {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", layerName, function () {
    map.getCanvas().style.cursor = "";
  });
}
