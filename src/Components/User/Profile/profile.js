import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import fire from "../../../Firebase/firebase";
import HomeappBar from "../../Navbar/Home";
import { getUserData } from "../../../Reducers/user";

const Profile = () => {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const [username, setusername] = useState(user.name);
  const [password, setpassword] = useState(user.password);
  const [address, setaddress] = useState(user.address);
  const [mobile, setmobile] = useState(user.mobile);
  const navigate = useNavigate();

  return (
    <Box>
      <HomeappBar />
      <Container>
        <Stack sx={{ mt: 5 }} spacing={4}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            YOUR PROFILE
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
          <Button
            variant="contained"
            onClick={() => {
              fire
                .firestore()
                .collection("users")
                .doc(user.id)
                .update({
                  name: username,
                  password: password,
                  address: address,
                  mobile: mobile
                })
                .then(res => {
                  dispatch(
                    getUserData({
                      id: user.id,
                      name: username,
                      email: user.email,
                      password: password,
                      address: address,
                      mobile: mobile
                    })
                  );
                  alert("Profile Updated Successfully !");
                  navigate("/home");
                });
            }}
          >
            Update
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Profile;
