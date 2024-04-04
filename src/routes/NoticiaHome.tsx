import { useEffect, useState } from "react";
import NoticiaForm from "../components/NoticiaForm";
import { Noticia } from "../types/types";
import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { DeleteConfirmationDialog } from "../components/commons/deleteConfirmation";
import { NoticiaList } from "../components/lists/ListNoticias";

export const NoticiaHome = () => {
	const [actualizar, setActualizar] = useState(false);
	const [mostrarBajas, setMostrarBajas] = useState(false);

	const [error, setError] = useState("");
	const [noticias, setNoticias] = useState<Noticia[]>();
	const [showForm, setShowForm] = useState(false);
	const [selectedNews, setSelectedNews] = useState(null);

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

	const handleFormToggle = () => {
		setShowForm(!showForm);
		if (!showForm && selectedNews) {
			//setFormData(selectedNews);
		}
	};
	/*
	const setFormData = (news) => {
		// Aquí puedes establecer los datos de la noticia seleccionada en el formulario
	};

	const handleEditNews = (news) => {
		setSelectedNews(news);
		setShowForm(true);
	};
*/
	const [newsList, setNewsList] = useState<Noticia[]>([]);
	const [editingNews, setEditingNews] = useState<Noticia | null>();

	const handleEdit = (news: Noticia) => {
		setEditingNews(news);
	};

	const handleFormSubmit = (formData: Noticia) => {
		if (editingNews) {
			// Aquí puedes implementar la lógica para actualizar la noticia existente
			const upfechaPublicaciondNewsList = newsList.map((news) =>
				news.id === editingNews.id ? { ...news, ...formData } : news
			);
			setNewsList(upfechaPublicaciondNewsList);
			setEditingNews(null);
		} else {
			// Aquí puedes implementar la lógica para crear una nueva noticia
			//const newNews = { id: newsList.length + 1, ...formData };
			//setNewsList([...newsList, newNews]);
		}
	};

	return (
		<Box padding={3}>
			<Typography fontWeight="bold" variant="h4" gutterBottom>
				Noticias de {empresa}
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
									handleEdit={handleEdit}
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
			{editingNews && (
				<NoticiaForm onSubmit={handleFormSubmit} newsToEdit={editingNews} />
			)}
		</Box>
	);
};
