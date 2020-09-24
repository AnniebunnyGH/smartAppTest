import { useCallback, useEffect, useState } from "react";

export const useCoords = () => {
  const [coords, setCoords] = useState({
    longitude: "-73.9302941747",
    latitude: "40.737360644",
  });

  const getCoordsFromAPI = useCallback((newCoords) => {
    console.log(newCoords);
    setCoords(newCoords);
    console.log(coords);
  }, []);

  return { coords, getCoordsFromAPI };
};
