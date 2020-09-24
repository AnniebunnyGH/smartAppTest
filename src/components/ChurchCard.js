import React from "react";
import { Card, CardContent, Typography, Link } from "@material-ui/core/";

export function ChurchCard(props) {
  return (
    <Card>
      <CardContent>
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
          <Link href={props.church.tel}>{props.church.tel}</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
