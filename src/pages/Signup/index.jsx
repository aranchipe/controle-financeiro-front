/* eslint-disable no-unreachable */
import { getItem } from "../../utils/storage";
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
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { object, string, ref } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import cadastroImage from "../../assets/cadastro-image.png";
import { notifyError, notifySucess } from "../../utils/toast";
import logoAzul from "../../assets/logo-azul.png";

const schema = object({
  email: string()
    .email("Insira um email válido")
    .required("Campo obrigatório."),
  name: string().required("Campo obrigatório."),
  password: string()
    .min(6, "A senha deve conter no mínimo 6 caracteres")
    .required("Campo obrigatório."),
  password2: string()
    .required("Campo obrigatório.")
    .oneOf([ref("password"), null], "As senhas devem ser iguais."),
});

function Signup() {
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
      const response = await axios.post("/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (response.status >= 400) {
        notifyError(response.data.mensagem);
      }
      notifySucess("Cadastro realizado com sucesso");
      navigate("/signin");
    } catch (error) {
      notifyError(error.response.data.mensagem);
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
                mt: { xs: "10%", lg: "none" },
                mb: { xs: "5%", lg: "none" },
              }}
            >
              <Typography
                sx={{
                  color: "var(--cor-primaria)",
                  fontFamily: "font1",
                  textAlign: "start",
                  fontSize: { lg: "50px", xs: "40px" },
                  marginBottom: "2vh",
                }}
              >
                Cadastre-se
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormControl error={errors?.name ? true : false} fullWidth>
                <OutlinedInput
                  type="text"
                  {...register("name")}
                  sx={{ borderRadius: "50px" }}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      sx={{ color: "rgba(150, 165, 171, 0.5)" }}
                    >
                      <EmailIcon />
                    </InputAdornment>
                  }
                  placeholder="Nome"
                />
                <FormHelperText>
                  {errors?.name?.message?.toString() || " "}
                </FormHelperText>
              </FormControl>
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
            <Grid item xs={12} lg={12}>
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
            <Grid item md={12} lg={12}>
              <FormControl error={errors?.password2 ? true : false} fullWidth>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  {...register("password2")}
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
                  placeholder="Repita a senha"
                />
                <FormHelperText>
                  {errors?.password2?.message?.toString() || " "}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  background: "var(--cor-primaria)",
                  color: "white",
                  fontFamily: "font1",
                  fontWeight: "bold",
                  ":hover": { background: "var(--button-hover)" },
                  borderRadius: "50px",
                  height: "6vh",
                }}
              >
                Cadastrar
              </Button>
            </Grid>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "2vh",
              }}
            >
              <Typography sx={{ textAlign: "center" }}>
                Já possui uma conta? <br />
                <Link
                  sx={{
                    cursor: "pointer",
                    color: "var(--button-color)",
                    ":hover": { color: "var(--button-hover)" },
                  }}
                  onClick={() => navigate("/signin")}
                >
                  {" "}
                  Faça login
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Box>
      <CardMedia
        component="img"
        image={cadastroImage}
        sx={{
          width: "65vw",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "60%",
          display: { lg: "block", xs: "none" },
        }}
      />
    </Box>
  );
}

export default Signup;
