import { useEffect, useState } from "react";
import { Empresa } from "../types/types";
import { EmpresaCard } from "../components/EmpresaCard";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEmpresa } from "../hooks/useEmpresa";

export const Home = () => {
  const empresas = useEmpresa();
  return (
    <Box height="100%" justifyContent="center">
      <Box height="400px">
        <div
          style={{
            backgroundImage: `url('../../public/main.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: "bold",
              color: "white",
              textShadow: "3px 3px 3px black",
              textAlign: "center",
            }}
            variant="h3"
          >
            Bienvenido al administrador del portal de noticias
          </Typography>
          <Button
            href="/empresas/registro"
            color="primary"
            aria-label="add"
            variant="contained"
            sx={{
              position: "absolute",
              bottom: "30%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            size="large"
          >
            <AddIcon /> Crear Empresa
          </Button>
        </div>
      </Box>

      <Stack sx={{ mb: "5%" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            pt: "5%",
            pb: "2%",
            px: "5%",
            textAlign: "center",
          }}
        >
          Nuestras empresas
        </Typography>
        <Stack
          sx={{
            p: "2% 5%",
            flexWrap: "wrap",
            overflowX: "auto",
            justifyContent: "center",
          }}
          direction="row"
          bgcolor="#aaaaaa"
        >
          {empresas &&
            empresas.map((empresa, index) => (
              <EmpresaCard empresa={empresa} key={index} />
            ))}
        </Stack>
      </Stack>
    </Box>
  );
};
