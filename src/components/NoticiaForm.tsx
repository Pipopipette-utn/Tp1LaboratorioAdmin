import React, { useState } from "react";
import {
	Button,
	TextField,
	Typography,
	Grid,
	Modal,
	Stack,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { Noticia } from "../types/types";

const NoticiaForm = ({
	open,
	onClose,
	onSubmit,
	noticia,
}: {
	open: boolean;
	onClose: () => void;
	onSubmit: Function;
	noticia: Noticia;
}) => {
	const [titulo, setTitulo] = useState(noticia.titulo);
	const [fechaPublicacion, setFechaPublicacion] = useState(
		noticia.fechaPublicacion
	);
	const [imagen, setImagen] = useState(noticia.imagen);
	const [resumen, setResumen] = useState(noticia.resumen);
	const [cuerpo, setCuerpo] = useState(noticia.contenidoHTML);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files[0];
		if (file) {
			// Convertir la imagen a una cadena (string)
			const reader = new FileReader();
			reader.onload = (event) => {
				const dataUrl = event.target.result;
				setImagen(dataUrl as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleEditorChange = (content: string, editor: any) => {
		setCuerpo(content);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit({ titulo, fechaPublicacion, imagen, resumen, cuerpo });
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Stack
				sx={{
					backgroundColor: "white",
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: "90%",
					height: "90%",
					border: "2px solid #000",
					boxShadow: 24,
					p: 4,
					overflowY: "auto",
					scrollbarWidth: "thin",
					scrollbarColor:
						"rgba(0, 0, 0, 0.5) rgba(255, 255, 255, 0.5)" /* thumb track */,
				}}
			>
				<Typography variant="h4" align="center" gutterBottom>
					{noticia ? "Modificar Noticia" : "Crear Noticia"}
				</Typography>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="Título"
								fullWidth
								value={titulo}
								onChange={(e) => setTitulo(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Fecha de Publicación"
								fullWidth
								type="fechaPublicacion"
								value={fechaPublicacion}
								onChange={(e) => setFechaPublicacion(e.target.value)}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Epígrafe de la imagen"
								fullWidth
								value={resumen}
								onChange={(e) => setResumen(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Editor
								apiKey="s5imujsdbn5t6mfpg48gdbi7ze3nvqtowq6jx832mxixauvn"
								initialValue={cuerpo}
								init={{
									directionality: "ltr", // Forzar la dirección del texto a izquierda a derecha (LTR)
									height: 500,
									menubar: false,
									plugins: [
										"advlist autolink lists link imagen charmap print preview anchor",
										"searchreplace visualblocks code fullscreen",
										"insertfechaPublicaciontime media table paste code help wordcount",
									],
									toolbar:
										"undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help",
								}}
								onEditorChange={handleEditorChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<Button fullWidth type="submit" variant="contained" color="primary">
								{noticia ? "Guardar Cambios" : "Crear Noticia"}
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button fullWidth variant="contained" onClick={onClose}>
								Cancelar
							</Button>
						</Grid>
					</Grid>
				</form>
			</Stack>
		</Modal>
	);
};

export default NoticiaForm;
