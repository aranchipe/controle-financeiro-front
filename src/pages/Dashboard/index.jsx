import "./style.css";
import Card from "../../components/Card";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import RegisterModal from "../../components/RegisterModal";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { CardMedia, Typography } from "@mui/material";
import { clear } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
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

  const handleOpenTotalSafe = () => setOpenTotalSafe(true);

  const mesAtual = new Date().getMonth();
  const navigate = useNavigate();

  const token = getItem("token");

  useEffect(() => {
    userDetail();
    listBillings();
    listSaved();
  }, []);

  const userDetail = async () => {
    try {
      const response = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserName(response.data.name);
      setUserEmail(response.data.email);
    } catch (error) {}
  };

  const listBillings = async () => {
    const response = await axios.get("/registros", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRegistros(response.data);
  };

  const listSaved = async () => {
    try {
      const response = await axios.get("/guardados", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let totalSaved = 0;
      for (let i = 0; i < response.data.length; i++) {
        totalSaved = totalSaved + Number(response.data[i].value);
      }
      setTotalSaved(totalSaved);
    } catch (error) {
      clear();
      navigate("/signin");
    }
  };
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
        <Box sx={{ width: { xs: "80%", lg: "30%" } }}>
          <Card
            listBillings={listBillings}
            registros={registros}
            numberMes={0}
          />
        </Box>
        <Box sx={{ width: { xs: "80%", lg: "30%" } }}>
          <Card
            listBillings={listBillings}
            registros={registros}
            numberMes={1}
          />
        </Box>
        <Box sx={{ width: { xs: "80%", lg: "30%" } }}>
          <Card
            listBillings={listBillings}
            registros={registros}
            numberMes={2}
          />
        </Box>
        <Box sx={{ width: { xs: "80%", lg: "30%" } }}>
          <Card
            listBillings={listBillings}
            registros={registros}
            numberMes={3}
          />
        </Box>
        <Box sx={{ width: { xs: "80%", lg: "30%" } }}>
          <Card
            listBillings={listBillings}
            registros={registros}
            numberMes={4}
          />
        </Box>
        <Box sx={{ width: { xs: "80%", lg: "30%" } }}>
          <Card
            listBillings={listBillings}
            registros={registros}
            numberMes={5}
          />
        </Box>
        <Box sx={{ width: { xs: "80%", lg: "30%" } }}>
          <Card
            listBillings={listBillings}
            registros={registros}
            numberMes={6}
          />
        </Box>
        <Box sx={{ width: { xs: "80%", lg: "30%" } }}>
          <Card
            listBillings={listBillings}
            registros={registros}
            numberMes={7}
          />
        </Box>
        <Box sx={{ width: { xs: "80%", lg: "30%" } }}>
          <Card
            listBillings={listBillings}
            registros={registros}
            numberMes={8}
          />
        </Box>
        <Box sx={{ width: { xs: "80%", lg: "30%" } }}>
          <Card
            listBillings={listBillings}
            registros={registros}
            numberMes={9}
          />
        </Box>
        <Box sx={{ width: { xs: "80%", lg: "30%" } }}>
          <Card
            listBillings={listBillings}
            registros={registros}
            numberMes={10}
          />
        </Box>
        <Box sx={{ width: { xs: "80%", lg: "30%" } }}>
          <Card
            listBillings={listBillings}
            registros={registros}
            numberMes={11}
          />
        </Box>
      </div>
      <Card
        numberMes={mesAtual}
        listBillings={listBillings}
        registros={registros}
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
        listSaved={listSaved}
      />
    </Box>
  );
}

export default Dashboard;
