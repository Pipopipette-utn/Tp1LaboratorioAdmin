import { FC, useState } from "react";
import { Empresa } from "../../types/types";
import { Button, Collapse, Grid, Link, Stack, Typography } from "@mui/material";

/*
interface IEmpresaListProps {
  arrEmpresas: Empresa[];
}

export const EmpresaList: FC<IEmpresaListProps> = ({ arrEmpresas }) => {
  return <div></div>;
};
*/
export const EmpresaList: FC<{ empresa: Empresa }> = ({ empresa }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} key={empresa.telefono}>
        <Typography variant="h6">{empresa.denominacion}</Typography>
        <Typography>{empresa.horarioAtencion}</Typography>
        <Button onClick={handleExpandClick}>
          {expanded ? "Mostrar menos" : "Mostrar más"}
        </Button>
        <Collapse in={expanded} timeout="auto" unmountOnExit={true}>
          <Typography>{empresa.quienesSomos}</Typography>
        </Collapse>
      </Grid>
    </Grid>
  );
};
