import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import { date, object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { getItem, setItem } from "../../utils/storage";
import { useEffect, useState } from "react";
import axios from "../../services/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const schema = object({
  description: string().required("Campo obrigatório."),
  data: date().required("Campo obrigatório."),
  value: string().min(6).required("Campo obrigatório."),
});

export default function RegisterModal({ open, handleClose }) {
  const [value, setValue] = React.useState(0);
  const [type, setType] = React.useState("entrada");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSubmit = (data) => {
    /* try {
      await axios.post("/registros", data);
    } catch (error) {} */
    console.log("ola");
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Grid
              container
              spacing={2}
              sx={{ marginTop: 5 }}
              component="form"
              onSubmit={onSubmit(handleSubmit)}
            >
              <Grid item md={12} lg={12}>
                <FormControl
                  error={errors?.description ? true : false}
                  fullWidth
                >
                  <InputLabel>Descrição</InputLabel>
                  <OutlinedInput
                    type="text"
                    {...register("description")}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        sx={{ color: "rgba(150, 165, 171, 0.5)" }}
                      ></InputAdornment>
                    }
                    placeholder="Descrição"
                    label="Descrição"
                  />
                  <FormHelperText>
                    {errors?.description?.message?.toString() || " "}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item md={12} lg={12}>
                <FormControl error={errors?.data ? true : false} fullWidth>
                  <InputLabel>Data</InputLabel>
                  <OutlinedInput
                    type="date"
                    {...register("data")}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        sx={{ color: "rgba(150, 165, 171, 0.5)" }}
                      ></InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end"></InputAdornment>
                    }
                    placeholder="Data"
                    label="Data"
                  />
                  <FormHelperText>
                    {errors?.data?.message?.toString() || " "}
                  </FormHelperText>
                </FormControl>
              </Grid>
              {/* <Grid item md={12} lg={12}>
                <FormControl error={errors?.value ? true : false} fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Valor
                  </InputLabel>
                  <OutlinedInput
                    type="number"
                    {...register("value")}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        sx={{ color: "rgba(150, 165, 171, 0.5)" }}
                      ></InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end"></InputAdornment>
                    }
                    placeholder="Valor"
                    label="Valor"
                  />
                </FormControl>
              </Grid> */}
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Grid item lg={4} md={12}>
                  <Button variant="contained" fullWidth type="submit">
                    Cadastrar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
      <Modal open={open} onClose={handleClose} sx={{ position: "fixed" }}>
        <Box sx={style}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab
                  onClick={() => setType("entrada")}
                  label="Entrada"
                  {...a11yProps(0)}
                />
                <Tab
                  onClick={() => setType("saida")}
                  label="Saída"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {type}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {type}
            </TabPanel>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
