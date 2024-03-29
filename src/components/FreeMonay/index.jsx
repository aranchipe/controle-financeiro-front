import * as React from "react";
import Modal from "@mui/material/Modal";
import { Grid, Box, TextField, CardMedia } from "@mui/material";
import mao from "../../assets/mao.svg";
import porquinho from "../../assets/porquinho2.svg";
import carteiraAberta from "../../assets/carteira_aberta.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { getItem } from "../../utils/storage";
import { notifyError, notifySucess } from "../../utils/toast";
import axios from "../../services/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { amountFormat } from "../../utils/amountMask";

const schema = object({
  value: string().required("Campo obrigatório."),
});

function FreeMonay({
  openFreeMonay,
  setOpenFreeMonay,
  savedMes,
  typeModal,
  entrada,
  saida,
  dinheiroAtualMes,
  mes,
  responseGetGuardado,
  entradasMes,
  saidasMes,
  carregarDadosGuardado,
  responseGetDinheiroAtual
}) {
  const [loading, setLoading] = useState(false);

  const token = getItem("token");
  const [savedMesValue, setSavedMesValue] = useState();
  const [savedMesId, setSavedMesId] = useState();
  const [dinheiroAtualMesValue, setDinheiroAtualMesValue] = useState();

  const handleClose = () => { setOpenFreeMonay(false); }

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

  watch("value");

  const useWatchField = (field) => {
    useEffect(() => {
      setValue(field, amountFormat(watch(field)));
    }, [watch(field)]);
  };

  useWatchField("value");

  const listSaved = () => {
    if (responseGetGuardado) {
      const saved = responseGetGuardado.filter((item) => {
        return item.month === mes;
      });
      if (saved.length === 0) {
        setValue("value", 0);
        setSavedMesValue(0);
      } else {
        setValue("value", saved[0].value);
        setSavedMesValue(saved[0].value);
        setSavedMesId(saved[0].id);
      }
    }
  };

  const listDinheiroAtual = () => {
    if (responseGetDinheiroAtual) {
      const dinheiroAtual = responseGetDinheiroAtual.filter((item) => {
        return item.month === mes;
      });
      if (dinheiroAtual.length === 0) {
        setDinheiroAtualMesValue("");
      } else {
        setDinheiroAtualMesValue(dinheiroAtual[0].value);
      }
    }
  };

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
    setOpenFreeMonay(false);
    carregarDadosGuardado();
  };

  useEffect(() => {
    listSaved();
    entradasMes();
    saidasMes();
    listDinheiroAtual()
  }, [openFreeMonay]);

  let mesString = "";
  if (new Date().getMonth() === 0) {
    mesString = "janeiro";
  } else if (new Date().getMonth() === 1) {
    mesString = "fevereiro";
  } else if (new Date().getMonth() === 2) {
    mesString = "março";
  } else if (new Date().getMonth() === 3) {
    mesString = "abril";
  } else if (new Date().getMonth() === 4) {
    mesString = "maio";
  } else if (new Date().getMonth() === 5) {
    mesString = "junho";
  } else if (new Date().getMonth() === 6) {
    mesString = "julho";
  } else if (new Date().getMonth() === 7) {
    mesString = "agosto";
  } else if (new Date().getMonth() === 8) {
    mesString = "setembro";
  } else if (new Date().getMonth() === 9) {
    mesString = "outubro";
  } else if (new Date().getMonth() === 10) {
    mesString = "novembro";
  } else if (new Date().getMonth() === 11) {
    mesString = "dezembro";
  }
  return (
    <div>
      <Modal
        open={openFreeMonay}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
            background: "var(--cor-primaria)",
            width: { sm: "30vw", xs: "90vw" },
            height: { lg: "30vw", xs: "70vh" },
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              position: "absolute",
              top: "0",
              right: "0",
              width: "60%",
            }}
          >
            {typeModal === "livre" ? (
              ""
            ) : (
              <CardMedia component="img" src={mao} sx={{ width: "100%" }} />
            )}
          </Box>
          <Grid
            sx={
              typeModal === "guardado"
                ? {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                }
                : {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "50%",
                  gap: { xs: 3, lg: "none" },

                  justifyContent: { xs: "center", lg: "none" },
                }
            }
            container
            component="form"
            onSubmit={onSubmit(handleSubmitNewCompany)}
          >
            <Grid item md={12} lg={6}>
              <TextField
                sx={{
                  background: "#F6C38A",
                  borderRadius: "10px",
                  "& input": {
                    height: "5vh",
                    textAlign: "center",
                    fontFamily: "font1",
                    fontWeight: "bold",
                    fontSize: "20px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                }}
                value={
                  typeModal === "livre" ? "Dinheiro Livre" : "Dinheiro Guardado"
                }
              />
            </Grid>
            <Grid item md={10} lg={4}>
              <TextField
                {...register(`value`)}
                error={errors?.value ? true : false}
                sx={{
                  borderRadius: "10px",

                  "& input": {
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                    fontFamily: "font1",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  background: "var(--button-hover)",
                }}
                value={
                  typeModal === "livre"
                    ? Number.isInteger(
                      (mes === mesString ? (Number(dinheiroAtualMesValue) + entrada - saida) / 100 : (dinheiroAtualMesValue - savedMes + entrada - saida) / 100)
                    )
                      ? `R$ ${(mes === mesString ? (Number(dinheiroAtualMesValue) + entrada - saida) / 100 : (dinheiroAtualMesValue - savedMes + entrada - saida) / 100)
                      }.00`
                      : `R$ ${(mes === mesString ? (Number(dinheiroAtualMesValue) + entrada - saida) / 100 : (dinheiroAtualMesValue - savedMes + entrada - saida) / 100)
                      }`
                    : getValues().value
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={
                typeModal === "guardado"
                  ? {
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    mt: 2,
                  }
                  : {
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                  }
              }
            >
              {typeModal === "guardado" ? (
                <LoadingButton
                  type="submit"
                  fullWidth
                  loading={loading}
                  sx={{
                    background: "transparent",
                    border: "trasnparent",

                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <CardMedia
                    component="img"
                    src={porquinho}
                    sx={{
                      ":hover": { transform: "scale(1.05)" },
                      width: { lg: "60%", xs: "50%" },
                      position: "absolute",
                      top: 0,
                    }}
                  />
                </LoadingButton>
              ) : (
                <CardMedia
                  component="img"
                  sx={{ width: { lg: "150%", xs: "70%" } }}
                  src={carteiraAberta}
                  alt="carteira"
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default FreeMonay;
