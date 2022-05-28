import { memo, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import RightSideMenu from "../molecules/RightSideMenu";

const drawerWidth = 340;

interface Props {
  window?: () => Window;
}

const RightHomeDrawer: React.VFC<Props> = memo((props) => {
  const { window } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  const drawer = (
    <div>
      <RightSideMenu />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        anchor="right"
      >
        {drawer}
      </Drawer>
      <Drawer
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        {drawer}
      </Drawer>
    </Box>
  );
});
export default RightHomeDrawer;
