import * as React from "react";
import Box from "@mui/material/Box";

import {
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import { date, object, string, number } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { getItem, setItem } from "../../utils/storage";
import { useEffect, useState } from "react";
import axios from "../../services/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const schema = object({
  description: string().required("Campo obrigatório."),
  data: date()
    .nullable()
    .required("Campo obrigatório.")
    .typeError("Campo obrigatório."),
  value: number().required("Campo obrigatório."),
});

export default function RegisterForm() {
  const [value, setValue] = React.useState(0);
  const [type, setType] = React.useState("entrada");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    register,
    getValues,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSubmit = (date) => {
    const dataCorreta = format(date.data, "dd-MM-yyyy");
    console.log(getValues().value);
    /* try {
      await axios.post("/registros", data);
    } catch (error) {} */
    console.log({ ...date, data: dataCorreta });
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
