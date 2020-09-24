import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  CircularProgress,
} from "@material-ui/core/";

export function ChurchCard(props) {
  return (
    <Card>
      <CardContent>
        {props.error && (
          <Typography className="error" variant="subtitle1" align="center">
            {props.error}
          </Typography>
        )}
        {props.loading && <CircularProgress />}

        <Typography variant="h6" align="center">
          {props.church.name}
        </Typography>
        <Typography variant="body1" align="center">
          {props.church.adress}
        </Typography>
        <Typography variant="body1" align="center">
          <Link href={props.church.url}>{props.church.url}</Link>
        </Typography>
        <Typography variant="body1" align="center">
          <Link href={"tel:" + props.church.tel}>{props.church.tel}</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
