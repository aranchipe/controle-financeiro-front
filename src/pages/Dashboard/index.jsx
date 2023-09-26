import "./style.css";
import Card from "../../components/Card";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import RegisterModal from "../../components/RegisterModal";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { CardMedia, Typography } from "@mui/material";
import axios from "../../services/axios";
import { getItem } from "../../utils/storage";
import { Box } from "@mui/system";
import TotalSafe from "../../components/TotalSafe";
import Header from "../../components/Header";
import pigIcon from "../../assets/pig-icon.png";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [openDashboard, setOpenDashboard] = useState(0);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [registros, setRegistros] = useState([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [openTotalSafe, setOpenTotalSafe] = useState(false);
  const [responseGetGuardado, setResponseGetGuardado] = useState();
  const [responseGetDinheiroAtual, setResponseGetDinheiroAtual] = useState();
  const numberMes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const handleOpenTotalSafe = () => setOpenTotalSafe(true);


  console.log('ola')
  const mesAtual = new Date().getMonth();

  const token = getItem("token");



  const userDetail = async () => {
    try {
      const response = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserName(response.data.name);
      setUserEmail(response.data.email);
    } catch (error) { }
  };

  const listBillings = async () => {
    try {
      const response = await axios.get("/registros", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRegistros(response.data);
    } catch (error) {
      console.log("erro");
    } finally {
    }
  };

  const listSaved = async () => {
    try {
      const response = await axios.get("/guardados", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponseGetGuardado(response.data);
      let totalSaved = 0;
      for (let i = 0; i < response.data.length; i++) {
        totalSaved = totalSaved + Number(response.data[i].value);
      }
      setTotalSaved(totalSaved);
    } catch (error) {
      console.log(error.response, "3");
    }
  };
  const carregarDadosGuardado = () => {
    listSaved();
  };

  const listDinheiroAtual = async () => {
    try {
      const response = await axios.get("/dinheiroAtual", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setResponseGetDinheiroAtual(response.data);
      }

    } catch (error) {
    }
  };

  useEffect(() => {
    userDetail();
    listBillings();
    listSaved();
    listDinheiroAtual()
  }, []);
  return (
    <Box
      sx={
        openDashboard === 0 || openDashboard === 1
          ? {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "sticky",
            px: { lg: "20vw", xs: "10vw" },
            maxWidth: "100vw",
          }
          : {
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: { lg: "20vw", xs: "10vw" },
            position: "sticky",
            overflowY: "hidden",
            maxWidth: "100vw",
          }
      }
    >
      <Header userName={userName} userEmail={userEmail} />
      <Box sx={{ color: "var(--cor-primaria)", width: "100%" }}>
        <Typography
          sx={{
            fontFamily: "font1",
            fontSize: "28px",
            marginBottom: "2%",
            display: { lg: "block", xs: "none" },
          }}
        >
          Esse é seu <b>MOMENTO!</b>
        </Typography>
        <Typography
          sx={{
            fontFamily: "font1",
            fontSize: "18px",
            marginBottom: "2%",
            display: { lg: "block", xs: "none" },
          }}
        >
          "Desperte o potencial do dinheiro e transforme-o em seu aliado na
          busca pela realização <br /> pessoal e liberdade financeira."
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          width: "100%",
          height: "4.7vh",
          justifyContent: "end",
          marginBottom: "1vh",
          position: "absolute",
          top: { lg: "20vh", xs: "15vh" },
          right: "10vw",
        }}
      >
        <Button
          sx={{
            background: "var(--cor-primaria)",
            color: "white",
            fontWeight: "bold",
            fontFamily: "font1",
            boxShadow: "0px 5px 4px rgba(0, 0, 0, 0.25)",
            ":hover": { background: "var(--button-hover)" },
            borderRadius: "50px",
            px: "1vw",
          }}
          onClick={() => handleOpenTotalSafe()}
        >
          <CardMedia component="img" src={pigIcon} sx={{ width: "40px" }} />
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: "var(--cor-primaria)",
            color: "white",
            fontWeight: "bold",
            fontFamily: "font1",
            boxShadow: "0px 5px 4px rgba(0, 0, 0, 0.25)",
            ":hover": { background: "var(--button-hover)" },
            borderRadius: "50px",
          }}
          onClick={handleOpen}
        >
          Adicionar Registro
        </Button>
      </Box>

      <RegisterModal
        listBillings={listBillings}
        open={open}
        setOpen={setOpen}
        action="register"
      />
      <div
        className={
          openDashboard === 0
            ? " dashboard_3 dashboard_3_none"
            : openDashboard === 1
              ? " dashboard-content dashboard-content-aberto"
              : " dashboard-content dashboard-content-fechado"
        }
      >
        <CloseIcon
          sx={{
            position: "absolute",
            top: "30px",
            right: "50px",
            cursor: "pointer",
            ":hover": { transform: "scale(1.1)" },
            color: "white",
          }}
          fontSize="large"
          onClick={() => {
            setOpenDashboard(2);
          }}
        />

        {numberMes.map((item, index) => (
          <Box key={index} sx={{ width: { xs: "80%", lg: "30%" } }}>
            <Card
              listBillings={listBillings}
              registros={registros}
              numberMes={item}
              responseGetGuardado={responseGetGuardado}
              carregarDadosGuardado={carregarDadosGuardado}
              responseGetDinheiroAtual={responseGetDinheiroAtual}
              listDinheiroAtual={listDinheiroAtual}
            />
          </Box>
        ))}
      </div>
      <Card
        numberMes={mesAtual}
        listBillings={listBillings}
        responseGetGuardado={responseGetGuardado}
        registros={registros}
        carregarDadosGuardado={carregarDadosGuardado}
        responseGetDinheiroAtual={responseGetDinheiroAtual}
        listDinheiroAtual={listDinheiroAtual}
      />
      <ArrowUpwardIcon
        fontSize="large"
        sx={{
          position: "fixed",
          bottom: "1vh",
          ":hover": { transform: "scale(1.1)" },
          cursor: "pointer",
        }}
        onClick={() => {
          setOpenDashboard(1);
        }}
      />
      <TotalSafe
        openTotalSafe={openTotalSafe}
        setOpenTotalSafe={setOpenTotalSafe}
        totalSaved={totalSaved}
        responseGetGuardado={responseGetGuardado}
      />
    </Box>
  );
}

export default Dashboard;
