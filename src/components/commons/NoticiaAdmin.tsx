import React, { useState, useEffect } from 'react';
import { Button, Typography, Container } from '@mui/material';
import NoticiaForm from '../NoticiaForm';
import { Noticia } from '../../types/types';

const NoticiaAdmin = () => {
  const [newsList, setNewsList] = useState<Noticia[]>([]);
  const [editingNews, setEditingNews] = useState<Noticia |null>();

  useEffect(() => {
    // Aquí puedes cargar las noticias desde tu API al montar el componente
    // Ejemplo de carga de noticias ficticias:
    setNewsList([
      { id: 1, titulo: 'Noticia 1',publicada: 'Y',baja: false, fechaPublicacion: new Date(), imagen: '', resumen: 'resumen 1', contenidoHTML: '<p>Contenido de la noticia 1</p>' },
      { id: 2, titulo: 'Noticia 2',publicada: 'Y', baja: false, fechaPublicacion: new Date(), imagen: '', resumen: 'resumen 2', contenidoHTML: '<p>Contenido de la noticia 2</p>' },
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
      const upfechaPublicaciondNewsList = newsList.map((news) => (news.id === editingNews.id ? { ...news, ...formData } : news));
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
        Administrar Noticias
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setEditingNews(null)}>
        Crear Nueva Noticia
      </Button>
      <div>
        {newsList.map((news) => (
          <div key={news.id}>
            <Typography variant="h6">{news.titulo}</Typography>
            <Button variant="outlined" onClick={() => handleEdit(news)}>Editar</Button>
            <Button variant="outlined" onClick={() => handleDelete(news.id)}>Eliminar</Button>
          </div>
        ))}
      </div>
      {editingNews && <NoticiaForm onSubmit={handleFormSubmit} newsToEdit={editingNews} />}
    </Container>
  );
};

export default NoticiaAdmin;
