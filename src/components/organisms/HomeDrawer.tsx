import { memo, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import SideMenu from "../molecules/SideMenu";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

const HomeDrawer: React.VFC<Props> = memo((props) => {
  const { window } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  const drawer = (
    <div>
      <SideMenu />
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
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
});
export default HomeDrawer;
