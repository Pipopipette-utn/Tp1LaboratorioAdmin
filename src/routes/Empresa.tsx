import { Box } from "@mui/material";
import { EmpresaForm } from "../components/forms/EmpresaForm";

/*
Descomentar linea 7 para abajo cuando esté preparado para 
tirar la db
O jaz revise
*/
export const Empresa = () => {
  /*
  const handleAddEmpresa = (empresaData: any) => {
    // Lógica para manejar la adición de empresa
    console.log("Datos de la nueva empresa:", empresaData);

    // Para enviar los datos de la empresa al servidor
	
    fetch("URL_DEL_SERVIDOR", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empresaData),
    })
	
      .then((response) => {
        if (response.ok) {
          console.log("La empresa se agregó correctamente");
        } else {
          console.error("Error al agregar la empresa:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };
*/
  return (
    <Box height="100vh">
      <h2>Empresssa</h2>
      <EmpresaForm handleAddEmpresa={handleAddEmpresa} />
    </Box>
  );
};
