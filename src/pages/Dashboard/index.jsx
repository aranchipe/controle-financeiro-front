import "./style.css";
import Card from "../../components/Card";
import Button from "@mui/material/Button";
import { useState } from "react";
import RegisterModal from "../../components/RegisterModal";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="dashboard">
      <div className="header">
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
      </div>
      <RegisterModal
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <div className="dashboard-content">
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
    </div>
  );
}

export default Dashboard;
