import { map } from "./initMap";
var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default function initMap(updatedChurches, layerName = "churches") {
  map.addSource(layerName, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: updatedChurches,
    },
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });

  map.addLayer({
    id: "clusters",
    type: "circle",
    source: layerName,
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        100,
        "#f1f075",
        750,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    },
  });

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: layerName,
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  });

  map.addLayer({
    id: "places",
    type: "symbol",
    source: layerName,
    filter: ["!", ["has", "point_count"]],
    layout: {
      "icon-image": "{icon}-15",
      "icon-allow-overlap": true,
    },
  });

  map.on("click", "clusters", function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    });
    var clusterId = features[0].properties.cluster_id;
    map
      .getSource(layerName)
      .getClusterExpansionZoom(clusterId, function (err, zoom) {
        if (err) return;

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom,
        });
      });
  });

  map.on("mouseenter", "clusters", function () {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "clusters", function () {
    map.getCanvas().style.cursor = "";
  });

  map.on("mouseenter", "places", function () {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "places", function () {
    map.getCanvas().style.cursor = "";
  });
}
