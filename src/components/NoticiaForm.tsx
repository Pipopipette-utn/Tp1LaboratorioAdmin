import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react'; // Importar el componente Editor de TinyMCE

const NoticiaForm = ({ onSubmit, newsToEdit }: { onSubmit: any; newsToEdit?: any }) => {
  const [title, setTitle] = useState(newsToEdit ? newsToEdit.title : '');
  const [date, setDate] = useState(newsToEdit ? newsToEdit.date : '');
  const [image, setImage] = useState(newsToEdit ? newsToEdit.image : '');
  const [caption, setCaption] = useState(newsToEdit ? newsToEdit.caption : '');
  const [body, setBody] = useState(newsToEdit ? newsToEdit.body : '');

  const handleEditorChange = (content: string, editor: any) => {
    setBody(content);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ title, date, image, caption, body });
  };

  const handleCancel = () => {
    // Agregar lógica para cancelar
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        {newsToEdit ? 'Modificar Noticia' : 'Crear Noticia'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Título"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fecha de Publicación"
              fullWidth
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="URL de la Imagen"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Epígrafe de la Imagen"
              fullWidth
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Editor
              apiKey="tu-api-key-de-tinymce"
              initialValue={body}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help',
              }}
              onEditorChange={handleEditorChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary">
              {newsToEdit ? 'Guardar Cambios' : 'Crear Noticia'}
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
