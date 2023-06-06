import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TabsComponent from "../TabsComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 400, xs: 350 },
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function BasicModal({
  open,
  setOpen,
  listBillings,
  action,
  registroId,
  registro,
  setRegistro,
}) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
        <Box sx={style}>
          <TabsComponent
            listBillings={listBillings}
            handleClose={handleClose}
            action={action}
            registroId={registroId}
            registro={registro}
            setRegistro={setRegistro}
          />
        </Box>
      </Modal>
    </div>
  );
}
