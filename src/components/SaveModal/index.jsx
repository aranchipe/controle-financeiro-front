import Modal from "@mui/material/Modal";

import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { getItem } from "../../utils/storage";
import { notifyError, notifySucess } from "../../utils/toast";
import axios from "../../services/axios";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { amountFormat } from "../../utils/amountMask";

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
const schema = object({
  value: string().required("Campo obrigatório."),
});

export default function SaveModal({ open, setOpen, mes }) {
  const [loading, setLoading] = useState(false);

  const token = getItem("token");
  const [savedMesValue, setSavedMesValue] = useState();
  const [savedMesId, setSavedMesId] = useState();
  const handleClose = () => setOpen(false);

  const {
    register,
    watch,
    setValue,
    getValues,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    listSaved();
  }, [open]);

  watch("value");

  const useWatchField = (field) => {
    useEffect(() => {
      setValue(field, amountFormat(watch(field)));
    }, [watch(field)]);
  };

  useWatchField("value");

  const handleSubmitNewCompany = async (dados) => {
    setLoading(true); //Ativar o carregamento
    if (savedMesValue) {
      try {
        const response = await axios.put(
          `/guardados/${savedMesId}`,
          {
            month: mes,
            value:
              parseFloat(dados.value.replace(",", "").replace(".", "")) === 0
                ? "0"
                : parseFloat(dados.value.replace(",", "").replace(".", "")),
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
        notifySucess("Dinheiro guardado com sucesso");
      } catch (error) {
        return notifyError(error.response.data.mensagem);
      }
    } else {
      try {
        const response = await axios.post(
          "/guardados",
          {
            month: mes,
            value:
              parseFloat(dados.value.replace(",", "").replace(".", "")) === 0
                ? "0"
                : parseFloat(dados.value.replace(",", "").replace(".", "")),
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

        notifySucess("Dinheiro guardado com sucesso");
      } catch (error) {
        return notifyError(error.response.data.mensagem);
      }
    }
    setLoading(false); //Desativa o carregamento após a requisição
    setOpen(false);
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
        setValue(0);
        setSavedMesValue(0);
      } else {
        setValue("value", saved[0].value);
        setSavedMesValue(saved[0].value);
        setSavedMesId(saved[0].id);
      }
    } catch (error) {}
  };

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
        <Box
          sx={{
            ...style,
            gap: "20px",
            py: 2,
            px: 2,
            backgroundColor: "#FFFCFC",
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
          }}
        >
          <Grid
            container
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 1,
            }}
            onSubmit={onSubmit(handleSubmitNewCompany)}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "font1",
                color: "var(--cor-primaria)",
              }}
            >
              Quanto você quer guardar em {mes}?
            </Typography>
            <TextField
              fullWidth
              type="text"
              variant="outlined"
              size="small"
              {...register(`value`)}
              error={errors?.value ? true : false}
              helperText={
                <Typography component="span" sx={{ fontSize: "1.0rem" }}>
                  {errors?.value?.message?.toString() || " "}
                </Typography>
              }
              value={getValues().value}
            />

            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                mt: 2,
              }}
            >
              <LoadingButton
                type="submit"
                variant="contained"
                fullWidth
                loading={loading}
                sx={{
                  background: "var(--cor-primaria)",
                  ":hover": { background: "var(--button-hover)" },
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {savedMesValue ? "Atualizar" : "Guardar"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
