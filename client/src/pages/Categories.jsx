import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { useState } from "react";
import CardProduct from "../components/CardProduct";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useData } from "../contexts/data";
import { useEffect } from "react";

export default function Categories() {
  const theme = useTheme();
  const { products, categories } = useData();

  const [selectedCategory, setSelectedCategory] = useState();
  useEffect(() => {
    setSelectedCategory(() =>
      categories.length ? categories[0].id : undefined
    );
  }, [categories]);

  const handleCategory = (e, selected) => {
    if (selected !== null) {
      setSelectedCategory(selected);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      sx={{
        paddingTop: "8vh",
        minHeight: "80vh",
      }}
    >
      <Box sx={{ textAlign: "center", p: "30px 0 10px 0" }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          color={theme.palette.primary.main}
        >
          Categories
        </Typography>

        <ToggleButtonGroup
          value={selectedCategory}
          onChange={handleCategory}
          exclusive
        >
          {categories.length
            ? categories.map((c) => (
                <ToggleButton key={c.id} value={c.id}>
                  {c.name}
                </ToggleButton>
              ))
            : null}
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ flexGrow: 1, m: "30px 0 40px 0" }}>
        <Grid container spacing={2}>
          {products.length
            ? products
                .filter((p) => p.category_id.id === selectedCategory)
                .map((p) => <CardProduct key={p.id} {...p} />)
            : null}
        </Grid>
      </Box>
    </Container>
  );
}
