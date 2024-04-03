import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

//type OnConfirmFunction = () => void;
export const DeleteConfirmationDialog = ({ onConfirm }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [secondConfirmationOpen, setSecondConfirmationOpen] = useState(false);

  const handleDeleteClick = () => {
    setMessage("Esta acción no se puede deshacer.");
    setTitle("¿Está seguro que desea eliminarlo?");
    setOpen(true);
  };

  const handleDeleteConfirmation = () => {
    setMessage("No hay vuelta atrás, no se podrá recuperar la información.");
    setTitle("¿Seguro segurísimo?");
    setSecondConfirmationOpen(true); // Abre el segundo diálogo de confirmación
    setOpen(false);
  };

  const handleCloseConfirmation = () => {
    setOpen(false);
  };

  const handleSecondDeleteConfirmation = () => {
    // Lógica para confirmar la eliminación
    onConfirm();
    setSecondConfirmationOpen(false);
  };

  const handleCloseSecondConfirmation = () => {
    setSecondConfirmationOpen(false);
  };

  return (
    <>
      <Button onClick={handleDeleteClick}>Eliminar</Button>
      <Dialog open={open} onClose={handleCloseConfirmation}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmation} color="primary">
            Sí
          </Button>
          <Button onClick={handleCloseConfirmation} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={secondConfirmationOpen}
        onClose={handleCloseSecondConfirmation}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSecondDeleteConfirmation} color="primary">
            Sí
          </Button>
          <Button onClick={handleCloseSecondConfirmation} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
