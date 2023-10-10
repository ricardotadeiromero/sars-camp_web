import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import loginImage from "../assets/login.png"; // Importe a imagem aqui
import { useForm } from "react-hook-form";
import { Aluno } from "../model/Aluno";
import { AuthContext } from "../context/auth";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<Aluno>();

  function onSubmit(aluno:Aluno){
    login(aluno);
  }
  return (
    <Grid
      container
      sx={{
        my: -4,
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container sx={{ width: "50%" }}>
        <Paper
          sx={{
            height: "inherit",
          }}
        >
          <Grid
            container
            component='form'
            sx={{
              justifyContent: "center", // Centralize horizontalmente
              padding: 4,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              height: "100%", // Para ocupar toda a altura do Paper
            }}
          >
            {/* Use a tag 'img' para exibir a imagem com o atributo 'src' */}
            <img src={loginImage} width={"60%"} alt="Login" />
            <Stack
              sx={{ alignSelf: "start", width: "100%" }}
              spacing={3}
              mb={5}
            >
              <TextField fullWidth label="Usuário" variant="standard" {...register('ra')}/>
              <TextField fullWidth label="Senha" variant="standard" {...register('senha')} />
            </Stack>
            <Button type="submit" fullWidth variant="contained">
              Login
            </Button>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
}
