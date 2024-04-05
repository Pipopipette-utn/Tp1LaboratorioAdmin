import React, { FC, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Importar DeleteIcon desde @mui/icons-material

//type OnConfirmFunction = () => void;
export const DeleteConfirmationDialog: FC<{onConfirm: Function}> = ({ onConfirm }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const handleDeleteClick = () => {
    setMessage("La baja será lógica y no física, los datos son recuperables.");
    setTitle("¿Está seguro que desea eliminarlo?");
    setOpen(true);
  };

  const handleDeleteConfirmation = () => {
    onConfirm();
    setOpen(false);
  };

  const handleCloseConfirmation = () => {
    setOpen(false);
  };


  return (
    <>
      <Button
        onClick={handleDeleteClick}
        startIcon={<DeleteIcon />}
        variant="outlined"
      >
        Eliminar
      </Button>
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
    </>
  );
};
