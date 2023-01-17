import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import CardProduct from "../components/CardProduct";

import { useData } from "../contexts/data";
import { useEffect } from "react";

export default function AllProducts() {
  const theme = useTheme();
  const { products } = useData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container sx={{ paddingTop: "8vh", minHeight: "80vh" }}>
      <Box sx={{ textAlign: "center", p: "30px 0 10px 0" }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          color={theme.palette.primary.main}
        >
          All Products
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, m: "30px 0 40px 0" }}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <CardProduct {...product} key={product.id} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
