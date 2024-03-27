import { useEffect, useState } from "react";
import { Empresa } from "../types/types";
import { EmpresaCard } from "../components/EmpresaCard";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Fab, Stack } from "@mui/material";

export const Home = () => {
	const [empresas, setEmpresas] = useState<Empresa[]>();

	useEffect(() => {
		const fetchEmpresas = async () => {
			try {
				const response = await fetch(`http://localhost:8080/empresas`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setEmpresas(data);
			} catch (error) {
				console.error("Error fetching news:", error);
			}
		};

		fetchEmpresas();
	}, []);

	return (
		<Box height="100%">
			<Box height="60%">
				<img
					src="../../public/main.jpg"
					alt="Imagen principal"
					style={{ objectFit: "cover", width: "100%", height: "100%" }}
				/>
				<Button
					aria-label="add"
					sx={{ position: "relative", bottom: "50%", right: 16 }}
				>
					<AddIcon /> Crear Empresa
				</Button>
			</Box>

			<Stack direction="row" spacing={2}>
				{empresas &&
					empresas.map((empresa, index) => (
						<EmpresaCard empresa={empresa} key={index} />
					))}
			</Stack>
		</Box>
	);
};
