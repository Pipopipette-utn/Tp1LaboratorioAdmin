import { useEffect, useState } from "react";

export const Noticia = () => {
    const [noticias, setNoticias] = useState([]);
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
  
    return (
      <div>
        <h2>Noticias de la Empresa</h2>
      </div>
    );
  };