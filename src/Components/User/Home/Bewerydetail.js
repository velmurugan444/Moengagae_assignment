import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeappBar from "../../Navbar/Home";
import Addreview from "../Review/add_review";
import Review from "../Review/review";

const BeweryDetail = () => {
  const bewery = useSelector(state => state.bewery.value);

  return (
    <Box>
      <HomeappBar />
      <Box
        sx={{
          display: { lg: "flex" },
          alignItems: "baseline",
          justifyContent: "space-evenly",
          padding: { lg: "100px", md: "50px", sm: "20px", xs: "10px" }
        }}
        disableGutters
      >
        <Stack
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
        </Stack>
        <Stack sx={{ width: { lg: "50%" } }}>
          <Addreview />
          <Review />
        </Stack>
      </Box>
    </Box>
  );
};

export default BeweryDetail;
