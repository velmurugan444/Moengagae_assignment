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
      <Container>
        <Stack sx={{ mt: 5 }} spacing={4}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            USER LOGIN
          </Typography>
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
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            OR
          </Typography>
        </Stack>
        <Link to="/signup">
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Create new account ?
          </Typography>
        </Link>
      </Container>
    </Box>
  );
};

export default Login;
