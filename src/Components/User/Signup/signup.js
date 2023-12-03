import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeappBar from "../../Navbar/Home";
import fire from "../../../Firebase/firebase";

const Signup = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [mobile, setmobile] = useState("");
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      address === "" ||
      mobile === ""
    ) {
      alert("please fill all fields");
    } else {
      fire.auth().createUserWithEmailAndPassword(email, password).then(() => {
        fire
          .firestore()
          .collection("users")
          .add({
            name: username,
            email: email,
            password: password,
            address: address,
            mobile: mobile
          })
          .then(() => {
            alert("Account created successfully");
            navigate("/login");
          });
      });
    }
  };
  return (
    <Box>
      <HomeappBar />
      <Container>
        <Stack sx={{ mt: 5 }} spacing={4}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            CREATE ACCOUNT
          </Typography>

          <TextField
            fullWidth
            label="Username"
            id="fullWidth"
            value={username}
            onChange={e => setusername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            id="fullWidth"
            value={email}
            onChange={e => setemail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            id="fullWidth"
            value={password}
            onChange={e => setpassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Address"
            id="fullWidth"
            value={address}
            onChange={e => setaddress(e.target.value)}
          />
          <TextField
            fullWidth
            label="Mobile"
            id="fullWidth"
            value={mobile}
            onChange={e => setmobile(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Sign Up
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Signup;
