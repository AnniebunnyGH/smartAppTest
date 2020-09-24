import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { SearchCard } from "./components/SearchCard";
import { ChurchCard } from "./components/ChurchCard";
import { updateChurchesList } from "./services/updateChurhes";
import updateMapSource from "./services/updatMapSource";
import addLayer from "./services/mapAddSource";
import { useHttp } from "./hooks/fetch.hook";
import { filterUniqCherches } from "./services/filterUniqChurches";
import { map } from "./services/initMap";

function App() {
  const { request, error } = useHttp();
  const [isLoading, setLoading] = useState(false);
  const [isMapSourceInited, setSourceInited] = useState(false);
  const [churches, setChurches] = useState([]);
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

  useEffect(() => {
    map.on("moveend", () => {
      const currentCoords = map.getCenter();
      setCoords({ longitude: currentCoords.lng, latitude: currentCoords.lat });
    });
    map.on("click", "places", function (e) {
      const res = JSON.parse(e.features[0].properties.info);
      setChurch(res);
    });
  }, []);

  useEffect(() => {
    async function createPopups() {
      setLoading(true);
      const url = `https://apiv4.updateparishdata.org/Churchs/?lat=${coords.latitude}&long=${coords.longitude}&pg=1`;
      const res = await request(url);

      const newChurchesList = filterUniqCherches(churches, res);
      setChurches(newChurchesList);
      const updatedChurches = updateChurchesList(newChurchesList);

      if (isMapSourceInited && newChurchesList.length !== churches.length) {
        updateMapSource(updatedChurches);
      } else if (!isMapSourceInited) {
        addLayer(updatedChurches);
        setSourceInited(true);
      }
      setLoading(false);
    }

    if (!isLoading) {
      createPopups();
    }
  }, [coords]);

  return (
    <div className="App">
      <div id="infoContainer">
        <SearchCard search={updateCoords}></SearchCard>
        <ChurchCard
          church={chosenChurch}
          loading={isLoading}
          error={error}
        ></ChurchCard>
      </div>
    </div>
  );
}

export default App;
