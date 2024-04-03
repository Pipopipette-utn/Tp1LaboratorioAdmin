import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Empresa } from "./routes/Empresa";
import { NoticiaHome } from "./routes/NoticiaHome";
import { AppMenu } from "./components/commons/AppMenu";
import { Home } from "./routes/Home";
import { Box } from "@mui/material";
import Footer from "./components/commons/Footer";
import { NuevaEmpresa } from "./routes/NuevaEmpresa";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/empresas",
    element: <Empresa />,
  },
  {
    path: "/noticias/:idEmpresa",
    element: <NoticiaHome />,
  },
  {
    path: "/empresas/registro",
    element: <NuevaEmpresa />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Box width="100vw">
      <AppMenu />
      <Box minHeight="100vh" padding={3}>
        <RouterProvider router={router} />
      </Box>
      <Footer />
    </Box>
  </React.StrictMode>
);
