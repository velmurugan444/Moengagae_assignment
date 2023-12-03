import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBeweryData } from "../../../Reducers/bewery";

export default function BeweryCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Card sx={{ display: "flex", m: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5" sx={{ maxWidth: "170px" }}>
            {props.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            type : {props.brewery_type}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            city : {props.city}
          </Typography>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(
                getBeweryData({
                  id: props.id,
                  name: props.name,
                  brewery_type: props.brewery_type,
                  address: props.address,
                  city: props.city,
                  state_province: props.state_province,
                  postal_code: props.postal_code,
                  country: props.country,
                  phone: props.phone,
                  website_url: props.website_url,
                  state: props.state,
                  street: props.street
                })
              );
              navigate("/bewerydetail");
            }}
          >
            View Details
          </Button>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://files.cults3d.com/uploaders/14889116/illustration-file/1cea3ef5-8df8-488e-a344-40363c5cc451/IMG_20210413_150343050.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}
