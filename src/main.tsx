import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EmpresaHome } from "./routes/EmpresaHome";
import { NoticiaHome } from "./routes/NoticiaHome";
import { AppMenu } from "./components/commons/AppMenu";
import { Home } from "./routes/Home";
import { Box } from "@mui/material";
import Footer from "./components/commons/Footer";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/empresas",
		element: <EmpresaHome />,
	},
	{
		path: "/noticias/:idEmpresa",
		element: <NoticiaHome />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Box width="100vw" minHeight="100vh">
			<AppMenu />
			<Box minHeight="100vh">
				<RouterProvider router={router} />
			</Box>
			<Footer />
		</Box>
	</React.StrictMode>
);
