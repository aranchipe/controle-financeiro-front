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
//Validação dos campos do input, não precisa mais colocar as validações com o if que faziamos no curso
const schema = object({
  value: string().required("Campo obrigatório."),
});

export const DinheiroAtualModal = ({ open, setOpen, mes }) => {
  //Usado para mostrar no botão uma animação de carregamento enquanto é feita a requisição
  const [loading, setLoading] = useState(false);

  //Autoexplicativo esse
  const token = getItem("token");
  const [dinheiroAtualMesValue, setDinheiroAtualMesValue] = useState();
  const [dinheiroAtualMesId, setDinheiroAtualMesId] = useState();
  const handleClose = () => setOpen(false);

  const {
    register, //Registra o dado
    watch, //Assiste o dado
    setValue, //Seta um novo valor para o dado
    getValues, //Obtém o dado
    handleSubmit: onSubmit, //Autoexplicativo
    formState: { errors }, //Pega o erro gerado pelo schema
  } = useForm({
    resolver: yupResolver(schema), //Linka o yup com o schema
  });

  useEffect(() => {
    listDinheiroAtual();
  }, [open]);

  //Estou assistindo o dado "userSalary"
  watch("value");

  //Função para transforma em máscara de dinheiro
  const useWatchField = (field) => {
    useEffect(() => {
      setValue(field, amountFormat(watch(field)));
    }, [watch(field)]);
  };

  //Executando a função e passando o campo que eu quero que execute essa função
  //Obs: Como está sempre assintindo por causa do "watch('userSalary')" sempre vai ficar executando essa função enquanto tiver tendo modificação no input
  useWatchField("value");

  //Autoexplicativo essa função
  //Como linkamos lá em cima a função no useform, os dados são automaticamente gerado no primeiro parametro
  const handleSubmitNewCompany = async (dados) => {
    setLoading(true); //Ativar o carregamento
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
    setLoading(false); //Desativa o carregamento após a requisição
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
            component="form" // É preciso passar o "component="form"" para saber que se trata de um
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 1,
            }}
            onSubmit={onSubmit(handleSubmitNewCompany)} //Linkando o form com onsubmit do useform
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

            {/* Colocando o botão e controlando o tamanho da largura dele através do grid */}
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
              {/* Componente que já vem com ele embutido o loading e é só preciso passar a variavel que estamos setando na função do handlesubmit */}
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
};
