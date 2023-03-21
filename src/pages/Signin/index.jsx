/* eslint-disable no-unreachable */
import "./style.css";
import { getItem, setItem } from "../../utils/storage";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/signin", form);
      const { token } = response.data;

      setItem("token", token);

      navigate("/dashboard");
    } catch (error) {}
  };

  const handleChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "blue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "60%",
          width: { md: "90%", lg: "30%" },
          background: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "space",
          justifyContent: "space-between",
          py: 3,
          px: 2,
        }}
      >
        <Typography variant="h2" sx={{ color: "blue" }}>
          Faça seu login
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={12} lg={12}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={12} lg={12}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item lg={4} md={12}>
            <Button variant="contained" fullWidth>
              Contained
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Signin;
