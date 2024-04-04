import { Empresa } from "../types/types";
import { FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

export const EmpresaCard: FC<{ empresa: Empresa }> = ({ empresa }) => {
	return (
		<Stack sx={{ p: "10px" }}>
			<Card sx={{ width: 280, minHeight: "430px" }}>
				<div
					style={{ minHeight: 180, position: "relative", overflow: "hidden" }}
				>
					<iframe
						title="Map"
						src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11270.125646913215!2d${empresa.longitud}!3d${empresa.latitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1615335513448!5m2!1ses-419!2sar&q=${empresa.longitud},${empresa.latitud}`}
						width="100%"
						height="100%"
						loading="lazy"
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
						}}
					></iframe>
				</div>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{empresa.denominacion}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{empresa.email}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						style={{
							overflowY: "auto",
							maxHeight: "100px",
							padding: 8,
							scrollbarWidth: "thin" /* Para navegadores que no son webkit */,
							scrollbarColor:
								"rgba(0, 0, 0, 0.5) rgba(255, 255, 255, 0.5)" /* thumb track */,
						}}
					>
						{empresa.quienesSomos}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						variant="contained"
						size="small"
						component={Link}
						to={{
							pathname: `/noticias/${empresa.id}`,
							search: `?empresa=${empresa.denominacion}`,
						}}
					>
						Ver más
					</Button>
					<Button
						variant="contained"
						size="small"
						component={Link}
						to={{
							pathname: `/noticias/${empresa.id}`,
							search: `?empresa=${empresa.denominacion}`,
						}}
					>
						Ver noticias
					</Button>
				</CardActions>
			</Card>
		</Stack>
	);
};
