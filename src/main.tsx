import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Empresa } from "./components/Empresa.tsx";
import { Noticia } from "./components/Noticia.tsx";
import Root from "./routes/root.tsx";
import { Navbar } from "./components/commons/Navbar.tsx";
import { Box } from "@mui/material";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
	},
	{
		path: "/empresas",
		element: <Empresa />,
	},
	{
		path: "/noticias",
		element: <Noticia />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Box width="100vw" sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
			<Navbar />
			<RouterProvider router={router} />
		</Box>
	</React.StrictMode>
);
