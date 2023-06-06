import Box from "@mui/material/Box";
import exit from "../../assets/exit.png";
import { CardMedia, Typography } from "@mui/material";
import { clear } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Logout({ setLogoutModal }) {
  const navigate = useNavigate();
  const handleQuit = () => {
    clear();
    navigate("/");
  };
  return (
    <Box
      sx={{
        position: "absolute",
        background: "var(--button-color)",
        height: { lg: "2.5vw", xs: "9vw" },
        top: { lg: "8vh", xs: "9vh" },
        right: { lg: "8vw", xs: "25vw" },
        borderRadius: "8px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        px: { lg: "0.5vw", xs: "2vw" },
      }}
    >
      <CardMedia
        component="img"
        src={exit}
        sx={{
          width: "30px",
          ":hover": { transform: "scale(1.1)" },
          cursor: "pointer",
        }}
        onClick={handleQuit}
      />
      <Typography
        sx={{ fontFamily: "font1", fontWeight: "bold", cursor: "pointer" }}
        onClick={handleQuit}
      >
        Logout
      </Typography>
    </Box>
  );
}
