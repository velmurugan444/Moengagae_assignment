import { Box, Divider, Rating, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import fire from "../../../Firebase/firebase";

const Review = props => {
  const [data, setdata] = useState([]);

  const [averagerating, setaveragerating] = useState(0);
  const bewery = useSelector(state => state.bewery.value);
  const user = useSelector(state => state.user.value);

  useEffect(() => {
    fire
      .firestore()
      .collection("reviews")
      .where("brewery_id", "==", bewery.id)
      .get()
      .then(snapshot => {
        if (snapshot.docs.length == 0) {
          return;
        } else {
          var five = 0;
          var four = 0;
          var three = 0;
          var two = 0;
          var one = 0;
          snapshot.forEach(ele => {
            var reviewData = { id: ele.id, data: ele.data() };
            if (reviewData.data.rating == 5) {
              five += 1;
            } else if (reviewData.data.rating == 4) {
              four += 1;
            } else if (reviewData.data.rating == 3) {
              three += 1;
            } else if (reviewData.data.rating == 2) {
              two += 1;
            } else if (reviewData.data.rating == 1) {
              one += 1;
            } else {
              return 0;
            }
            setdata(arr => [...arr, reviewData]);
          });
          console.log("five : " + five);
          var avgrating = 5 * five + 4 * four + 3 * three + 2 * two + 1 * one;
          setaveragerating(avgrating / snapshot.docs.length);
        }
      })
      .catch(err => {
        alert(err);
      });
  }, []);
  return (
    <Stack spacing={5}>
      <Stack spacing={1}>
        <Rating
          name="read-only"
          value={averagerating}
          size="large"
          readOnly
          sx={{ float: "left" }}
        />
        <Typography sx={{ textAlign: "left", fontWeight: "bold" }} variant="h6">
          Average rating : {averagerating}
        </Typography>
        <Divider />
      </Stack>
      <Typography variant="h6" sx={{ textAlign: "left", fontWeight: "bold" }}>
        User Reviews :
      </Typography>
      {data.length == 0
        ? <Box>
            <Typography variant="h6">No reviews yet !</Typography>
            <Divider />
          </Box>
        : data.map(e => {
            return (
              <Box mt={2} sx={{ maxWidth: { lg: "50%" } }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar src="/broken-image.jpg" />
                  <Typography variant="h6" mt={1} fontWeight={600}>
                    {e.data.name}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    {e.data.dateandtime}
                  </Typography>
                </Stack>
                <Stack direction="column" mt={1}>
                  <Rating
                    name="read-only"
                    value={e.data.rating}
                    size="large"
                    readOnly
                  />
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="body2"
                      mt={1}
                      sx={{ textAlign: "left" }}
                    >
                      {e.data.review}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider variant="middle" sx={{ marginY: "1.5rem" }} />
              </Box>
            );
          })}
    </Stack>
  );
};

export default Review;
