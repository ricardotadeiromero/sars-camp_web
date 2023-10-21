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
import React, { useContext, useEffect } from "react";
import loginImage from "../assets/login.png"; // Importe a imagem aqui
import { useForm } from "react-hook-form";
import { User } from "../model/User";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function LoginPage() {
  const authContext = useContext(AuthContext);

  // Verifique se o contexto foi obtido corretamente
  if (!authContext) {
    throw new Error("AuthContext não está disponível.");
  }
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const { user, login, logout, loading } = authContext;

  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<User>();

  useEffect(() => {
    if (cookies.access_token) navigate("/");
  });

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
                  {...register("username")}
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
                  <CircularProgress color="info" size={24} />
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
