import React, { useState } from "react";
import { Button, TextField, Typography, Container, Grid } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { Noticia } from "../types/types";
//import { useHistory } from "react-router-dom";

const NoticiaForm = ({
  onSubmit,
  newsToEdit,
}: {
  onSubmit: any;
  newsToEdit?: Noticia;
}) => {
  const [titulo, setTitulo] = useState(newsToEdit ? newsToEdit.titulo : "");
  const [fechaPublicacion, setFechaPublicacion] = useState(
    newsToEdit ? newsToEdit.fechaPublicacion : ""
  );
  const [imagen, setImagen] = useState(newsToEdit ? newsToEdit.imagen : "");
  const [resumen, setResumen] = useState(newsToEdit ? newsToEdit.resumen : "");
  const [cuerpo, setCuerpo] = useState(
    newsToEdit ? newsToEdit.contenidoHTML : ""
  );

  const history = useHistory();

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

  const handleCancel = () => {
    onCancel();
    history.goBack(); // Regresar a la página anterior
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        {newsToEdit ? "Modificar Noticia" : "Crear Noticia"}
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
            <input type="file" accept="image/*" onChange={handleImageChange} />
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
            <Button type="submit" variant="contained" color="primary">
              {newsToEdit ? "Guardar Cambios" : "Crear Noticia"}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={handleCancel}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default NoticiaForm;
