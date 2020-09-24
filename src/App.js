import React, { useEffect, useState } from "react";
import "./App.css";
import { SearchCard } from "./components/SearchCard";
import { ChurchCard } from "./components/ChurchCard";
import updateChurches from "./services/updateChurhes";

import addLayer from "./services/mapAddSource";
import { useHttp } from "./hooks/fetch.hook";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5uaWVidW5ueW1iIiwiYSI6ImNrYXV3a3FyZDA2OHgycnU5MzJ0eWVtd20ifQ.VEDWv1Llwk54uBap2b8lFQ";
var map = new mapboxgl.Map({
  container: "mapContainer",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-73.9302941747, 40.737360644],
  zoom: 11.15,
});

function App() {
  const { loading, request, error } = useHttp();
  const [coords, setCoords] = useState({
    longitude: "-73.9302941747",
    latitude: "40.737360644",
  });
  function updateCoords(newCoords) {
    setCoords(newCoords);

    map.flyTo({
      center: [+newCoords.longitude, +newCoords.latitude],
      essential: true,
    });
  }

  const [chosenChurch, setChurch] = useState({
    name: "",
    adress: "",
    url: "",
    tel: "",
  });

  map.on("moveend", () => {
    const currentCoords = map.getCenter();
    setCoords({ longitude: currentCoords.lng, latitude: currentCoords.lat });
  });

  useEffect(() => {
    async function createPopups() {
      const churches = await request(
        `https://apiv4.updateparishdata.org/Churchs/?lat=${coords.latitude}&long=${coords.longitude}&pg=1`
      );
      const updatedChurches = updateChurches(churches);
      addLayer(map, `churches`, updatedChurches);

      map.on("click", `churches`, function (e) {
        setChurch(JSON.parse(e.features[0].properties.info));
      });
    }

    if (!loading) {
      createPopups();
    }
  }, [coords]);

  return (
    <div className="App">
      <div id="infoContainer">
        <SearchCard search={updateCoords}></SearchCard>
        <ChurchCard
          church={chosenChurch}
          loading={loading}
          error={error}
        ></ChurchCard>
      </div>
    </div>
  );
}

export default App;
