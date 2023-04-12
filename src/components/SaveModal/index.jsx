import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
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

export default function BasicModal({ open, setOpen, mes }) {
  const token = getItem("token");
  const [savedMesValue, setSavedMesValue] = useState();
  const [savedMesId, setSavedMesId] = useState();
  const [form, setForm] = useState({
    value: savedMesValue,
    month: mes,
  });
  const [type, setType] = useState("");

  useEffect(() => {
    listSaved();
    handleTypeForm();
    setForm({ ...form, value: savedMesValue });
  }, [open]);

  const handleClose = () => setOpen(false);

  const handleChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const listSaved = async () => {
    try {
      const response = await axios.get("/guardados", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const saved = response.data.filter((item) => {
        return item.month === mes;
      });
      if (saved.length === 0) {
        setSavedMesValue("");
      } else {
        setSavedMesValue(saved[0].value);
        setSavedMesId(saved[0].id);
      }
    } catch (error) {}
  };

  const handleTypeForm = () => {
    if (savedMesValue) {
      setType("editar");
    } else {
      setType("cadastrar");
    }
  };

  const handleSubmit = async () => {
    if (type === "cadastrar") {
      try {
        await axios.post("/guardados", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else if (type === "editar") {
      try {
        await axios.put(`/guardados/${savedMesId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
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
            Quanto você deseja guardar em {mes}?{savedMesId}
          </Typography>
          <TextField
            sx={{ marginTop: "30px", background: "#5ffb69" }}
            type="number"
            name="value"
            value={form.value}
            onChange={handleChangeInput}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            onClick={handleSubmit}
          >
            Guardar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
