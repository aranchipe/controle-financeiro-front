/* eslint-disable no-unreachable */
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
  Link,
  CardMedia,
  Paper,
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
import loginImage from "../../assets/login-image2.png";
import { notifyError } from "../../utils/toast";
import logoAzul from "../../assets/logo-azul.png";

const schema = object({
  email: string().required("Campo obrigatório."),
  password: string().required("Campo obrigatório."),
});

export function Signin() {
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
      if (response.status >= 400) {
        return notifyError("Email ou senha incorretos");
      }
      setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "65vw",
          height: "100%",
          display: { lg: "block", xs: "none" },
        }}
        component={Paper}
      >
        <CardMedia
          component="img"
          image={loginImage}
          sx={{
            height: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "60%",
          }}
        />
      </Box>
      <Box
        sx={{
          width: { lg: "35vw", xs: "100vw" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 1,
            px: 2,
            width: { lg: "25vw", xs: "80vw" },
          }}
        >
          <Grid
            container
            spacing={{ lg: 2, xs: 1 }}
            sx={{ marginTop: 1 }}
            component="form"
            onSubmit={onSubmit(handleSubmit)}
          >
            <CardMedia
              component="img"
              src={logoAzul}
              sx={{ display: { xs: "block", lg: "none" } }}
            />
            <Grid
              item
              lg={12}
              xs={12}
              sx={{
                mt: { xs: "30%", lg: "none" },
                mb: { xs: "20%", lg: "none" },
              }}
            >
              <Typography
                sx={{
                  color: "var(--cor-primaria)",
                  fontFamily: "font1",
                  textAlign: { xs: "center", lg: "start" },
                  fontSize: "50px",
                }}
              >
                Login
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormControl error={errors?.email ? true : false} fullWidth>
                <OutlinedInput
                  type="text"
                  {...register("email")}
                  sx={{ borderRadius: "50px" }}
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
                  sx={{ borderRadius: "50px" }}
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
            <Grid item lg={12} xs={12}>
              <Button
                sx={{
                  background: "var(--cor-primaria)",
                  color: "white",
                  fontFamily: "font1",
                  fontWeight: "bold",
                  ":hover": { background: "var(--button-hover)" },
                  borderRadius: "50px",
                  height: "6vh",
                }}
                variant="contained"
                fullWidth
                type="submit"
              >
                Entrar
              </Button>
            </Grid>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "5vh",
                textAlign: { lg: "none", xs: "center" },
              }}
            >
              <Typography>
                Ainda não possui uma conta? <br />
                <Link
                  sx={{
                    cursor: "pointer",
                    color: "var(--button-color)",
                    ":hover": { color: "var(--button-hover)" },
                  }}
                  onClick={() => navigate("/signup")}
                >
                  {" "}
                  Cadastre-se
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
