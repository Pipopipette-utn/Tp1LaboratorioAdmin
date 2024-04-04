import React, { FC, useState } from "react";
import { Empresa } from "../../types/types";
import { Button, Collapse, Grid, Stack, Typography } from "@mui/material";
import { DeleteConfirmationDialog } from "../commons/deleteConfirmation";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link, useNavigate } from "react-router-dom";
import { EmpresaForm } from "../forms/EmpresaForm";

export const EmpresaList: FC<{ empresa: Empresa; setActualizar: Function }> = ({
	empresa,
	setActualizar,
}) => {
	const [expanded, setExpanded] = useState(false);
	const navigate = useNavigate();

	const [openModal, setOpenModal] = useState(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const handleDelete = () => {
		fetch(`http://localhost:8080/empresas/${empresa.id}`, {
			method: "DELETE",
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error al eliminar la empresa");
				}
				empresa.baja = true;
				console.log("Empresa eliminada correctamente: " + empresa.id);
				console.log("URL:" + ` http://localhost:8080/empresas/${empresa.id}`);
				setActualizar((prev: boolean) => !prev);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleAltaClick = () => {
		fetch(`http://localhost:8080/empresas/${empresa.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: empresa.id,
				denominacion: empresa.denominacion,
				telefono: empresa.telefono,
				horarioAtencion: empresa.horarioAtencion,
				quienesSomos: empresa.quienesSomos,
				domicilio: empresa.domicilio,
				email: empresa.email,
				latitud: empresa.latitud,
				longitud: empresa.longitud,
				baja: false,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error al actualizar el estado de la empresa");
				}
				setActualizar((prev: boolean) => !prev);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<Stack>
			<Stack key={empresa.id} style={{ marginTop: "20px" }} spacing={0.5}>
				<Typography variant="h6">{empresa.denominacion}</Typography>
				<Typography>{empresa.horarioAtencion}</Typography>
				<Collapse in={expanded} timeout="auto" unmountOnExit={true}>
					<Typography>{empresa.quienesSomos}</Typography>
				</Collapse>
				<Stack direction="row" spacing={1}>
					<Button
						variant="outlined"
						onClick={handleExpandClick}
						startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					>
						{expanded ? "Mostrar menos" : "Mostrar más"}
					</Button>
					{!empresa.baja && (
						<DeleteConfirmationDialog onConfirm={handleDelete} />
					)}
					{empresa.baja && (
						<Button
							onClick={handleAltaClick}
							variant="outlined"
							startIcon={<GroupAddIcon />}
						>
							Dar de alta
						</Button>
					)}
					<Button
						disabled={empresa.baja}
						onClick={handleOpen}
						variant="outlined"
						startIcon={<EditIcon />}
					>
						Modificar
					</Button>
					<Button
						disabled={empresa.baja}
						variant="contained"
						component={Link}
						to={{
							pathname: `/noticias/${empresa.id}`,
							search: `?empresa=${empresa.denominacion}`,
						}}
						startIcon={<RemoveRedEyeIcon />}
					>
						Ver noticias
					</Button>
				</Stack>
			</Stack>
			<EmpresaForm onClose={handleClose} open={openModal} empresa={empresa} />
		</Stack>
	);
};
