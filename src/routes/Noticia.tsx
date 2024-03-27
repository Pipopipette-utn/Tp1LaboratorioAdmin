import { useEffect, useState } from "react";
import NoticiaForm from '../components/NoticiaForm';

export const Noticia = () => {
   /* const [noticias, setNoticias] = useState([]);*/
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