import "./style.css";
import Card from "../../components/Card";
import Button from "@mui/material/Button";
import { useState } from "react";
import RegisterModal from "../../components/RegisterModal";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Typography } from "@mui/material";
import { clear } from "../../utils/storage";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [showContent, setShowContent] = useState(true);

  const mesAtual = new Date().getMonth();

  return (
    <div className={showContent ? "dashboard_1" : "dashboard_2"}>
      <Typography onClick={() => clear()}>Sair</Typography>
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
      <RegisterModal open={open} setOpen={setOpen} />
      {showContent ? (
        <div className="dashboard-content">
          <CloseIcon
            sx={{
              position: "absolute",
              top: "30px",
              right: "50px",
              cursor: "pointer",
              ":hover": { transform: "scale(1.1)" },
            }}
            fontSize="large"
            onClick={() => setShowContent(false)}
          />
          <Card numberMes={0} />
          <Card numberMes={1} />
          <Card numberMes={2} />
          <Card numberMes={3} />
          <Card numberMes={4} />
          <Card numberMes={5} />
          <Card numberMes={6} />
          <Card numberMes={7} />
          <Card numberMes={8} />
          <Card numberMes={9} />
          <Card numberMes={10} />
          <Card numberMes={11} />
        </div>
      ) : (
        <Card numberMes={mesAtual} />
      )}
      {!showContent && (
        <ArrowUpwardIcon
          fontSize="large"
          sx={{
            position: "fixed",
            bottom: "20px",
            ":hover": { transform: "scale(1.1)" },
            cursor: "pointer",
          }}
          onClick={() => setShowContent(true)}
        />
      )}
    </div>
  );
}

export default Dashboard;
