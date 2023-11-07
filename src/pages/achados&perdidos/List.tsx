import  { useContext } from "react";
import Grid from "./components/Grid";
import { Grid as MyGrid, Box, Button, Paper, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import PageTitle from "../../components/PageTitle";
import Breadcrumbs from "./components/Breadcrumbs";
import { AuthContext } from "../../context/auth";

export default function AchadosEPerdidosList() {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("Contexto fudeu");
  const { user } = authContext;
  const title: String = "Bem vindo " + user!;
  return (
    <>
      <MyGrid
        container
        justifyContent={"flex-end"}
        alignItems={"flex-start"}
      ></MyGrid>
      <Stack direction={{ xs: "column", sm: "row" }} gap={1} mb={2}>
        <Box sx={{ flexGrow: 1 }}>
          <PageTitle variant="h4" title={title} />
          <Breadcrumbs path={[]} />
        </Box>
        <Box sx={{ alignSelf: "center" }}>
          <Button
            component={RouterLink}
            to="/item/new"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Novo Item
          </Button>
        </Box>
      </Stack>
      <Paper>
        <Grid />
      </Paper>
    </>
  );
}
