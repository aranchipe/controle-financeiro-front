import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { getItem } from "../../utils/storage";
import axios from "../../services/axios";
import Modal from "@mui/material/Modal";
import { notifyError, notifySucess } from "../../utils/toast";

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

export default function DinheiroAtualModal({ open, setOpen, mes }) {
  const [loading, setLoading] = useState(false);

  const token = getItem("token");
  const [dinheiroAtualMesValue, setDinheiroAtualMesValue] = useState();
  const [dinheiroAtualMesId, setDinheiroAtualMesId] = useState();
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
    listDinheiroAtual();
  }, [open]);

  watch("value");

  const useWatchField = (field) => {
    useEffect(() => {
      setValue(field, amountFormat(watch(field)));
    }, [watch(field)]);
  };

  useWatchField("value");

  const handleSubmitNewCompany = async (dados) => {
    setLoading(true);
    if (dinheiroAtualMesValue) {
      try {
        const response = await axios.put(
          `/dinheiroAtual/${dinheiroAtualMesId}`,
          {
            month: mes,
            value:
              parseFloat(dados.value.replace(",", "").replace(".", "")) == 0
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

        notifySucess("Dinheiro atual atualizado com sucesso");
      } catch (error) {
        return notifyError(error.response.data.mensagem);
      }
    } else {
      try {
        const response = await axios.post(
          "/dinheiroAtual",
          {
            month: mes,
            value:
              parseFloat(dados.value.replace(",", "").replace(".", "")) == 0
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
        notifySucess("Dinheiro atual cadastrado com sucesso");
      } catch (error) {
        return notifyError(error.response.data.mensagem);
      }
    }
    setLoading(false);
    setOpen(false);
  };

  const listDinheiroAtual = async () => {
    try {
      const response = await axios.get("/dinheiroAtual", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dinheiroAtual = response.data.filter((item) => {
        return item.month === mes;
      });
      if (dinheiroAtual.length === 0) {
        setValue("");
        setDinheiroAtualMesValue("");
      } else {
        setValue("value", dinheiroAtual[0].value);
        setDinheiroAtualMesValue(dinheiroAtual[0].value);
        setDinheiroAtualMesId(dinheiroAtual[0].id);
      }
    } catch (error) {}
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
                fontFamily: " font1",
                fontWeight: "bold",
                color: "var(--cor-primaria)",
              }}
            >
              Quanto você tem em {mes}?
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
                {dinheiroAtualMesValue ? "Atualizar" : "Guardar"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
