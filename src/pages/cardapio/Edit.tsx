import Form from "./components/Form";
import { Box, Paper } from "@mui/material";
import PageTitle from "../../components/PageTitle";
import Breadcrumbs from "./components/Breadcrumbs";

export default function CardapioEdit() {
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 1 }}>
        <PageTitle variant="h2" title="Edição" />
        <Breadcrumbs path={[{ label: "Edição cardápio" }]} />
      </Box>
      <Paper>
        <Form />
      </Paper>
    </>
  );
}
