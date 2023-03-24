import "./style.css";
import Card2 from "../../components/Card2";
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="header">a</div>
      <div className="dashboard-content">
        <div className="cards">
          <Card2 numberMes={0} />
          <Card2 numberMes={1} />
          <Card2 numberMes={2} />
          <Card2 numberMes={3} />
          <Card2 numberMes={4} />
          <Card2 numberMes={5} />
          <Card2 numberMes={6} />
          <Card2 numberMes={7} />
          <Card2 numberMes={8} />
          <Card2 numberMes={9} />
          <Card2 numberMes={10} />
          <Card2 numberMes={11} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
