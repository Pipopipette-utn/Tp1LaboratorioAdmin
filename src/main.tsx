import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Empresa } from "./routes/Empresa";
import { Admin } from "./routes/Admin";
import { Noticia } from "./routes/Noticia";
import { AppMenu } from "./components/commons/AppMenu";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Admin />,
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
		<div className="d-flex flex-column">
			<div>
				<AppMenu />
			</div>
			<div className="flex-grow-1" style={{alignContent:"start"}}>
				<RouterProvider router={router} />
			</div>
		</div>
	</React.StrictMode>
);
