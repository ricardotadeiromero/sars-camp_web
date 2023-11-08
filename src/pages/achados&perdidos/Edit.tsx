import { Box, Paper } from "@mui/material";
import PageTitle from "../../components/PageTitle";
import Breadcrumbs from "./components/Breadcrumbs";
import Form from "./components/Form";

export default function ItemEdit() {
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 1 }}>
        <PageTitle variant="h2" title="Edição" />
        <Breadcrumbs path={[{ label: "Edição item" }]} />
      </Box>
      <Paper>
        <Form />
      </Paper>
    </>
  );
}
