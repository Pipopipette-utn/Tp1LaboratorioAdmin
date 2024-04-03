import React, { useEffect, useState } from "react";
import NoticiaForm from "../components/NoticiaForm";
import { Empresa, Noticia } from "../types/types";
import { Button, Container, Typography } from "@mui/material";

const Noticia = (empresa: Empresa) => {
	const [noticias, setNoticias] = useState<Noticia[]>();
	const [showForm, setShowForm] = useState(false);
	const [selectedNews, setSelectedNews] = useState(null);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/noticias/empresa/${empresa.id}`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setNoticias(data);
			} catch (error) {
				console.error("Error fetching news:", error);
			}
		};

		fetchNews();
	}, [empresa]);

	const handleFormToggle = () => {
		setShowForm(!showForm);
		if (!showForm && selectedNews) {
			setFormData(selectedNews);
		}
	};

	const setFormData = (news) => {
		// Aquí puedes establecer los datos de la noticia seleccionada en el formulario
	};

	const handleEditNews = (news) => {
		setSelectedNews(news);
		setShowForm(true);
	};

	const [newsList, setNewsList] = useState<Noticia[]>([]);
	const [editingNews, setEditingNews] = useState<Noticia | null>();

	useEffect(() => {
		// Aquí puedes cargar las noticias desde tu API al montar el componente
		// Ejemplo de carga de noticias ficticias:
		setNewsList([
			{
				id: 1,
				titulo: "Noticia 1",
				publicada: "Y",
				baja: false,
				fechaPublicacion: new Date(),
				imagen: "",
				resumen: "resumen 1",
				contenidoHTML: "<p>Contenido de la noticia 1</p>",
			},
			{
				id: 2,
				titulo: "Noticia 2",
				publicada: "Y",
				baja: false,
				fechaPublicacion: new Date(),
				imagen: "",
				resumen: "resumen 2",
				contenidoHTML: "<p>Contenido de la noticia 2</p>",
			},
		]);
	}, []);

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
			const newNews = { id: newsList.length + 1, ...formData };
			setNewsList([...newsList, newNews]);
		}
	};

	return (
		<Container maxWidth="md">
			<Typography variant="h4" align="center" gutterBottom>
				Noticias de la empresa
			</Typography>
			<Button
				variant="contained"
				color="primary"
				onClick={() => setEditingNews(null)}
			>
				Crear Nueva Noticia
			</Button>
			<div>
				{newsList.map((news) => (
					<div key={news.id}>
						<Typography variant="h6">{news.titulo}</Typography>
						<Button variant="outlined" onClick={() => handleEdit(news)}>
							Editar
						</Button>
						<Button variant="outlined" onClick={() => handleDelete(news.id)}>
							Eliminar
						</Button>
					</div>
				))}
			</div>
			{editingNews && (
				<NoticiaForm onSubmit={handleFormSubmit} newsToEdit={editingNews} />
			)}
		</Container>
	);
};

export default Noticia;
