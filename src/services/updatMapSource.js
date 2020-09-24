import { map } from "./initMap";

export default function updateMapSource(
  updatedChurches,
  layerName = "churches"
) {
  map.getSource(layerName).setData({
    type: "FeatureCollection",
    features: updatedChurches,
  });
}
