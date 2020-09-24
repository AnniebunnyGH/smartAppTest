import React, { useEffect, useState } from "react";
import { Card, CardContent, TextField, Button } from "@material-ui/core/";
import { useCoords } from "../hooks/coords.hook";

export function SearchCard(props) {
  const [city, setCity] = useState();
  const [isInfo, setIsInfo] = useState(false);

  const changeHandler = (event) => {
    setCity(event.target.value);
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const APIkey = `cc46f0ecad424b97b7dda578ec07ca9d `;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&language=en&key=${APIkey}`;
    const res = await fetch(url).then((res) => res.json());
    console.log(res);
    if (res.results[0]) {
      const preCoord = res.results[0].geometry;
      console.log(preCoord);
      props.search({
        latitude: preCoord.lat,
        longitude: preCoord.lng,
      });
    }
  };

  return (
    <Card>
      <CardContent>
        <form>
          <TextField
            id="cityName"
            label="City name"
            type="text"
            onChange={changeHandler}
            required
          />
        </form>
        <Button onClick={searchHandler}>Search</Button>
      </CardContent>
    </Card>
  );
}
