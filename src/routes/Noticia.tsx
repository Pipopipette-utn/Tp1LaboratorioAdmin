import React, { useEffect, useState } from "react";
import NoticiaForm from "../components/NoticiaForm";

const Noticia = () => {
  const [noticias, setNoticias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`http://localhost:8080/noticias/empresa/${empresaId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNoticias(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [empresaId]);

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

  return (
    <div>
      <h2>Noticias de la Empresa</h2>
      <button onClick={handleFormToggle}>Agregar Noticia</button>
      {noticias.map((news) => (
        <div key={news.id}>
          <h3>{news.title}</h3>
          <p>{news.date}</p>
          <p>{news.body}</p>
          <button onClick={() => handleEditNews(news)}>Editar</button>
        </div>
      ))}
      {showForm && <NoticiaForm />}
    </div>
  );
};

export default Noticia;
