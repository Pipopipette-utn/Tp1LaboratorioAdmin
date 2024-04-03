import { EmpresaForm } from "../components/forms/EmpresaForm";
import Box from "@mui/material/Box";

export const NuevaEmpresa = () => {
	const handleAddEmpresa = (empresaData: any) => {
		console.log("Datos de la nueva empresa:", empresaData);

		fetch("http://localhost:8080/empresas", {
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

	return (
		<Box>
			<EmpresaForm handleAddEmpresa={handleAddEmpresa} />
		</Box>
	);
};