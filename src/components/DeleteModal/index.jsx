import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import axios from "../../services/axios";
import { getItem } from "../../utils/storage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
};

export default function DeleteModal({
  openDeleteModal,
  setOpenDeleteModal,
  registroId,
  listBillings,
}) {
  const token = getItem("token");

  const handleClose = () => setOpenDeleteModal(false);

  const handleSubmit = async (registroId) => {
    try {
      await axios.delete(`/registro/${registroId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {}
    setOpenDeleteModal(false);
    listBillings();
  };

  return (
    <div>
      <Modal
        open={openDeleteModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, gap: "20px", flexDirection: "column" }}>
          <Typography
            sx={{
              fontFamily: "cursive",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            Tem certeza que deseja excluir?
          </Typography>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item md={5} lg={5}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  background: "rgb(251, 83, 83)",
                  color: "white",
                  ":hover": { background: "red" },
                }}
                onClick={() => handleSubmit(registroId)}
              >
                Sim
              </Button>
            </Grid>
            <Grid item md={5} lg={5}>
              <Button
                variant="outlined"
                fullWidth
                type="submit"
                sx={{
                  color: "rgb(82, 82, 82)",
                  fontWeight: "bold",
                }}
                onClick={handleClose}
              >
                Não
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
