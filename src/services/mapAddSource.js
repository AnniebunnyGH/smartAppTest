var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
export default function addLayer(map, layerName, updatedChurches) {
  if (map.getLayer(layerName)) {
    map.removeLayer(layerName);
    map.removeSource(layerName);
  }

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

  map.on("mouseenter", layerName, function () {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", layerName, function () {
    map.getCanvas().style.cursor = "";
  });
}
