import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "../../services/axios";
import { getItem } from "../../utils/storage";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography, Grid } from "@mui/material";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveModal from "../../components/SaveModal";
import porquinho from "../../assets/porquinho.svg";
import carteira from "../../assets/carteira.svg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(96, 214, 132)",
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Card({ numberMes }) {
  const [registros, setRegistros] = useState([]);
  const [saida, setSaida] = useState(0);
  const token = getItem("token");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [savedMes, setSavedMes] = useState(0);


  useEffect(() => {
    listBillings();
    saidasMes();
    listSaved();
  },[]);

  const listBillings = async () => {
    const response = await axios.get("/registros", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRegistros(response.data);
  };

  const registrosMes = registros.filter((item) => {
    return new Date(item.data).getMonth() === numberMes;
  });

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
      if(saved.length === 0) {
        setSavedMes(0);
      } else {
        setSavedMes(saved[0].value);

      }      
    } catch (error) {
      
    }
  };

  return (
    <Grid
      sx={{
        width: {
          md: "90%",
          lg: "30%",
        },
        border: "1px solid black",
        borderRadius: "8px",
        background: "white",
      }}
    >
      <Box sx={{ height: "40px", display: "flex", justifyContent: "center" }}>
        <Typography
          sx={{ fontWeight: "bold" }}
        >
          {mes}
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 400, borderBottom: "1px solid black" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>{savedMes}</StyledTableCell>
              <StyledTableCell align="right">Valor</StyledTableCell>
              <StyledTableCell align="right">Data</StyledTableCell>
              <StyledTableCell align="right">Tipo</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrosMes.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {item.description}
                </StyledTableCell>
                <StyledTableCell align="right">{item.value}</StyledTableCell>
                <StyledTableCell align="right">
                  {format(new Date(item.data), "dd-MM-yyyy")}
                </StyledTableCell>
                <StyledTableCell align="right">{item.type}</StyledTableCell>
                <StyledTableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <EditIcon
                      sx={{
                        color: "green",
                        cursor: "pointer",
                        ":hover": { transform: "scale(1.1)" },
                      }}
                    />
                    <DeleteIcon
                      sx={{
                        color: "green",
                        cursor: "pointer",
                        ":hover": { transform: "scale(1.1)" },
                      }}
                    />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: 'space-between',
          }}
          container
        >
          <Grid item md={2} lg={2}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background:
                  "#9BC7ED",
                color: "black",
              }}
              fullWidth
              onClick={handleOpen}
            >
              <img src={porquinho} style={{ width: "50px" }} />
            </Button>
          </Grid>

          <Grid > 
            <Button
              variant="contained"
              size="large"
              sx={{
                background:
                  "linear-gradient(90.23deg, #cbee60 0.02%, #f4e404 99.63%)",
                  
                color: "black",
              }}
              onClick={() => {
                handleOpen();
                listSaved()
              }}
            >
              Guardar
            </Button>
          </Grid>

          <Grid item md={2} lg={2}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background:
                  "#7ED08D",
                color: "black",
                ':hover':{background:'#23C841'}
              }}
              onClick={handleOpen}
              fullWidth
            >
              <img src={carteira} alt='carteira' style={{ width: "50px" }} />
            </Button>
          </Grid>
        </Grid>
      </TableContainer>
      <SaveModal
        open={open}
        setOpen={setOpen}
        mes={mes}
        savedMes={savedMes}
        listSaved={listSaved}
      />
    </Grid>
  );
}
