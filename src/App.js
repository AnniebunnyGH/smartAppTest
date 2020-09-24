import React, { useEffect, useState } from "react";
import "./App.css";
import { SearchCard } from "./components/SearchCard";
import { ChurchCard } from "./components/ChurchCard";
import updateChurches from "./services/updateChurhes";
import fetchChurchesAPI from "./services/fetchChurhes";
import addLayer from "./services/mapAddSource";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5uaWVidW5ueW1iIiwiYSI6ImNrYXV3a3FyZDA2OHgycnU5MzJ0eWVtd20ifQ.VEDWv1Llwk54uBap2b8lFQ";
var map = new mapboxgl.Map({
  container: "mapContainer",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-73.9302941747, 40.737360644],
  zoom: 11.15,
});
var mapLayerNumber = 0;

function App() {
  const [coords, setCoords] = useState({
    longitude: "-73.9302941747",
    latitude: "40.737360644",
  });
  function updateCoords(newCoords) {
    setCoords(newCoords);
  }

  const [chosenChurch, setChurch] = useState({
    name: "",
    adress: "",
    url: "",
    tel: "",
  });

  useEffect(() => {
    async function createPopups() {
      const churches = await fetchChurchesAPI(coords);
      const updatedChurches = updateChurches(churches);
      addLayer(map, `churches${mapLayerNumber}`, updatedChurches);

      map.on("click", `churches${mapLayerNumber}`, function (e) {
        setChurch(JSON.parse(e.features[0].properties.info));
      });
      mapLayerNumber += 1;
    }

    map.flyTo({
      center: [+coords.longitude, +coords.latitude],
      essential: true,
    });
    createPopups();
  }, [coords]);

  return (
    <div className="App">
      <div id="infoContainer">
        <SearchCard search={updateCoords}></SearchCard>
        <ChurchCard church={chosenChurch}></ChurchCard>
      </div>
    </div>
  );
}

export default App;
