import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  createCardapio,
  createItem,
  getCardapioId,
  getItemById,
  updateCardapio,
  updateItem,
} from "../../../services/api";
import { Cardapio } from "../../../model/Cardapio";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";

import { a_p } from "../../../model/Achados&Perdidos";
import { AchadosPerdidosSchema } from "../schemas/AchadosPerdidosSchema";

export default function Form() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<a_p>({ resolver: yupResolver(AchadosPerdidosSchema) as any });

  const [item, setItems] = useState<a_p>();
  const [loading, setLoading] = useState(true);
  const fetchCardapio = async () => {
    setLoading(false);
    if (id) {
      try {
        const item = await getItemById(parseInt(id!));
        setItems(item);

        if (item) {
          console.log(item);
          setValue("material", item.material);
          setValue("local", item.local);
          setValue("campus", item.campus);

        }
      } catch (error) {
        console.error("Erro ao buscar o cardápio:", error);
        // Handle the error as needed
      }
    }
  };
  useEffect(() => {
    fetchCardapio();
  }, []);

  const onSubmit = async (data: a_p) => {
    try {
      if (id) {
        // Verifique se 'id' é válido antes de adicionar ao objeto 'data'
        const parsedId = parseInt(id);
        if (!isNaN(parsedId)) {
          data.id = parsedId;
        }
        console.log(data);
        updateItem(data);
      } else {
        console.log(data);
        createItem(data);
      }
      navigate("/");
    } catch (error) {
      console.error("Erro ao enviar os dados do cardápio:", error);
      // Handle the error as needed
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 2 }}
    >
      <TextField
        label="Material"
        fullWidth={true}
        error={!!errors.material}
        sx={{ marginBottom: 2 }}
        helperText={errors.material?.message}
        {...register("material")}
      />
      <TextField
        label="Local"
        fullWidth={true}
        error={!!errors.local}
        sx={{ marginBottom: 2 }}
        helperText={errors.local?.message}
        {...register("local")}
      />
        <TextField
          label="Campus"
          fullWidth={true}
          error={!!errors.campus}
          helperText={errors.campus?.message}
          {...register("campus")}
        />
      <Stack sx={{marginTop:2}} direction="row" spacing={2}>
        <Button type="submit" variant="contained" size="large">
          {id ? "Editar item" : "Criar item"}
        </Button>
        <Button onClick={() => navigate("/")}>Cancelar</Button>
      </Stack>
    </Box>
  );
}
