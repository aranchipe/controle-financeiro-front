import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RegisterForm from "../RegisterForm";

function TabsComponent({
  handleClose,
  listBillings,
  action,
  registroId,
  registro,
  setRegistro,
}) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="entrada" value="1" />
            <Tab label="saida" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <RegisterForm
            type="entrada"
            handleClose={handleClose}
            action={action}
            registro={registro}
            listBillings={listBillings}
          />
        </TabPanel>
        <TabPanel value="2">
          <RegisterForm
            type="saida"
            handleClose={handleClose}
            action={action}
            registro={registro}
            listBillings={listBillings}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default TabsComponent;
