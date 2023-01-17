import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        paddingTop: "20px",
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
      }}
    >
      <Container sx={{ pb: "30px" }}>
        <Grid container>
          <Grid item sm={12} md={8}>
            <Typography variant="h4" sx={{ m: "1.5rem 0 0.9rem 0" }}>
              From our oven to your door.
            </Typography>
            <Typography variant="h5" sx={{ m: "1rem 0 .6rem 0" }}>
              OUR COMMUNITY
            </Typography>
            <Typography variant="body1">Registration</Typography>
          </Grid>

          <Grid item sm={12} md={4}>
            <Typography variant="h5" sx={{ m: "1.5rem 0 0.9rem 0" }}>
              SEEK FAQS
            </Typography>
            <Typography variant="body1">About Cookie Co.</Typography>
            <Typography variant="body1">Most FAQs</Typography>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.dark,
          p: "14px 0 7px 0",
        }}
      >
        <Container>
          <Grid container alignItems="center">
            <Grid item xs={9}>
              <Typography>© 2023 Copyright</Typography>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "right" }}>
              <Button variant="text" sx={{ color: "#fff" }}>
                Customer Feedback
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;
