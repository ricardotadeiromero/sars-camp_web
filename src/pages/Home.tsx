import { Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function Home() {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("Contexto fudeu");
  const { user } = authContext;
  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography fontWeight="regular" variant="h3">
        Bem vindo ao sistema da SARsCamp {user} !
      </Typography>
    </Container>
  );
}
