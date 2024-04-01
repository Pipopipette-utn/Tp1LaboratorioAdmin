import { FC, FormEvent } from "react";
import { Box, Grid, Input, TextField } from "@mui/material";
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
    horaApertura: "",
    horaCierre: "",
    horarioAtencion: "",
    quienesSomos: "",
    latitud: 0, //esto deberiamos tomarlo del mapa con la api boluda pide tarjeta de google maps
    longitud: 0,
    domicilio: "",
    email: "",
  });

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    const horarioAtencion = `De ${values.horaApertura} a ${values.horaCierre}`;
    const empresaData = { ...values, horarioAtencion };
    handleAddEmpresa(empresaData);
    resetForm();
  };

  return (
    <Box p={4} border="1px solid" borderRadius={4} m={3}>
      <form onSubmit={handleSubmitForm}>
        <div>
          <TextField
            label="Denominacion"
            size="small"
            type="text"
            name="denominacion"
            value={values.denominacion}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            label="Telefono"
            size="small"
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
        <div>
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
        <div>
          <label>Email:</label>
          <TextField
            size="small"
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
