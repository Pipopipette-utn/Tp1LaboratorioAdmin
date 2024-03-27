import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto', // Para que el footer se adhiera al fondo
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2024 Portal de noticias. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
