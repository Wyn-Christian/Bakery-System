import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";

import SendIcon from "@mui/icons-material/Send";
import { useSnackbar } from "notistack";

import { useUser } from "../contexts/user";

function Login() {
  const { enqueueSnackbar } = useSnackbar();

  const { loginUser } = useUser();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (!values.email || !values.password) {
        enqueueSnackbar(`Please input your email or password`, {
          variant: "warning",
          preventDuplicate: false,
        });
      }
      loginUser({ ...values });
    },
  });
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          width: "300px",
        }}
      >
        <Typography variant="h5" textAlign="center">
          Login here...
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            variant="standard"
            id="email"
            label="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <TextField
            variant="standard"
            id="password"
            type="password"
            label="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              margin: "20px 0 0 0",
              width: "40%",
              color: "#fff",
            }}
          >
            <Typography
              sx={{
                padding: "0 10px",
              }}
            >
              Login
            </Typography>
            <SendIcon />
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
