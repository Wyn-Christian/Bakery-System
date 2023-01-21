import {
  Box,
  Card,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

import { useUser } from "../contexts/user";

import SendIcon from "@mui/icons-material/Send";

function Register() {
  const { registerUser, checkUserExist } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repassword: "",
    },
    onSubmit: async (values) => {
      if (values.password !== values.repassword) {
        enqueueSnackbar("Password doesn't match!", { variant: "error" });
      } else if (await checkUserExist(values.email)) {
        enqueueSnackbar("User already exist!", {
          variant: "error",
        });
      } else {
        registerUser(values);
      }
    },
  });
  return (
    <Box
      sx={{
        minHeight: "80vh",
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
          Register here...
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
            required
            variant="standard"
            id="username"
            label="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <TextField
            required
            variant="standard"
            id="email"
            label="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <TextField
            required
            variant="standard"
            id="password"
            type="password"
            label="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <TextField
            required
            variant="standard"
            id="repassword"
            type="password"
            label="re-enter password"
            onChange={formik.handleChange}
            value={formik.values.repassword}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              padding: "10px 5px",
              margin: "20px 0 0 0",
              width: "50%",
              color: "#fff",
            }}
          >
            <Typography
              sx={{
                padding: "0 10px",
              }}
            >
              Register
            </Typography>
            <SendIcon />
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Register;
