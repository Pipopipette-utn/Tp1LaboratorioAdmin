import { useEffect, useState } from "react";
import { Empresa } from "../types/types";
import { EmpresaCard } from "../components/EmpresaCard";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Fab, Stack, Typography } from "@mui/material";

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
		<Box height="100%" justifyContent="center">
			<Box height="400px">
				<div
					style={{
						backgroundImage: `url('../../public/main.jpg')`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						height: "100%",
						position: "relative",
					}}
				>
					<Typography
						sx={{
							position: "absolute",
							top: "40%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							fontWeight: "bold",
							color: "white",
							textShadow: "3px 3px 3px black",
							textAlign: "center",
						}}
						variant="h3"
					>
						Bienvenido al administrador del portal de noticias
					</Typography>
					<Button
						color="primary"
						aria-label="add"
						variant="contained"
						sx={{
							position: "absolute",
							bottom: "30%",
							left: "50%",
							transform: "translateX(-50%)",
						}}
						size="large"
					>
						<AddIcon /> Crear Empresa
					</Button>
				</div>
			</Box>

			<Stack sx={{ mb: "5%" }}>
				<Typography
					variant="h4"
					sx={{
						fontWeight: "bold",
						pt: "5%",
						pb: "2%",
						px: "5%",
						textAlign: "center",
					}}
				>
					Nuestras empresas
				</Typography>
				<Stack
					sx={{
						p: "2% 5%",
						flexWrap: "wrap",
						overflowX: "auto",
						justifyContent: "center",
					}}
					direction="row"
					bgcolor="#aaaaaa"
				>
					{empresas &&
						empresas.map((empresa, index) => (
							<EmpresaCard empresa={empresa} key={index} />
						))}
				</Stack>
			</Stack>
		</Box>
	);
};
