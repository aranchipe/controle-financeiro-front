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
  const token = getItem("token");

  useEffect(() => {
    listBillings();
  });

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

  let mes = "";
  if (numberMes === 0) {
    mes = "Janeiro";
  } else if (numberMes === 1) {
    mes = "Fevereiro";
  } else if (numberMes === 2) {
    mes = "Março";
  } else if (numberMes === 3) {
    mes = "Abril";
  } else if (numberMes === 4) {
    mes = "Maio";
  } else if (numberMes === 5) {
    mes = "Junho";
  } else if (numberMes === 6) {
    mes = "Julho";
  } else if (numberMes === 7) {
    mes = "Agosto";
  } else if (numberMes === 8) {
    mes = "Setembro";
  } else if (numberMes === 9) {
    mes = "Outubro";
  } else if (numberMes === 10) {
    mes = "Novembro";
  } else if (numberMes === 11) {
    mes = "Dezembro";
  }

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
        <Typography sx={{ fontWeight: "bold" }}>{mes}</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Descrição</StyledTableCell>
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
      </TableContainer>
    </Grid>
  );
}
