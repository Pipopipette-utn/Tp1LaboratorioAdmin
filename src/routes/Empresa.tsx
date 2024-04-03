import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { EmpresaList } from "../components/lists/ListEmpresas";
import { useEmpresa } from "../hooks/useEmpresa";

export const Empresa = () => {
	const [actualizar, setActualizar] = useState(false);
	const [mostrarBajas, setMostrarBajas] = useState(false);
	const empresas = useEmpresa(actualizar);

	const handleMostrarBajasClick = () => {
		setMostrarBajas(!mostrarBajas);
	};

	return (
		<Box width="auto">
			<Typography variant="h4" fontWeight="bold">Nuestras empresas</Typography>
			{empresas &&
				empresas.map((empresa, index) => {
					if (mostrarBajas || !empresa.baja)
						return (
							<EmpresaList
								empresa={empresa}
								key={index}
								setActualizar={setActualizar}
							/>
						);
				})}
			<Button
				onClick={handleMostrarBajasClick}
				variant="outlined"
				style={{ marginTop: "16px" }}
			>
				{mostrarBajas
					? "Ocultar empresas dadas de baja"
					: "Mostrar empresas dadas de baja"}
			</Button>
		</Box>
	);
};
