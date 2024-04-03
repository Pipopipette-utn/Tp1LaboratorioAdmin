import { Box } from "@mui/material";
import { EmpresaList } from "../components/lists/ListEmpresas";
import { useEmpresa } from "../hooks/useEmpresa";

export const Empresa = () => {
  const empresas = useEmpresa();

  return (
    <Box height="100vh">
      {empresas &&
        empresas.map((empresa, index) => (
          <EmpresaList empresa={empresa} key={index} />
        ))}
    </Box>
  );
};
