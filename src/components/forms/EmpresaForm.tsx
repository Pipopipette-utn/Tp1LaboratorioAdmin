import { FC, FormEvent, useEffect } from "react";
import { Grid, Modal, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { Empresa } from "../../types/types";

interface IPropsEmpresaForm {
  open: boolean;
  onClose: () => void;
  empresa: Empresa;
}

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
    //verificaciones para mantener controlado sus estados (asi no quedan undefined)
    if (empresa.latitud === undefined) {
      empresa.latitud = 0;
    }

    if (empresa.longitud === undefined) {
      empresa.longitud = 0;
    }
    if (empresa.horarioAtencion.split(" ")[1] === undefined) {
      empresa.horarioAtencion.split(" ")[1] = "00:00";
    }

    if (empresa.horarioAtencion.split(" ")[3] === undefined) {
      empresa.horarioAtencion.split(" ")[3] = "03:00";
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
    console.log("Datos de la nueva empresa:", empresaData);

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
          console.error("Error al agregar la empresa:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    const horarioAtencion = `De ${values.horaApertura} a ${values.horaCierre}`;
    const empresaData = { ...values, horarioAtencion };
    if (empresa.id)
      handleEditEmpresa(empresaData); //ignorar ese error, está controlado
    else handleAddEmpresa(empresaData);
    resetForm();
  };

  return (
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
          <div className="buttonContainer">
            <button type="submit">Enviar empresa</button>
            <button onClick={onClose}>Cancelar </button>
          </div>
        </form>
      </Stack>
    </Modal>
  );
};
