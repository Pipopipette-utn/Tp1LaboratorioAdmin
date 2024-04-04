import React, { useEffect, useState } from "react";
import {
	Button,
	TextField,
	Typography,
	Grid,
	Modal,
	Stack,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { Empresa, Noticia } from "../../types/types";

const getEmpresa = (id: number): Empresa | undefined => {
	const [empresa, setEmpresa] = useState<Empresa | undefined>(undefined);

	useEffect(() => {
		const fetchEmpresas = async () => {
			try {
				const response = await fetch(`http://localhost:8080/empresas/${id}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const empresa = await response.json();
				setEmpresa(empresa);
			} catch (error) {
				console.error("Error fetching news:", error);
			}
		};

		fetchEmpresas();
	}, [id]);

	return empresa;
};

const NoticiaForm = ({
	open,
	onClose,
	noticia,
	idEmpresa,
	setActualizar,
}: {
	open: boolean;
	onClose: () => void;
	noticia: Noticia;
	idEmpresa: number;
	setActualizar: Function;
}) => {
	const [titulo, setTitulo] = useState(noticia.titulo);
	const [fechaPublicacion] = useState(noticia.fechaPublicacion);
	const [imagen, setImagen] = useState<string | null>(
		noticia.imagenCodigo ? `data:image/webp;base64,${noticia.imagenCodigo}` : null
	);
	const [resumen, setResumen] = useState(noticia.resumen);
	const [cuerpo, setCuerpo] = useState(noticia.contenidoHTML);

	const empresa = getEmpresa(idEmpresa);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileReader = new FileReader();
		fileReader.onload = (e) => {
			if (e.target?.result) {
				setImagen(e.target.result.toString());
			}
		};
		if (e.target.files && e.target.files.length > 0) {
			fileReader.readAsDataURL(e.target.files[0]);
		}
	};

	const handleEditorChange = (content: string) => {
		setCuerpo(content);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (noticia.id)
			handleEditNoticia({
				id: noticia.id,
				titulo,
				fechaPublicacion,
				imagen,
				resumen,
				baja: false,
				contenidoHTML: cuerpo,
				publicada: "Y",
				empresa,
			});
		else
			handleAddNoticia({
				titulo,
				fechaPublicacion: new Date(),
				imagen,
				resumen,
				baja: false,
				contenidoHTML: cuerpo,
				publicada: "Y",
				empresa,
			});
	};

	const handleAddNoticia = (noticiaData: Noticia) => {
		console.log("Datos de la nueva noticia:", JSON.stringify(noticiaData));

		fetch("http://localhost:8080/noticias", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(noticiaData),
		})
			.then((response) => {
				console.log(response);
				if (response.ok) {
					console.log("La empresa se agregó correctamente");
					onClose();
					alert("Noticia agregada con éxito");
					setActualizar((prev: boolean) => !prev);
				} else {
					console.error("Error al agregar la empresa:", response.statusText);
					alert("Error");
				}
			})
			.catch((error) => {
				console.error("Error en la solicitud:", error);
			});
	};

	const handleEditNoticia = (noticiaData: Noticia) => {
		console.log("Datos de la noticia editada:", noticiaData);

		fetch(`http://localhost:8080/noticias/${noticia.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(noticiaData),
		})
			.then((response) => {
				if (response.ok) {
					onClose();
					alert("Noticia editada con éxito");
					console.log("La noticia se editó correctamente");
					setActualizar((prev: boolean) => !prev);
				} else {
					console.error("Error al agregar la noticia:", response.statusText);
					alert("Error");
				}
			})
			.catch((error) => {
				console.error("Error en la solicitud:", error);
			});
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
					{noticia.id ? "Modificar Noticia" : "Crear Noticia"}
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
							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Resumen de la noticia"
								fullWidth
								value={resumen}
								onChange={(e) => setResumen(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Editor
								apiKey="s5imujsdbn5t6mfpg48gdbi7ze3nvqtowq6jx832mxixauvn"
								value={cuerpo}
								init={{
									directionality: "ltr",
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
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
							>
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
