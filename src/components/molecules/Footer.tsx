import { memo } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Footer = memo(() => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <AppBar position="static" sx={{ background: "#000" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            copyright React SNS
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
});
export default Footer;
