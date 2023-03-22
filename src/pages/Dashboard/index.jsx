import "./style.css";
import Card from "../../components/Card";
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="header">a</div>
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
