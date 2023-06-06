import Box from "@mui/material/Box";
import { CardMedia, Typography } from "@mui/material";
import { clear } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useState } from "react";
import Logout from "../Logout";

export default function Header({ userName, userEmail }) {
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <Box sx={{ marginBottom: { lg: "4vh", xs: "10vh" } }}>
      <Box
        sx={{
          background: "var(--cor-primaria)",
          height: "10vh",
          width: "100vw",
          position: "fixed",
          top: "0",
          left: "0",
          display: "flex",
          justifyContent: "space-between",
          px: "3vw",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CardMedia
            component="img"
            src={logo}
            sx={{ width: { lg: "200px", sm: "200px", xs: "150px" } }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5vw",
            position: "relative",
          }}
        >
          <PersonPinIcon
            sx={{
              color: "var(--perfil)",
              width: "40px",
              cursor: "pointer",
              ":hover": { transform: "scale(1.1)" },
            }}
            fontSize="large"
            onClick={() => setLogoutModal(!logoutModal)}
          />
          <Box>
            <Typography
              sx={{
                fontFamily: "font1",
                fontWeight: "bold",
                color: "white",
                fontSize: { lg: "16px", sm: "14px", xs: "14px" },
              }}
            >
              {userName.toUpperCase()}
            </Typography>
            <Typography
              sx={{
                fontFamily: "font1",
                color: "var(--perfil)",
                fontSize: { lg: "16px", sm: "14px", xs: "14px" },
              }}
            >
              {userEmail}
            </Typography>
          </Box>
          {logoutModal && <Logout setLogoutModal={setLogoutModal} />}
        </Box>
      </Box>
    </Box>
  );
}
