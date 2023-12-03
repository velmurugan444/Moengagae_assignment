import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserData } from "../../../Reducers/user";
import HomeappBar from "../../Navbar/Home";
import fire from "../../../Firebase/firebase";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("please enter email and password");
    } else {
      fire
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .where("password", "==", password)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length == 0) {
            alert("user not found");
          } else {
            snapshot.forEach(ele => {
              var data = ele.data();
              var id = ele.id;
              console.log(data);

              dispatch(
                getUserData({
                  id: id,
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  address: data.address,
                  mobile: data.mobile
                })
              );
              navigate("/home");
            });
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  };
  return (
    <Box>
      <HomeappBar />

      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "15px",
          mt: 10,
          background: "aliceblue",
          padding: "55px"
        }}
      >
        <Box
          component="img"
          sx={{
            width: { lg: "40%", md: "40%", sm: "40%", xs: "0%" },
            borderRadius: "10px",
            display: { lg: "block", md: "block", sm: "block", xs: "none" }
          }}
          src="https://brooklynbrewery.com/wp-content/uploads/2019/08/BrooklynBrewery_Bar_Products_592_US_Lager.jpg"
        />
        <Stack
          sx={{ mt: 5, width: { lg: "50%", md: "50%", sm: "50%", xs: "100%" } }}
          spacing={4}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            USER LOGIN
          </Typography>
          <TextField
            fullWidth
            label="Email"
            size="small"
            id="fullWidth"
            value={email}
            onChange={e => setemail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            id="fullWidth"
            size="small"
            value={password}
            onChange={e => setpassword(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
          <Box>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              OR
            </Typography>
            <Link to="/signup">
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Create new account ?
              </Typography>
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
