import { memo } from "react";
import Box from "@mui/material/Box";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { IconButton } from "@mui/material";

interface Props {
  imageChange: (e: any) => void;
  userImg: any;
}

const ImageSettingField: React.VFC<Props> = memo(({ imageChange, userImg }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        height="110"
        width="110"
        style={{ borderRadius: 100 }}
        ref={userImg}
      />
      <IconButton
        component="label"
        sx={{
          position: "absolute",
          marginTop: 9,
          marginLeft: 9,
          background: "#fff",
          opacity: 0.5,
        }}
      >
        <CameraAltIcon />
        <input type="file" accept="image/*" hidden onChange={imageChange} />
      </IconButton>
    </Box>
  );
});
export default ImageSettingField;
