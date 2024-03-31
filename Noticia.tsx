import { useEffect, useState } from "react";
import NoticiaForm from '../components/NoticiaForm';

export const Noticia = () => {
    /*const [noticias, setNoticias] = useState([]);*/
    const [mostrarForm, setMostrarForm] = useState(false);

  /*
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
    */
  
   /* return (
      <div>
        <h2>Noticias de la Empresa</h2>

      </div>
    );
  };*/
const handleFormToggle = () => {
    setMostrarForm(!mostrarForm); // Cambia el estado de visibilidad del formulario al contrario del estado actual
  };

  return (
    <div>
      <h2>Noticia</h2>
      <button onClick={handleFormToggle}>Agregar Noticia</button>
      {/* Renderiza el formulario solo si mostrarForm es true */}
      {mostrarForm && <NoticiaForm />}
    </div>
  );
};

export default Noticia;

/*import React, { useState } from 'react';
import NewsForm from './NewsForm'; // Importa el componente del formulario

const Noticia = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null); // Estado para almacenar la noticia seleccionada para modificar

  const handleFormToggle = () => {
    setShowForm(!showForm); // Cambia el estado de visibilidad del formulario al contrario del estado actual
    // Si el formulario se está abriendo, pasa los datos de la noticia seleccionada al formulario
    if (!showForm && selectedNews) {
      setFormData(selectedNews);
    }
  };

  const setFormData = (news: any) => {
    // Establece los datos de la noticia en el estado del formulario
    // Puedes definir una función similar en tu componente NewsForm
    // para actualizar los estados de los campos del formulario
    // con los datos de la noticia seleccionada
  };

  const handleEditNews = (news: any) => {
    setSelectedNews(news); // Almacena la noticia seleccionada para modificar
    setShowForm(true); // Muestra el formulario cuando se selecciona una noticia para editar
  };

  return (
    <div>
      <h2>Noticia</h2>
      {/* Botón para abrir el formulario */}
      <button onClick={handleFormToggle}>Agregar Noticia</button>
      {/* Botón para editar la noticia */}
      <button onClick={() => handleEditNews(selectedNews)}>Modificar Noticia</button>
      {/* Renderiza el formulario solo si showForm es true */}
      {showForm && <NewsForm />}
    </div>
  );
};

export default Noticia;

*/