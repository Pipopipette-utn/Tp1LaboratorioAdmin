import { useEffect, useState } from "react";
import { Noticia, emptyNoticia } from "../types/types";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import { NoticiaList } from "../components/lists/ListNoticias";
import NoticiaForm from "../components/forms/NoticiaForm";

export const NoticiaHome = () => {
	const [actualizar, setActualizar] = useState(false);
	const [mostrarBajas, setMostrarBajas] = useState(false);

	const [error, setError] = useState("");
	const [noticias, setNoticias] = useState<Noticia[]>();

	const [openModal, setOpenModal] = useState(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

	const { idEmpresa } = useParams<{ idEmpresa: string }>();
	const empresa = new URLSearchParams(location.search).get("empresa");

	const handleMostrarBajasClick = () => {
		setMostrarBajas(!mostrarBajas);
	};

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/noticias/empresa/${idEmpresa}`
				);
				if (!response.ok) {
					if (response.status === 404)
						setError("No hay noticias para mostrar aún.");
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				console.log(data.content);
				setNoticias(data.content);
			} catch (error) {
				console.error("Error fetching news:", error);
			}
		};

		fetchNews();
	}, [actualizar]);

	return (
		<Box padding={3}>
			<Typography fontWeight="bold" variant="h4" gutterBottom>
				Noticias de {empresa ? empresa : noticias && noticias[0].empresa?.denominacion}
			</Typography>
			<Stack spacing={3}>
				{noticias &&
					noticias.map((noticia, index) => {
						if (mostrarBajas || !noticia.baja)
							return (
								<NoticiaList
									key={index}
									noticia={noticia}
									setActualizar={setActualizar}
								/>
							);
					})}
				{error && <Typography fontWeight="bold">{error}</Typography>}
			</Stack>
			{!error && (
				<Button
					onClick={handleMostrarBajasClick}
					variant="outlined"
					style={{ marginTop: "16px" }}
				>
					{mostrarBajas
						? "Ocultar noticias dadas de baja"
						: "Mostrar noticias dadas de baja"}
				</Button>
			)}
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
					Crear nueva noticia
				</Button>
			</Stack>
			<NoticiaForm
				onClose={handleClose}
				open={openModal}
				noticia={emptyNoticia}
				idEmpresa={parseInt(idEmpresa!)}
				setActualizar={setActualizar}
			/>
		</Box>
	);
};
