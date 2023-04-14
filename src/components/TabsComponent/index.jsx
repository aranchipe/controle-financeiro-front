import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RegisterForm from "../RegisterForm";

export default function TabsComponent({
  handleClose,
  listBillings,
  action,
  registroId,
  registro,
}) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(registro);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="entrada" value="1" />
            <Tab label="saida" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <RegisterForm
            listBillings={listBillings}
            type="entrada"
            handleClose={handleClose}
            action={action}
            registroId={registroId}
            registro={registro}
          />
        </TabPanel>
        <TabPanel value="2">
          <RegisterForm
            listBillings={listBillings}
            type="saida"
            handleClose={handleClose}
            action={action}
            registroId={registroId}
            registro={registro}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
