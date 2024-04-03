import React, { FC, useState } from "react";
import { Empresa } from "../../types/types";
import { Button, Collapse, Grid, Typography } from "@mui/material";
import { DeleteConfirmationDialog } from "../commons/deleteConfirmation";

export const EmpresaList: FC<{ empresa: Empresa }> = ({ empresa }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    fetch(`http://localhost:8080/empresas/${empresa.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar la empresa");
        }
        empresa.baja = true;
        console.log("Empresa eliminada correctamente: " + empresa.id);
        console.log("URL:" + ` http://localhost:8080/empresas/${empresa.id}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEditClick = () => {};

  const handleAltaClick = () => {
    fetch(`http://localhost:8080/empresas/${empresa.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: empresa.id,
        denominacion: empresa.denominacion,
        telefono: empresa.telefono,
        horarioAtencion: empresa.horarioAtencion,
        quienesSomos: empresa.quienesSomos,
        domicilio: empresa.domicilio,
        email: empresa.email,
        latitud: empresa.latitud,
        longitud: empresa.longitud,
        baja: false,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el estado de la empresa");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} key={empresa.id}>
        <Typography variant="h6">{empresa.denominacion}</Typography>
        <Typography>{empresa.horarioAtencion}</Typography>
        <Button onClick={handleExpandClick}>
          {expanded ? "Mostrar menos" : "Mostrar más"}
        </Button>
        <DeleteConfirmationDialog onConfirm={handleDelete} />
        <Button onClick={handleAltaClick}>Dar de alta</Button>
        <Button onClick={handleEditClick}>Modificar</Button>
        <Button href={`/noticias/${empresa.id}`}>Ver noticias</Button>
        <Collapse in={expanded} timeout="auto" unmountOnExit={true}>
          <Typography>{empresa.quienesSomos}</Typography>
        </Collapse>
      </Grid>
    </Grid>
  );
};
