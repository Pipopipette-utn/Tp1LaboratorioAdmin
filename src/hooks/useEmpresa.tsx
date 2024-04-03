import { useState, useEffect } from "react";
import { Empresa } from "../types/types";

export const useEmpresa = (actualizar: boolean) => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    console.log("entre");
    const fetchEmpresas = async () => {
      try {
        const response = await fetch(`http://localhost:8080/empresas`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmpresas(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchEmpresas();
  }, [actualizar]);

  return empresas;
};
