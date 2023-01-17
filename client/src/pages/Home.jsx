import { useEffect } from "react";

import { Box, Container, Grid, Typography } from "@mui/material";
// import { ParallaxBanner } from "react-scroll-parallax";

function Home() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ p: "1rem 0" }}>
        <Container>
          <Grid container>
            <Grid item sm={12} md={7}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <img
                  src="assets/web-img/logo.png"
                  alt="logo"
                  style={{ width: "80%" }}
                />
              </Box>
            </Grid>
            <Grid item sm={12} md={5} sx={{ textAlign: "center" }}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                height="100%"
              >
                <Typography variant="h3">
                  From our oven to your door.
                </Typography>
                <Typography>
                  In Cookie Co., our goods are not simply baked but are crafted
                  to fit your taste. We take pride in creating freshly baked
                  goods that are packed with lots of love! This means that in
                  every bite you take, you are one step closer to satisfying
                  your cravings.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
