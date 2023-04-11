import * as React from "react";
import Box from "@mui/material/Box";
import {
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  InputLabel,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { date, object, string, number } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import axios from "../../services/axios";
import { getItem } from "../../utils/storage";

const schema = object({
  description: string().required("Campo obrigatório."),
  data: date()
    .nullable()
    .required("Campo obrigatório.")
    .typeError("Campo obrigatório."),
  value: number().required("Campo obrigatório."),
});

export default function RegisterForm({ type, handleClose }) {
  const token = getItem("token");
  const {
    register,
    getValues,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSubmit = async (date) => {
    const dataCorreta = format(date.data, "dd-MM-yyyy");
    try {
      await axios.post(
        "/registros",
        { ...date, data: dataCorreta, type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: 5 }}
        component="form"
        onSubmit={onSubmit(handleSubmit)}
      >
        <Grid item md={12} lg={12}>
          <FormControl error={errors?.description ? true : false} fullWidth>
            <InputLabel>Descrição</InputLabel>
            <OutlinedInput
              type="text"
              {...register("description")}
              startAdornment={
                <InputAdornment
                  position="start"
                  sx={{ color: "rgba(150, 165, 171, 0.5)" }}
                ></InputAdornment>
              }
              placeholder="Descrição"
              label="Descrição"
            />
            <FormHelperText>
              {errors?.description?.message?.toString() || " "}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item md={12} lg={12}>
          <FormControl error={errors?.data ? true : false} fullWidth>
            <InputLabel>Data</InputLabel>
            <OutlinedInput
              type="date"
              {...register("data")}
              startAdornment={
                <InputAdornment
                  position="start"
                  sx={{ color: "rgba(150, 165, 171, 0.5)" }}
                ></InputAdornment>
              }
              endAdornment={<InputAdornment position="end"></InputAdornment>}
              placeholder="Data"
              label="Data"
            />
            <FormHelperText>
              {errors?.data?.message?.toString() || " "}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item md={12} lg={12}>
          <FormControl error={errors?.value ? true : false} fullWidth>
            <InputLabel>Valor</InputLabel>
            <OutlinedInput
              type="number"
              {...register("value")}
              startAdornment={
                <InputAdornment
                  position="start"
                  sx={{ color: "rgba(150, 165, 171, 0.5)" }}
                ></InputAdornment>
              }
              endAdornment={<InputAdornment position="end"></InputAdornment>}
              placeholder="Valor"
              label="Valor"
            />
            <FormHelperText>
              {errors?.value?.message?.toString() || " "}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Grid item lg={4} md={12}>
            <Button variant="contained" fullWidth type="submit">
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}