import { useEffect, useState } from "react";
import NoticiaForm from "../components/NoticiaForm";
import { Noticia } from "../types/types";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const NoticiaHome = () => {
	const [noticias, setNoticias] = useState<Noticia[]>();
	const [showForm, setShowForm] = useState(false);
	const [selectedNews, setSelectedNews] = useState(null);
	const { idEmpresa } = useParams<{ idEmpresa: string }>();

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/noticias/empresa/${idEmpresa}`
				);
				if (!response.ok) {
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
	}, [idEmpresa]);

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

	const handleDelete = (id: number) => {
		// Aquí puedes implementar la lógica para eliminar la noticia con el ID proporcionado
		setNewsList(newsList.filter((news) => news.id !== id));
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
		<Stack maxWidth="md" spacing="">
			<Typography fontWeight="bold" variant="h4" gutterBottom>
				Noticias de {noticias && noticias![0].empresa?.denominacion}
			</Typography>
			<Button
				sx={{minWidth: "auto"}}
				variant="contained"
				color="primary"
				onClick={() => setEditingNews(null)}
			>
				Crear Nueva Noticia
			</Button>
			<div>
				{noticias &&
					noticias.map((noticia) => {
						if (!noticia.baja)
							return (
								<div key={noticia.id}>
									<Typography variant="h6">{noticia.titulo}</Typography>
									<Button
										variant="outlined"
										onClick={() => handleEdit(noticia)}
									>
										Editar
									</Button>
									<Button
										variant="outlined"
										onClick={() => handleDelete(noticia.id)}
									>
										Eliminar
									</Button>
								</div>
							);
					})}
			</div>
			{editingNews && (
				<NoticiaForm onSubmit={handleFormSubmit} newsToEdit={editingNews} />
			)}
		</Stack>
	);
};
