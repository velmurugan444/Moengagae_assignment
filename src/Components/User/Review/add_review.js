import React, { useState, useEffect } from "react";
import { Box, Divider, Rating, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import fire from "../../../Firebase/firebase";

const Addreview = props => {
  const [rating, setrating] = useState(0);
  const [review, setreview] = useState("");
  const bewery = useSelector(state => state.bewery.value);
  const user = useSelector(state => state.user.value);
  const [reviewstate, setreviewstate] = useState(true);

  useEffect(() => {
    fire
      .firestore()
      .collection("reviews")
      .where("brewery_id", "==", bewery.id)
      .where("email", "==", user.email)
      .get()
      .then(snapshot => {
        if (snapshot.docs.length == 0) {
          return;
        } else {
          snapshot.forEach(ele => {
            var data = ele.data();
            console.log(data);
            var id = ele.id;
            if (data.brewery_id == bewery.id) {
              setreviewstate(false);
            }
          });
        }
      })
      .catch(err => {
        alert(err);
      });
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    if (rating === "" || review === "") {
      alert("Please enter rating !");
    } else {
      fire
        .firestore()
        .collection("reviews")
        .add({
          name: user.name,
          email: user.email,
          dateandtime: new Date().toLocaleString().replace(",", ""),
          brewery_id: bewery.id,
          rating: rating,
          review: review
        })
        .then(() => {
          window.location.reload(true);
        });
    }
  };
  return (
    <Box>
      {reviewstate
        ? <Box mt={2} sx={{ maxWidth: { lg: "50%" } }}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar src="/broken-image.jpg" />
                <Typography variant="h6" mt={1} fontWeight={600}>
                  {user.name}
                </Typography>
              </Stack>
              <Stack direction="column" mt={1} spacing={2}>
                <Rating
                  name="read-only"
                  value={rating}
                  onChange={e => setrating(e.target.value)}
                  size="large"
                />
                <TextField
                  placeholder="Give Your Review"
                  value={review}
                  onChange={e => setreview(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
            <Divider variant="middle" sx={{ marginY: "1.5rem" }} />
          </Box>
        : ""}
    </Box>
  );
};

export default Addreview;
