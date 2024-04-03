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
        console.log("Empresa eliminada correctamente: " + empresa.id);
        console.log("URL:" + ` http://localhost:8080/empresas/${empresa.id}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEditClick = () => {};

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} key={empresa.telefono}>
        <Typography variant="h6">{empresa.denominacion}</Typography>
        <Typography>{empresa.horarioAtencion}</Typography>
        <Button onClick={handleExpandClick}>
          {expanded ? "Mostrar menos" : "Mostrar más"}
        </Button>
        <DeleteConfirmationDialog onConfirm={handleDelete} />
        <Button onClick={handleEditClick}>Modificar</Button>
        <Button href={`/noticias/${empresa.id}`}>Ver noticias</Button>
        <Collapse in={expanded} timeout="auto" unmountOnExit={true}>
          <Typography>{empresa.quienesSomos}</Typography>
        </Collapse>
      </Grid>
    </Grid>
  );
};
