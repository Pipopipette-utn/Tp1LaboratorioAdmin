import { Box } from "@mui/material";
import { EmpresaList } from "../components/lists/ListEmpresas";
import { useEmpresa } from "../hooks/useEmpresa";

export const Empresa = () => {
	const empresas = useEmpresa();

	return (
		<Box minHeight="100vh">
			{empresas &&
				empresas.map((empresa, index) => {
					if (!empresa.baja)
						return <EmpresaList empresa={empresa} key={index} />;
				})}
		</Box>
	);
};
