import React from "react";

import Breadcrumbs from "./components/Breadcrumbs";
import PageTitle from "../../components/PageTitle";
import { Box, Paper } from "@mui/material";
import Form from "./components/Form";

export default function ItemCreate() {
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 1 }}>
        <PageTitle variant="h2" title="Adicionar" />
        <Breadcrumbs path={[{ label: "Novo item" }]} />
      </Box>
      <Paper>
        <Form />
      </Paper>
    </>
  );
}
