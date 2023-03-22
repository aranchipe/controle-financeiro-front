import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import { getItem } from "../../utils/storage";
import { format } from "date-fns";
import { Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";

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

  const registrosJaneiro = registros.filter((item) => {
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
          lg: "25%",
        },
        border: "1px solid black",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ height: "40px", display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontWeight: "bold" }}>{mes}</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrosJaneiro.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {item.description}
                </TableCell>
                <TableCell align="right">{item.value}</TableCell>
                <TableCell align="right">
                  {format(new Date(item.data), "yyyy-MM-dd")}
                </TableCell>
                <TableCell align="right">{item.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
