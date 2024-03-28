import React, { FC } from "react";
import { Button, Box, Grid, TextField } from "@mui/material";
import { useForm } from "../../hooks/useForm";
/*
falta agregar un setCoso asi en un onChange pongo
onChange={e => setCoso(e.target.value)}
por qué? porque react me está cagando a pedos
*/
interface IPropsEmpresaForm {
  handleAddEmpresa: Function;
}

export const EmpresaForm: FC<IPropsEmpresaForm> = ({ handleAddEmpresa }) => {
  const { handleChange, values, resetForm } = useForm({
    denominacion: "",
    telefono: "",
    horarioAtencion: "",
    quienesSomos: "",
    latitud: 0, //esto deberiamos tomarlo del mapa con la api boluda pide tarjeta de google maps
    longitud: 0,
    domicilio: "",
    email: "",
  });

  const handleSubmitForm = () => {
    const horarioAtencion = `${values.horaApertura} - ${values.horaCierre}`;
    const empresaData = { ...values, horarioAtencion };
    console.log(empresaData);
    console.log(horarioAtencion);
    handleAddEmpresa(empresaData);
    resetForm();
  };

  return (
    <Box p={4} border="1px solid" borderRadius={4} m={3}>
      <form onSubmit={handleSubmitForm}>
        <div>
          <label>Denominación:</label>
          <input
            type="text"
            name="denominacion"
            value={values.denominacion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            value={values.telefono}
            onChange={handleChange}
          />
        </div>
        <div>
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
        <div>
          <label>Descripcion:</label>
          <input
            type="text"
            name="quienesSomos"
            value={values.quienesSomos}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Domicilio:</label>
          <input
            type="text"
            name="domicilio"
            value={values.domicilio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Enviar empresa</button>
        </div>
      </form>
    </Box>
  );
};
