import { FC, useState } from "react";
import { Noticia } from "../../types/types";
import { Button, Chip, Collapse, Stack, Typography } from "@mui/material";
import { DeleteConfirmationDialog } from "../commons/deleteConfirmation";
import EditIcon from "@mui/icons-material/Edit";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import parse from "html-react-parser";
import NoticiaForm from "../forms/NoticiaForm";

export const NoticiaList: FC<{ noticia: Noticia; setActualizar: Function }> = ({
	noticia,
	setActualizar,
}) => {
	const [expanded, setExpanded] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleDelete = () => {
		fetch(`http://localhost:8080/noticias/${noticia.id}`, {
			method: "DELETE",
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error al eliminar la noticia");
				}
				noticia.baja = true;
				console.log("Noticia eliminada correctamente: " + noticia.id);
				console.log("URL:" + ` http://localhost:8080/empresas/${noticia.id}`);
				setActualizar((prev: boolean) => !prev);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleAltaClick = () => {
		fetch(`http://localhost:8080/noticias/${noticia.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...noticia,
				imagen: `data:image/webp;base64,${noticia.imagenCodigo}`,
				baja: false,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error al actualizar el estado de la noticia");
				}
				setActualizar((prev: boolean) => !prev);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<Stack
			direction="row"
			maxWidth="lg"
			key={noticia.id}
			spacing={1}
			sx={{
				p: 2,
				borderRadius: "10px",
				border: "solid 2px",
				borderColor: noticia.baja ? "gray" : "#000",
				boxShadow: "5px 5px 10px rgba(0,0,0,0.5)",
			}}
			justifyContent="space-between"
			alignItems="center"
		>
			<Stack spacing={0.5}>
				<Stack direction="row" spacing={2}>
					<Typography variant="h5">{noticia.titulo}</Typography>
					<Chip
						label={noticia.publicada === "Y" ? "Publicada" : "No publicada"}
						variant={noticia.publicada === "Y" ? "filled" : "outlined"}
					/>
				</Stack>

				<Typography color="gray">
					{new Intl.DateTimeFormat("es-ES").format(
						new Date(noticia.fechaPublicacion)
					)}
				</Typography>
				<Typography>{noticia.resumen}</Typography>
				<Collapse in={expanded} timeout="auto" unmountOnExit={true}>
					{parse(noticia.contenidoHTML)}
				</Collapse>
				<Stack direction="row" spacing={2}>
					<Button
						onClick={handleExpandClick}
						variant="outlined"
						startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					>
						{expanded ? "Mostrar menos" : "Mostrar más"}
					</Button>
					<Button
						variant="outlined"
						onClick={handleOpen}
						startIcon={<EditIcon />}
						disabled={noticia.baja}
					>
						Editar
					</Button>
					{!noticia.baja && (
						<DeleteConfirmationDialog onConfirm={handleDelete} />
					)}
					{noticia.baja && (
						<Button
							onClick={handleAltaClick}
							variant="outlined"
							startIcon={<GroupAddIcon />}
						>
							Dar de alta
						</Button>
					)}
				</Stack>
				<NoticiaForm
					open={openModal}
					noticia={noticia}
					onClose={handleClose}
					idEmpresa={noticia.empresa!.id ? noticia.empresa!.id : 0}
					setActualizar={setActualizar}
				/>
			</Stack>
			{noticia.imagenCodigo && (
				<img
					src={`data:image/jpeg;base64,${noticia.imagenCodigo}`}
					alt="Noticia"
					style={{
						border: "3px solid #1976D2", 
						borderRadius: "10px",
						maxWidth: "20%",
						maxHeight: "100%",
					}}
				/>
			)}
		</Stack>
	);
};
