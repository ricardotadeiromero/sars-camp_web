import React from "react";
import Form from "./components/Form";
import Breadcrumbs from "./components/Breadcrumbs";
import PageTitle from "../components/PageTitle";
import { Box, Paper } from "@mui/material";

export default function CardapioCreate() {
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 1 }}>
        <PageTitle variant="h2" title="Create" />
        <Breadcrumbs
          path={[{ label: "List", to: "/" }, { label: "Novo cárdapio" }]}
        />
      </Box>
      <Paper>
        <Form />
      </Paper>
    </>
  );
}
