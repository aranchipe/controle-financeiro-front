import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box, TextField, CardMedia } from "@mui/material";
import { useEffect } from "react";
import cofreAberto from "../../assets/cofre_aberto.svg";

function TotalSafe({ openTotalSafe, setOpenTotalSafe, totalSaved }) {
  const handleClose = () => setOpenTotalSafe(false);
  /* useEffect(() => {
    listSaved();
  }, []); */
  return (
    <Box>
      <Modal
        open={openTotalSafe}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(145, 154, 150, 0.3)",
          backdropFilter: "blur(4px)",
          position: "fixed",
          top: "0",
          bottom: "0",
          right: "0",
          left: "0",
        }}
      >
        <Box
          sx={{
            width: { sm: "30vw", xs: "100vw" },
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <CardMedia component="img" src={cofreAberto} sx={{ width: "80vw" }} />
          <TextField
            sx={{
              background: "var(--button-hover)",
              borderRadius: "10px",
              position: "absolute",
              top: { lg: "50%", xs: "43%" },
              left: { lg: "60%", xs: "50%" },
              width: { lg: "none", xs: "35%" },
              "& input": {
                height: { lg: "5vh", xs: "3vh" },
                textAlign: "center",
                fontFamily: "font1",
                fontWeight: "bold",
                fontSize: { lg: "20px", xs: "16px" },
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
            }}
            value={
              Number.isInteger(totalSaved / 100)
                ? `R$ ${totalSaved / 100},00`
                : `R$ ${(totalSaved / 100).toFixed(2)}`
            }
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default TotalSafe;
