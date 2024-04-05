<<<<<<< Updated upstream
import { FC, FormEvent } from "react";
import { Box, Grid, TextField } from "@mui/material";
import { useForm } from "../../hooks/useForm";
=======
import { FC, FormEvent, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { Empresa } from "../../types/types";
import MapComponent from "../mapComponent";
>>>>>>> Stashed changes

interface IPropsEmpresaForm {
  handleAddEmpresa: Function;
}

<<<<<<< Updated upstream
export const EmpresaForm: FC<IPropsEmpresaForm> = ({ handleAddEmpresa }) => {
  const { handleChange, values, resetForm } = useForm({
    denominacion: "",
    telefono: "",
    horaApertura: "",
    horaCierre: "",
    horarioAtencion: "",
    quienesSomos: "",
    latitud: 0,
    longitud: 0,
    domicilio: "",
    email: "",
  });
=======
export const EmpresaForm: FC<IPropsEmpresaForm> = ({
  open,
  onClose,
  empresa,
}) => {
  const { handleChange, values, resetForm, setValues } = useForm(empresa);

  useEffect(() => {
    if (empresa) {
      setValues({
        denominacion: empresa.denominacion,
        telefono: empresa.telefono,
        horaApertura: empresa.horarioAtencion.split(" ")[1],
        horaCierre: empresa.horarioAtencion.split(" ")[3],
        horarioAtencion: empresa.horarioAtencion,
        quienesSomos: empresa.quienesSomos,
        latitud: empresa.latitud,
        longitud: empresa.longitud,
        domicilio: empresa.domicilio,
        email: empresa.email,
        baja: empresa.baja,
      });
    }
  }, [empresa, setValues]);

  const handleAddEmpresa = (empresaData: any) => {
    console.log("Datos de la nueva empresa:", empresaData);

    fetch("http://localhost:8080/empresas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empresaData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("La empresa se agregó correctamente");
          alert("Empresa creada con éxito");
          //setActualizar((prev: boolean) => !prev);
          onClose();
        } else {
          console.error("Error al agregar la empresa:", response.statusText);
        }
      })
      .catch((error) => {
        alert("Error al crear la empresa");
        console.error("Error en la solicitud:", error);
      });
  };

  const handleEditEmpresa = (empresaData: Empresa) => {
    console.log("Datos de la empresa editada:", empresaData);

    fetch(`http://localhost:8080/empresas/${empresa.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empresaData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("La empresa se editó correctamente");
        } else {
          console.error("Error al editar la empresa:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };
>>>>>>> Stashed changes

  const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>([]);

  useEffect(() => {
    if (
      empresa &&
      empresa.horarioAtencion &&
      empresa.horarioAtencion.includes("los días")
    ) {
      const dias = empresa.horarioAtencion.match(/los días (.+)$/);
      if (dias) {
        const diasSeleccionados = dias[1].split(", ").map((dia) => dia.trim());
        setDiasSeleccionados(diasSeleccionados);
      }
    }
  }, [empresa]);

  const toggleDiaSeleccionado = (dia: string) => {
    if (diasSeleccionados.includes(dia)) {
      setDiasSeleccionados(diasSeleccionados.filter((d) => d !== dia));
    } else {
      setDiasSeleccionados([...diasSeleccionados, dia]);
    }
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
<<<<<<< Updated upstream
    const horarioAtencion = `De ${values.horaApertura} a ${values.horaCierre}`;
    const empresaData = { ...values, horarioAtencion };
    handleAddEmpresa(empresaData);
=======
    const latitud = values.latitud !== undefined ? values.latitud : 0;
    const longitud = values.longitud !== undefined ? values.longitud : 0;
    const horaApertura =
      values.horaApertura !== undefined ? values.horaApertura : "00:00";
    const horaCierre =
      values.horaCierre !== undefined ? values.horaCierre : "00:00";

    const horarioAtencion = `De ${horaApertura} a ${horaCierre} los días ${diasSeleccionados.join(
      ", "
    )}`;
    const empresaData = { ...values, latitud, longitud, horarioAtencion };
    if (empresa.id) handleEditEmpresa(empresaData);
    else handleAddEmpresa(empresaData);
>>>>>>> Stashed changes
    resetForm();
  };

  function handleLocationChange(lat: number, lng: number) {
    // Actualiza la latitud y longitud de la empresa en el estado del componente
    setValues((prevValues: IFormValues) => ({
      //ignorar error, anda
      ...prevValues,
      latitud: lat,
      longitud: lng,
    }));
  }

  return (
<<<<<<< Updated upstream
    <Box p={4} border="1px solid" borderRadius={4} m={3}>
      <form onSubmit={handleSubmitForm}>
        <div className="formEmpresaStyle">
          <label>Denominacion:</label>
          <TextField
            size="small"
            type="text"
            name="denominacion"
            value={values.denominacion}
            onChange={handleChange}
          />
        </div>
        <div className="formEmpresaStyle">
          <label>Telefono:</label>
          <TextField
            size="small"
            type="tel"
            name="telefono"
            value={values.telefono}
            onChange={handleChange}
          />
        </div>
        <div className="formEmpresaStyle">
          <label>Horario de atención:</label>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                type="time"
                name="horaApertura"
                label="Apertura"
                value={values.horaApertura}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // Incremento de 5 minutos
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                type="time"
                name="horaCierre"
                label="Cierre"
                value={values.horaCierre}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // Incremento de 5 minutos
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className="formEmpresaStyle">
          <label>Descripcion:</label>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            name="quienesSomos"
            value={values.quienesSomos}
            onChange={handleChange}
          />
        </div>
        <div className="formEmpresaStyle">
          <label>Domicilio:</label>
          <TextField
            size="small"
            variant="outlined"
            type="text"
            name="domicilio"
            value={values.domicilio}
            onChange={handleChange}
          />
        </div>
        <div className="formEmpresaStyle">
          <label>Email:</label>
          <TextField
            size="small"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className="formEmpresaStyle">
          <button type="submit">Enviar empresa</button>
        </div>
      </form>
    </Box>
=======
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={{
          backgroundColor: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "90%",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor:
            "rgba(0, 0, 0, 0.5) rgba(255, 255, 255, 0.5)" /* thumb track */,
        }}
      >
        <form onSubmit={handleSubmitForm}>
          <div className="formEmpresaStyle">
            <Typography variant="h4" align="center" gutterBottom>
              {empresa.id ? "Modificar empresa" : "Crear empresa"}
            </Typography>
            <label>Denominacion:</label>
            <TextField
              size="small"
              type="text"
              name="denominacion"
              value={values.denominacion}
              onChange={handleChange}
            />
          </div>
          <div className="formEmpresaStyle">
            <label>Telefono:</label>
            <TextField
              size="small"
              type="tel"
              name="telefono"
              value={values.telefono}
              onChange={handleChange}
            />
          </div>
          <div className="formEmpresaStyle">
            <label>Horario de atención:</label>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <TextField
                  type="time"
                  name="horaApertura"
                  label="Apertura"
                  value={values.horaApertura}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // Incremento de 5 minutos
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  type="time"
                  name="horaCierre"
                  label="Cierre"
                  value={values.horaCierre}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // Incremento de 5 minutos
                  }}
                />
              </Grid>
              <Grid item>
                <div className="dayButtons">
                  {[
                    "Lunes",
                    "Martes",
                    "Miércoles",
                    "Jueves",
                    "Viernes",
                    "Sábado",
                    "Domingo",
                  ].map((day, index) => (
                    <Button
                      className="buttonContainer"
                      key={index}
                      onClick={() => toggleDiaSeleccionado(day)}
                      variant={
                        diasSeleccionados.includes(day)
                          ? "contained"
                          : "outlined"
                      }
                      style={{
                        color: diasSeleccionados.includes(day)
                          ? "black"
                          : "inherit",
                        marginRight: "10px",
                      }}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </Grid>
            </Grid>
          </div>
          <div>
            <label>Seleccione la ubicacion de su empresa en el mapa</label>
            <MapComponent onMarkerDragEnd={handleLocationChange} />
          </div>
          <div className="formEmpresaStyle">
            <label>Descripcion:</label>
            <TextField
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              name="quienesSomos"
              value={values.quienesSomos}
              onChange={handleChange}
            />
          </div>
          <div className="formEmpresaStyle">
            <label>Domicilio:</label>
            <TextField
              size="small"
              variant="outlined"
              type="text"
              name="domicilio"
              value={values.domicilio}
              onChange={handleChange}
            />
          </div>
          <div className="formEmpresaStyle">
            <label>Email:</label>
            <TextField
              size="small"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="buttonContainer">
            <button type="submit">Enviar empresa</button>
            <button onClick={onClose}>Cancelar </button>
          </div>
        </form>
      </Stack>
    </Modal>
>>>>>>> Stashed changes
  );
};
