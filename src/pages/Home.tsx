import { Box, Card, CardActionArea, CardContent, Container, Paper, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Home() {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("Contexto fudeu");
  const { user } = authContext;
  return (
    <>
      <Container sx={{ textAlign: "center" }}>
        <Typography fontWeight="regular" variant="h3">
          Bem vindo ao sistema da SARsCamp {user} !
        </Typography>
      </Container>
      <Box 
        margin="20%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >

          <Stack direction="row" spacing={2}>
          <Card sx={{ maxWidth: 345 }} >
            <CardActionArea component={RouterLink} to="/cardapio">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Cardápio
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345 }} >
            <CardActionArea component={RouterLink} to="/item">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Achados & Perdidos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Stack>
      </Box>
    </>
  );
}
