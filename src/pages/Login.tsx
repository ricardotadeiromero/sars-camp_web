import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import loginImage from "../assets/login.png"; // Importe a imagem aqui
import { useForm } from "react-hook-form";
import { User } from "../model/User";
import { AuthContext } from "../context/auth";

export default function LoginPage() {
  const authContext = useContext(AuthContext);

  // Verifique se o contexto foi obtido corretamente
  if (!authContext) {
    throw new Error("AuthContext não está disponível.");
  }

  const { user, login, logout, loading } = authContext;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<User>();

  function onSubmit(user: User) {
    console.log(user);
    login(user);
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
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
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
                <TextField
                  fullWidth
                  label="Usuário"
                  variant="standard"
                  {...register("user")}
                />
                <TextField
                  type={"password"}
                  fullWidth
                  label="Senha"
                  variant="standard"
                  {...register("password")}
                />
              </Stack>
              {loading ? (
                <Button type="submit" fullWidth variant="contained">
                  <CircularProgress color="success" />
                </Button>
              ) : (
                <Button type="submit" fullWidth variant="contained">
                  Login
                </Button>
              )}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Grid>
  );
}
