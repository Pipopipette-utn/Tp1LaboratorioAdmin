import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';

const NoticiaForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ title, date, image, caption, body });
  };

  const handleCancel = () => {
    console.log('Cancelado');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Crear Noticia
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
            <TextField
              label="Cuerpo de la Noticia"
              fullWidth
              multiline
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary">
              Guardar
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
