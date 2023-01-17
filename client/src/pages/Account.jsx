import { Box, Paper, Typography } from "@mui/material";
import { useUser } from "../contexts/user";

function Account() {
  const { user } = useUser();

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
          padding: "30px 20px",
        }}
      >
        <Typography textAlign="center" variant="h4" paddingBottom="20px">
          Account
        </Typography>
        <Box display="flex" width="100%" gap="20px">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="end"
            alignItems="flex-end"
            width="100%"
            marginLeft="20px"
          >
            <Typography>username:</Typography>
            <Typography>email:</Typography>
            <Typography>password:</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            width="100%"
          >
            <Typography fontWeight="bold">{user.username}</Typography>
            <Typography fontWeight="bold">{user.email}</Typography>
            <Typography fontWeight="bold">{user.password}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Account;
