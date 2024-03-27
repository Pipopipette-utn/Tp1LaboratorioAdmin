import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const AppMenu = () => {
	return (
		<AppBar position="sticky">
			<Toolbar>
				<Typography variant="h6" component="a" sx={{ flexGrow: 1 }} href="/">
					Portal de noticias
				</Typography>
				<Button color="inherit" href="/empresas">
					Empresas
				</Button>
			</Toolbar>
		</AppBar>
	);
};
