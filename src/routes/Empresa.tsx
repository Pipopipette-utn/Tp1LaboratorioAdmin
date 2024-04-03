import { useState } from "react";
import { Box, Button } from "@mui/material";
import { EmpresaList } from "../components/lists/ListEmpresas";
import { useEmpresa } from "../hooks/useEmpresa";

export const Empresa = () => {
  const empresas = useEmpresa();
  const [mostrarBajas, setMostrarBajas] = useState(false);

  const handleMostrarBajasClick = () => {
    setMostrarBajas(!mostrarBajas);
  };

  return (
    <Box minHeight="100vh">
      <Button
        onClick={handleMostrarBajasClick}
        variant="outlined"
        style={{ marginTop: "16px" }}
      >
        {mostrarBajas
          ? "Ocultar empresas dadas de baja"
          : "Mostrar empresas dadas de baja"}
      </Button>
      {empresas &&
        empresas.map((empresa, index) => {
          if (mostrarBajas || !empresa.baja)
            return <EmpresaList empresa={empresa} key={index} />;
        })}
    </Box>
  );
};
