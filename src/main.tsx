import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Empresa } from "./routes/Empresa";
import { Noticia } from "./routes/Noticia";
import { AppMenu } from "./components/commons/AppMenu";
import { Home } from "./routes/Home";
import { Box } from "@mui/material";

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
		path: "/noticias",
		element: <Noticia />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Box width="100vw" height="100vh">
			<AppMenu />
			<RouterProvider router={router} />
		</Box>
	</React.StrictMode>
);
