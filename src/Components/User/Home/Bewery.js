import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import HomeappBar from "../../Navbar/Home";
import axios from "axios";
import { List_BREWERIES } from "../../../config";
import Bewerycard from "./BeweryCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";

const Bewerylist = () => {
  const [data, setdata] = useState([]);
  const [searchUrl, setsearchUrl] = useState(List_BREWERIES);
  const [searchParam, setsearchParam] = useState("");
  const [searchKey, setsearchKey] = useState("");
  const [bool, setbool] = useState(true);
  const [page, setpage] = useState(1);
  function getData() {
    if (searchParam == "" || searchKey == "") {
      setsearchUrl(List_BREWERIES);
      axios
        .get(searchUrl + "?page=" + page + "&per_page=" + 6)
        .then(res => {
          console.log(res.data);
          setdata(res.data);
        })
        .catch(err => alert(err));
    } else {
      axios
        .get(searchUrl)
        .then(res => {
          setdata(res.data);
        })
        .catch(err => alert(err));
    }
  }
  useEffect(
    () => {
      getData();
    },
    [searchUrl, page]
  );
  const searchFunction = e => {
    e.preventDefault();
    if (searchParam == "" || searchKey == "") {
      getData();
      setbool(true);
    } else {
      setbool(false);
      setsearchUrl(List_BREWERIES + "?" + searchParam + "=" + searchKey);
    }
  };
  return (
    <Box>
      <HomeappBar />
      <br />
      <br />
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        BREWERIES LIST
      </Typography>
      <br />
      <br />
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
          alignItems: "baseline",
          pb: 3
        }}
      >
        <FormControl sx={{ m: 1, width: "60%" }} size="small">
          <InputLabel id="demo-select-small-label">Search By</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={searchParam}
            label="Sort"
            onChange={e => setsearchParam(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="by_city">By City</MenuItem>
            <MenuItem value="by_name">By Name</MenuItem>
            <MenuItem value="by_type">By Type</MenuItem>
          </Select>
        </FormControl>
        <TextField
          size="small"
          placeholder="Enter Value"
          value={searchKey}
          onChange={e => setsearchKey(e.target.value)}
        />
        <Button variant="contained" onClick={searchFunction}>
          Search
        </Button>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: { lg: "flex-start", md: "center", sm: "center" },
          flexWrap: "wrap"
        }}
      >
        {data.length == 0
          ? <Box sx={{ width: "fit-content", margin: "auto" }}>
              <Typography variant="h4">No Results Found !</Typography>
            </Box>
          : data.map(e => {
              return (
                <Bewerycard
                  id={e.id}
                  name={e.name}
                  brewery_type={e.brewery_type}
                  address={e.address_1}
                  city={e.city}
                  state_province={e.state_province}
                  postal_code={e.postal_code}
                  country={e.country}
                  phone={e.phone}
                  website_url={e.website_url}
                  state={e.state}
                  street={e.street}
                />
              );
            })}
      </Container>
      <br />
      {searchKey == "" && searchKey == "" && bool == true
        ? <Pagination
            count={10}
            sx={{ width: "fit-content", margin: "auto" }}
            variant="outlined"
            color="primary"
            value={page}
            onChange={e => setpage(e.target.value)}
            onClick={() => {
              setpage(page + 1);
            }}
          />
        : ""}
      <br />
      <br />
    </Box>
  );
};

export default Bewerylist;
