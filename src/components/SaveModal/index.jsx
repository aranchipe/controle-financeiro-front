import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TabsComponent from "../TabsComponent";
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

export default function BasicModal({
  open,
  setOpen,
  mes,
}) {
  const token = getItem("token");
  const [savedMes, setSavedMes] = useState(2);
  const [form, setForm] = useState({
    value:  savedMes,
    month: mes,
  });
  const [type, setType] = useState("");
  
  useEffect(() => {
    listSaved()
    handleTypeForm();
    setForm({...form, 'value': savedMes}) 
  },[open]);


  const handleClose = () => setOpen(false);

  const handleChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
    console.log(form)
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
      if(saved.length === 0) {
        setSavedMes('');
      } else {
        setSavedMes(saved[0].value);

      }     
    } catch (error) {
      
    }
  };

  const handleTypeForm = () => {
    if (savedMes !== 0) {
      setType("editar");
    } else {
      setType("cadastrar");
    }
  };

  const handleSubmit = async () => {
    if(type === 'cadastrar') {
      try {
        const response = await axios.post('/guardados', form,  {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        console.log(error)
      }

    }
  }

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
            Quanto você deseja guardar em {mes}?{type}
          </Typography>
          <TextField
            sx={{ marginTop: "30px", background: "#5ffb69" }}
            type="number"
            name="value"
            value={form.value}
            onChange={handleChangeInput}
          />
          <Button variant="contained" fullWidth type="submit" onClick={handleSubmit}>
          Guardar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
