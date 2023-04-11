import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dinheiroLivre from "../../assets/dinheiro_livre.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
};

export default function FreeMonay({
  openFreeMonay,
  setOpenFreeMonay,
  savedMes,
}) {
  const handleClose = () => setOpenFreeMonay(false);

  return (
    <div>
      <Modal
        open={openFreeMonay}
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
        <Box sx={{ position: "relative" }}>
          <img
            src={dinheiroLivre}
            alt="dinheiro-livre"
            style={{ width: "30vw" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "26%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "cursive",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {savedMes}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
