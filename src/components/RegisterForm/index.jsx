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
import { date, object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import axios from "../../services/axios";
import { getItem } from "../../utils/storage";
import { amountFormat } from "../../utils/amountMask";
import { useEffect } from "react";
import { notifyError, notifySucess } from "../../utils/toast";

const schema = object({
  description: string().required("Campo obrigatório."),
  data: date()
    .nullable()
    .required("Campo obrigatório.")
    .typeError("Campo obrigatório."),
  value: string().required("Campo obrigatório."),
});

function RegisterForm({ type, handleClose, listBillings, action, registro }) {
  const token = getItem("token");

  const {
    register,
    watch,
    setValue,
    getValues,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  watch("value");

  const useWatchField = (field) => {
    useEffect(() => {
      setValue(field, amountFormat(watch(field)));
    }, [watch(field)]);
  };
  useWatchField("value");

  const handleSubmit = async (date) => {
    const dataCorreta = format(date.data, "MM-dd-yyyy");
    console.log(date.data, dataCorreta)
    if (action === "register") {
      try {
        const response = await axios.post(
          "/registros",
          {
            ...date,
            value: parseFloat(date.value.replace(/\./g, "").replace(",", "")),
            data: dataCorreta,
            type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status >= 400) {
          notifyError(response.data.mensagem);
        }

        notifySucess("Registro adicionado com sucesso");
      } catch (error) {
        return notifyError(error.response.data.mensagem);
      }
    } else if (action === "edit") {
      try {
        const response = await axios.put(
          `/registro/${registro.id}`,
          {
            ...date,
            value: parseFloat(date.value.replace(/\./g, "").replace(",", "")),
            data: dataCorreta,
            type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status >= 400) {
          notifyError(response.data.mensagem);
        }
        notifySucess("Registro atualizado com sucesso");
      } catch (error) {
        return notifyError(error.response.data.mensagem);
      }
    }
    handleClose();
    listBillings();
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
              defaultValue={action === "edit" ? registro.description : ""}
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
              defaultValue={
                action === "edit"
                  ? format(new Date(registro.data), "yyyy-MM-dd")
                  : ""
              }
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
              fullWidth
              type="text"
              {...register(`value`)}
              startAdornment={
                <InputAdornment
                  position="start"
                  sx={{ color: "rgba(150, 165, 171, 0.5)" }}
                ></InputAdornment>
              }
              placeholder="Valor"
              label="Valor"
              error={errors?.value ? true : false}
              helperText={
                <Typography component="span" sx={{ fontSize: "1.0rem" }}>
                  {errors?.value?.message?.toString() || " "}
                </Typography>
              }
              defaultValue={action === "edit" ? registro.value : ""}
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
          <Grid item lg={6} md={12}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                background: "var(--button-color)",
                ":hover": { background: "var(--button-hover)" },
                color: "black",
                fontWeight: "bold",
              }}
            >
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegisterForm;
