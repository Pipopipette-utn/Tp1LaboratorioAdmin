import { Empresa } from "../types/types";
import { FC } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";

export const EmpresaCard: FC<{ empresa: Empresa }> = ({ empresa }) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<div style={{ height: 140, position: "relative", overflow: "hidden" }}>
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
					Lizard
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Lizards are a widespread group of squamate reptiles, with over 6,000
					species, ranging across all continents except Antarctica
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Share</Button>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
};
/*
		<Card style={{ width: "30rem", position: "relative"}}>
			<div style={{ height: "180px", width: "100%" }}>
				
			</div>
			<Card.Body>
				<Card.Title>{empresa.denominacion}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">
					{empresa.email}
				</Card.Subtitle>
				<Card.Text>{empresa.quienesSomos}</Card.Text>
				<Card.Link href="#">Card Link</Card.Link>
				<Card.Link href="#">Another Link</Card.Link>
			</Card.Body>
		</Card>
	);
};
*/
