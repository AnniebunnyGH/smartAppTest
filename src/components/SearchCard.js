import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core/";
import { useHttp } from "../hooks/fetch.hook";

export function SearchCard(props) {
  const [city, setCity] = useState();
  const { loading, request, error } = useHttp();
  const [errorMessage, setError] = useState(error);

  const changeHandler = (event) => {
    setCity(event.target.value);
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    try {
      const APIkey = `cc46f0ecad424b97b7dda578ec07ca9d `;
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&language=en&key=${APIkey}`;
      const res = await request(url);
      console.log(res);
      if (res.results[0]) {
        setError(null);
        const preCoord = res.results[0].geometry;
        console.log(preCoord);
        props.search({
          latitude: preCoord.lat,
          longitude: preCoord.lng,
        });
      } else {
        throw Error("input is not correct");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={searchHandler}>
          <TextField
            id="cityName"
            label="City name"
            type="text"
            onChange={changeHandler}
            required
          />
        </form>
        {errorMessage && (
          <Typography className="error" variant="subtitle1" align="center">
            {errorMessage}
          </Typography>
        )}

        {!loading ? (
          <Button onClick={searchHandler}>Search</Button>
        ) : (
          <CircularProgress />
        )}
      </CardContent>
    </Card>
  );
}
