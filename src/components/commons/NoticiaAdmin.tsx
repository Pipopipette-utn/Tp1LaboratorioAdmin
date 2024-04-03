import React, { useState, useEffect } from 'react';
import { Button, Typography, Container } from '@material-ui/core';
import NewsForm from './NewsForm';

const NewsAdmin = () => {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [editingNews, setEditingNews] = useState<any>(null);

  useEffect(() => {
    // Aquí puedes cargar las noticias desde tu API al montar el componente
    // Ejemplo de carga de noticias ficticias:
    setNewsList([
      { id: 1, title: 'Noticia 1', date: '2024-03-01', image: '', caption: 'Caption 1', body: '<p>Contenido de la noticia 1</p>' },
      { id: 2, title: 'Noticia 2', date: '2024-03-05', image: '', caption: 'Caption 2', body: '<p>Contenido de la noticia 2</p>' },
    ]);
  }, []);

  const handleEdit = (news: any) => {
    setEditingNews(news);
  };

  const handleDelete = (id: number) => {
    // Aquí puedes implementar la lógica para eliminar la noticia con el ID proporcionado
    setNewsList(newsList.filter((news) => news.id !== id));
  };

  const handleFormSubmit = (formData: any) => {
    if (editingNews) {
      // Aquí puedes implementar la lógica para actualizar la noticia existente
      const updatedNewsList = newsList.map((news) => (news.id === editingNews.id ? { ...news, ...formData } : news));
      setNewsList(updatedNewsList);
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
            <Typography variant="h6">{news.title}</Typography>
            <Button variant="outlined" onClick={() => handleEdit(news)}>Editar</Button>
            <Button variant="outlined" onClick={() => handleDelete(news.id)}>Eliminar</Button>
          </div>
        ))}
      </div>
      {editingNews && <NewsForm onSubmit={handleFormSubmit} newsToEdit={editingNews} />}
    </Container>
  );
};

export default NewsAdmin;
