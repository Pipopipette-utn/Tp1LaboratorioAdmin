import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { EmpresaList } from "../components/lists/ListEmpresas";
import { useEmpresa } from "../hooks/useEmpresa";
import AddIcon from "@mui/icons-material/Add";
import { EmpresaForm } from "../components/forms/EmpresaForm";
import { emptyEmpresa } from "../types/types";

export const EmpresaHome = () => {
	const [actualizar, setActualizar] = useState(false);
	const [mostrarBajas, setMostrarBajas] = useState(false);
	const empresas = useEmpresa(actualizar);

	const [openModal, setOpenModal] = useState(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

	const handleMostrarBajasClick = () => {
		setMostrarBajas(!mostrarBajas);
	};

	return (
		<Box width="auto" padding={3}>
			<Typography variant="h4" fontWeight="bold">
				Nuestras empresas
			</Typography>
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
			<Stack alignItems="center">
				<Button
					variant="contained"
					onClick={handleOpen}
					sx={{
						fontWeight: "bold",
						borderRadius: "30px",
						marginTop: "36px",
						p: "10px 40px",
						width: "fit-content",
					}}
					startIcon={<AddIcon />}
				>
					Crear nueva empresa
				</Button>
			</Stack>
			<EmpresaForm
				onClose={handleClose}
				open={openModal}
				empresa={emptyEmpresa}
			/>
		</Box>
	);
};
