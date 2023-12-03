import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeappBar from "../../Navbar/Home";
import Addreview from "../Review/add_review";
import Review from "../Review/review";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";

const BeweryDetail = () => {
  const bewery = useSelector(state => state.bewery.value);

  return (
    <Box>
      <HomeappBar />
      <Box
        sx={{
          display: { lg: "flex" },
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          padding: { lg: "100px", md: "50px", sm: "20px", xs: "10px" }
        }}
        // disableGutters
      >
        {/* <Stack
          sx={{ padding: "20px", width: { lg: "50%" }, textAlign: "center" }}
          spacing={1}
        >
          <Typography variant="h6">Brewery Name : {bewery.name}</Typography>
          <Typography variant="h6">
            Brewery Type : {bewery.brewery_type}
          </Typography>
          <Typography variant="h6">Street : {bewery.phone}</Typography>
          <Typography variant="h6">Address : {bewery.address}</Typography>
          <Typography variant="h6">City : {bewery.city}</Typography>
          <Typography variant="h6">State : {bewery.state}</Typography>
          <Typography variant="h6">
            Postal Code : {bewery.postal_code}
          </Typography>
          <Typography variant="h6">country : {bewery.country}</Typography>
          <Typography variant="h6">Phone : {bewery.phone}</Typography>
          <Typography variant="h6">
            Website Link : <Link to={bewery.website_url}>Click here</Link>
          </Typography>{" "}
        </Stack> */}
        <Card sx={{ maxWidth: 345, margin: { lg: "unset", xs: "auto" } }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://files.cults3d.com/uploaders/14889116/illustration-file/1cea3ef5-8df8-488e-a344-40363c5cc451/IMG_20210413_150343050.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {bewery.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                type : {bewery.brewery_type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone : {bewery.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Address : {bewery.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                City : {bewery.city}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                State : {bewery.state}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Postal Code : {bewery.postal_code}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Country : {bewery.country}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(bewery.website_url)}
            >
              View Website
            </Button>
          </CardActions>
        </Card>
        <Stack sx={{ width: { lg: "50%" } }}>
          <Addreview />
          <Review />
        </Stack>
      </Box>
    </Box>
  );
};

export default BeweryDetail;
