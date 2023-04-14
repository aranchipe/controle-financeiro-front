import "./style.css";
import Card from "../../components/Card";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import RegisterModal from "../../components/RegisterModal";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Typography } from "@mui/material";
import { clear } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";
import { getItem } from "../../utils/storage";
import exit from "../../assets/exit.svg";
import { Box } from "@mui/system";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [showContent, setShowContent] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(0);
  const [userName, setUserName] = useState("");
  const [registros, setRegistros] = useState([]);

  const mesAtual = new Date().getMonth();
  const navigate = useNavigate();
  const handleQuit = () => {
    clear();
    navigate("/signin");
  };
  const token = getItem("token");

  useEffect(() => {
    userDetail();
    listBillings();
  }, []);

  const userDetail = async () => {
    try {
      const response = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserName(response.data.name);
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
  return (
    <div
      className={
        openDashboard === 0 || openDashboard === 1
          ? "dashboard_1"
          : "dashboard_2"
      }
    >
      <Typography
        sx={{
          position: "absolute",
          left: "35px",
          top: "30px",
          fontFamily: "cursive",
        }}
      >
        Seja bem vindo {userName}
      </Typography>
      <img
        src={exit}
        alt="exit"
        onClick={handleQuit}
        style={{
          position: "absolute",
          width: "50px",
          top: "50px",
          left: "20px",
          cursor: "pointer",
        }}
      />
      <Button
        variant="contained"
        size="large"
        sx={{
          background:
            "linear-gradient(90.23deg, #cbee60 0.02%, #f4e404 99.63%)",
          color: "black",
          position: "absolute",
          right: "100px",
          top: "150px",
        }}
        onClick={handleOpen}
      >
        Adicionar Registro
      </Button>
      <RegisterModal
        listBillings={listBillings}
        open={open}
        setOpen={setOpen}
        action="register"
      />
      <div
        className={
          openDashboard === 0
            ? " dashboard_3"
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
          }}
          fontSize="large"
          onClick={() => {
            setShowContent(false);
            setOpenDashboard(2);
          }}
        />
        <Card listBillings={listBillings} registros={registros} numberMes={0} />
        <Card listBillings={listBillings} registros={registros} numberMes={1} />
        <Card listBillings={listBillings} registros={registros} numberMes={2} />
        <Card listBillings={listBillings} registros={registros} numberMes={3} />
        <Card listBillings={listBillings} registros={registros} numberMes={4} />
        <Card listBillings={listBillings} registros={registros} numberMes={5} />
        <Card listBillings={listBillings} registros={registros} numberMes={6} />
        <Card listBillings={listBillings} registros={registros} numberMes={7} />
        <Card listBillings={listBillings} registros={registros} numberMes={8} />
        <Card listBillings={listBillings} registros={registros} numberMes={9} />
        <Card
          listBillings={listBillings}
          registros={registros}
          numberMes={10}
        />
        <Card
          listBillings={listBillings}
          registros={registros}
          numberMes={11}
        />
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
          bottom: "20px",
          ":hover": { transform: "scale(1.1)" },
          cursor: "pointer",
        }}
        onClick={() => {
          setShowContent(true);
          setOpenDashboard(1);
        }}
      />
    </div>
  );
}

export default Dashboard;
