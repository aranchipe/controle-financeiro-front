import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "../../services/axios";
import { getItem, clear } from "../../utils/storage";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography, Grid, CardMedia } from "@mui/material";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { SaveModal } from "../SaveModal";
import porquinho from "../../assets/guardar.png";
import carteira from "../../assets/carteira.png";
import { FreeMonay } from "../FreeMonay";
import { DeleteModal } from "../DeleteModal";
import { RegisterModal } from "../RegisterModal";
import { useNavigate } from "react-router-dom";
import { DinheiroAtualModal } from "../DinheiroAtualModal";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--button-hover)",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function Card({ numberMes, registros, listBillings }) {
  const [saida, setSaida] = useState(0);
  const [entrada, setEntrada] = useState(0);
  const token = getItem("token");
  const [open, setOpen] = useState(false);
  const [openFreeMonay, setOpenFreeMonay] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openDinheiroAtualModal, setOpenDinheiroAtualModal] = useState(false);
  const handleOpenFreeMonay = () => setOpenFreeMonay(true);
  const [savedMes, setSavedMes] = useState(0);
  const [dinheiroAtualMes, setDinheiroAtualMes] = useState(0);
  const [registroId, setRegistroId] = useState();
  const [registro, setRegistro] = useState();
  const [typeModal, setTypeModal] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    saidasMes();
    entradasMes();
    listDinheiroAtual();
  });

  function compararRegistros(registroA, registroB) {
    if (registroA.type === "entrada" && registroB.type === "saida") {
      return -1;
    }
    if (registroA.type === "saida" && registroB.type === "entrada") {
      return 1;
    }
    return 0;
  }

  const registrosMes = registros.filter((item) => {
    return new Date(item.data).getMonth() === numberMes;
  });
  registrosMes.sort(compararRegistros);

  const saidasMes = () => {
    let somaSaidas = 0;
    const saidasMes = registrosMes.filter((item) => {
      return item.type === "saida";
    });
    for (let item of saidasMes) {
      somaSaidas = somaSaidas + Number(item.value);
    }
    setSaida(somaSaidas);
  };

  const entradasMes = () => {
    let somaEntradas = 0;
    const entradasMes = registrosMes.filter((item) => {
      return item.type === "entrada";
    });
    for (let item of entradasMes) {
      somaEntradas = somaEntradas + Number(item.value);
    }
    setEntrada(somaEntradas);
  };

  let mes = "";
  if (numberMes === 0) {
    mes = "janeiro";
  } else if (numberMes === 1) {
    mes = "fevereiro";
  } else if (numberMes === 2) {
    mes = "março";
  } else if (numberMes === 3) {
    mes = "abril";
  } else if (numberMes === 4) {
    mes = "maio";
  } else if (numberMes === 5) {
    mes = "junho";
  } else if (numberMes === 6) {
    mes = "julho";
  } else if (numberMes === 7) {
    mes = "agosto";
  } else if (numberMes === 8) {
    mes = "setembro";
  } else if (numberMes === 9) {
    mes = "outubro";
  } else if (numberMes === 10) {
    mes = "novembro";
  } else if (numberMes === 11) {
    mes = "dezembro";
  }

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
        setSavedMes(0);
      } else {
        setSavedMes(saved[0].value);
      }
    } catch (error) {
      clear();
      navigate("/");
    }
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
        setDinheiroAtualMes(0);
      } else {
        setDinheiroAtualMes(dinheiroAtual[0].value);
      }
    } catch (error) {
      clear();
      navigate("/");
    }
  };

  return (
    <Grid
      sx={{
        width: "100%",
        borderRadius: "8px",
        background: "white",
        boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Box
        sx={{
          height: "8vh",
          display: "flex",
          justifyContent: "center",
          background: "var(--cor-primaria)",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", fontFamily: "font1", color: "white" }}
        >
          {mes.toUpperCase()}
        </Typography>
      </Box>
      <TableContainer
        sx={{
          height: 357,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "2rem",
            border: "1px solid white",
            background: "var(--cor-primaria)",
          },
        }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ height: 50 }}>
              <StyledTableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "font1",
                  fontSize: { lg: "14px", xs: "10px" },
                }}
              >
                Descrição
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "font1",
                  fontSize: { lg: "14px", xs: "10px" },
                }}
                align="right"
              >
                Valor
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "font1",
                  fontSize: { lg: "14px", xs: "10px" },
                }}
                align="right"
              >
                Data
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "font1",
                  fontSize: { lg: "14px", xs: "10px" },
                }}
                align="right"
              >
                Tipo
              </StyledTableCell>
              <StyledTableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {registrosMes.map((item) => (
              <StyledTableRow sx={{ height: 100 }} key={item.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontFamily: "font1",
                  }}
                >
                  {item.description}
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  sx={{
                    fontFamily: "font1",
                    fontSize: { lg: "14px", xs: "10px" },
                  }}
                >
                  {Number.isInteger(item.value / 100)
                    ? `R$ ${item.value / 100}.00`
                    : `R$ ${item.value / 100}`}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {format(new Date(item.data), "dd-MM-yyyy")}
                </StyledTableCell>
                <StyledTableCell
                  sx={
                    item.type === "entrada"
                      ? { color: "var(--cor-secundaria)", fontWeight: "bold" }
                      : { color: "var(--saida)", fontWeight: "bold" }
                  }
                  align="right"
                >
                  {item.type}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      gap: "1vw",
                    }}
                  >
                    <EditIcon
                      sx={
                        item.type === "entrada"
                          ? {
                              color: "var(--cor-secundaria)",
                              cursor: "pointer",
                              ":hover": { transform: "scale(1.1)" },
                            }
                          : {
                              color: "var(--saida)",
                              cursor: "pointer",
                              ":hover": { transform: "scale(1.1)" },
                            }
                      }
                      onClick={() => {
                        setOpenRegisterModal(true);
                        setRegistro(item);
                      }}
                    />
                    <DeleteIcon
                      sx={
                        item.type === "entrada"
                          ? {
                              color: "var(--cor-secundaria)",
                              cursor: "pointer",
                              ":hover": { transform: "scale(1.1)" },
                            }
                          : {
                              color: "var(--saida)",
                              cursor: "pointer",
                              ":hover": { transform: "scale(1.1)" },
                            }
                      }
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setRegistroId(item.id);
                      }}
                    />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: "var(--cor-primaria)",
              color: "black",
              ":hover": { background: "var(--button-hover)" },
            }}
            fullWidth
            onClick={() => {
              handleOpenFreeMonay();
              setTypeModal("guardado");
              listSaved();
            }}
          >
            <CardMedia component="img" src={porquinho} sx={{ width: "50px" }} />
          </Button>
        </Box>

        <Box>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: "var(--cor-primaria)",
              color: "white",
              px: "10px",
              fontWeight: "bold",
              fontFamily: "font1",
              fontSize: { xs: "12px", lg: "16px" },
              boxShadow: "0px 5px 4px rgba(0, 0, 0, 0.25)",
              ":hover": { background: "var(--button-hover)" },
            }}
            onClick={() => {
              setOpenDinheiroAtualModal(true);
              listDinheiroAtual();
            }}
          >
            Dinheiro Atual
          </Button>
        </Box>

        <Box>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: "var(--cor-primaria)",
              color: "white",
              ":hover": { background: "var(--button-hover)" },
            }}
            onClick={() => {
              handleOpenFreeMonay();
              setTypeModal("livre");
              listSaved();
            }}
            fullWidth
          >
            <img src={carteira} alt="carteira" style={{ width: "50px" }} />
          </Button>
        </Box>
      </Box>
      <SaveModal open={open} setOpen={setOpen} mes={mes} />
      <DinheiroAtualModal
        open={openDinheiroAtualModal}
        setOpen={setOpenDinheiroAtualModal}
        mes={mes}
        dinheiroAtualMes={dinheiroAtualMes}
        listDinheiroAtual={listDinheiroAtual}
      />
      <FreeMonay
        openFreeMonay={openFreeMonay}
        setOpenFreeMonay={setOpenFreeMonay}
        savedMes={savedMes}
        typeModal={typeModal}
        entrada={entrada}
        saida={saida}
        dinheiroAtualMes={dinheiroAtualMes}
        mes={mes}
      />
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        registroId={registroId}
        listBillings={listBillings}
      />
      <RegisterModal
        open={openRegisterModal}
        setOpen={setOpenRegisterModal}
        action="edit"
        registroId={registroId}
        listBillings={listBillings}
        registro={registro}
        setRegistro={setRegistro}
      />
    </Grid>
  );
}
