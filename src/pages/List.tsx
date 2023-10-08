import React from 'react'
import Grid from './components/Grid'
import { Box, Button, Paper, Stack } from '@mui/material'
import {Link as RouterLink} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import PageTitle from '../components/PageTitle'
import Breadcrumbs from './components/Breadcrumbs'

export default function CardapioList() {
  return (
    <>
    <Stack direction={{ xs: "column", sm: "row" }} gap={1} mb={2}>
      <Box sx={{ flexGrow: 1 }}>
        <PageTitle title="Lista" />
        <Breadcrumbs
          path={[{ label: "Cardápios", to: "/cardapios" }, { label: "Lista" }]}
        />
      </Box>
      <Box sx={{ alignSelf: "center" }}>
        <Button
          component={RouterLink}
          to="/cardapio/new"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Novo Cardápio
        </Button>
      </Box>
    </Stack>
    <Paper>
      <Grid />
    </Paper>
  </>

  )
}
