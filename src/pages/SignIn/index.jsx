/* eslint-disable no-unreachable */
import "./style.css";
import { getItem, setItem } from "../../utils/storage";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

const schema = object({
  email: string().required("Campo obrigatório."),
  password: string().min(6).required("Campo obrigatório."),
});

function Signin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const token = getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  });

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post("/signin", data);
      const { token } = response.data;

      setItem("token", token);

      navigate("/dashboard");
    } catch (error) {}
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
          py: 3,
          px: 2,
          gap: 10,
        }}
      >
        <Typography variant="h2" sx={{ color: "blue" }}>
          Faça seu login
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ marginTop: 5 }}
          component="form"
          onSubmit={onSubmit(handleSubmit)}
        >
          <Grid item md={12} lg={12}>
            <FormControl error={errors?.email ? true : false} fullWidth>
              <OutlinedInput
                type="text"
                {...register("email")}
                startAdornment={
                  <InputAdornment
                    position="start"
                    sx={{ color: "rgba(150, 165, 171, 0.5)" }}
                  >
                    <EmailIcon />
                  </InputAdornment>
                }
                placeholder="Email"
              />
              <FormHelperText>
                {errors?.email?.message?.toString() || " "}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item md={12} lg={12}>
            <FormControl error={errors?.password ? true : false} fullWidth>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                {...register("password")}
                startAdornment={
                  <InputAdornment
                    position="start"
                    sx={{ color: "rgba(150, 165, 171, 0.5)" }}
                  >
                    <LockIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      sx={{ color: "rgba(150, 165, 171, 0.5)" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Senha"
              />
              <FormHelperText>
                {errors?.password?.message?.toString() || " "}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}
          >
            <Grid item lg={4} md={12}>
              <Button variant="contained" fullWidth type="submit">
                Contained
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Signin;
