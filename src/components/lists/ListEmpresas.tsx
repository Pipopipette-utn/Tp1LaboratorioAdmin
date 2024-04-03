import React, { FC, useState } from "react";
import { Empresa } from "../../types/types";
import { Button, Collapse, Grid, Typography } from "@mui/material";
import { DeleteConfirmationDialog } from "../commons/deleteConfirmation";

export const EmpresaList: FC<{ empresa: Empresa }> = ({ empresa }) => {
  const [expanded, setExpanded] = useState(false);
  const [empresas, setEmpresas] = useState<Empresa[]>([]); //esto posiblemente lo termine borrando

  // Función para cargar la lista de empresas (que posiblemente borre)
  const cargarEmpresas = () => {
    fetch("http://localhost:8080/empresas")
      .then((response) => response.json())
      .then((data) => {
        setEmpresas(data);
      })
      .catch((error) => {
        console.error("Error al cargar las empresas:", error);
      });
  };

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
        // Actualizar el estado local para reflejar la eliminación de la empresa
        setEmpresas(empresas.filter((e) => e.id !== empresa.id)); //vos no safas, tambien te vas a ir borrado
        cargarEmpresas();
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
        <Collapse in={expanded} timeout="auto" unmountOnExit={true}>
          <Typography>{empresa.quienesSomos}</Typography>
        </Collapse>
      </Grid>
    </Grid>
  );
};
