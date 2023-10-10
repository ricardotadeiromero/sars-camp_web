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
  getCardapioId,
  updateCardapio,
} from "../../services/api";
import { Cardapio } from "../../model/Cardapio";
import { CardapioSchema } from "../schemas/CardapioSchemas";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";

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
  } = useForm<Cardapio>({resolver: yupResolver(CardapioSchema) as any});

  const [cardapios, setCardapios] = useState<Cardapio>();
  const [loading, setLoading] = useState(true);
  const fetchCardapio = async () => {
    setLoading(false);
    if (id) {
      try {
        const item = await getCardapioId(parseInt(id!));
        setCardapios(item);
        
        if (item) {
          console.log(item);
          setValue("principal", item.principal);
          setValue("guarnicao", item.guarnicao);
          setValue("salada", item.salada);
          setValue("sobremesa", item.sobremesa);
          setValue("suco", item.suco);
          setValue("periodo", item.periodo);
          setValue("vegetariano", item.vegetariano);
          setValue("data", new Date(item.data));
          
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

  const onSubmit = async (data: Cardapio) => {
    try {
      if (id) {
        // Verifique se 'id' é válido antes de adicionar ao objeto 'data'
        const parsedId = parseInt(id);
        if (!isNaN(parsedId)) {
          data.codigo = parsedId;
        }
        console.log(data);
        updateCardapio(data);
      } else {
        console.log(data);
        createCardapio(data);
      }

      navigate("/cardapio");
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
        label="Principal"
        fullWidth={true}
        error={!!errors.principal}
        sx={{ marginBottom: 2 }}
        helperText={errors.principal?.message}
        {...register("principal")}
      />
      <TextField
        label="Guarnição"
        fullWidth={true}
        error={!!errors.guarnicao}
        sx={{ marginBottom: 2 }}
        helperText={errors.guarnicao?.message}
        {...register("guarnicao")}
      />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ marginBottom: 2 }}
        spacing={2}
      >
        <TextField
          label="Salada"
          fullWidth={true}
          error={!!errors.salada}
          helperText={errors.salada?.message}
          {...register("salada")}
        />
        <TextField
          label="Sobremesa"
          fullWidth={true}
          error={!!errors.sobremesa}
          helperText={errors.sobremesa?.message}
          {...register("sobremesa")}
        />
        <TextField
          label="Suco"
          fullWidth={true}
          error={!!errors.suco}
          helperText={errors.suco?.message}
          {...register("suco")}
        />
      </Stack>
      <Stack width={"100%"} direction={{ sm: "row" }} spacing={2}>
        <Controller
          control={control}
          name="periodo"
          defaultValue="0" // Define o valor padrão aqui
          render={({ field: { ...field } }) => (
            <FormControl sx={{ marginBottom: 2 }}>
              <FormLabel>Período</FormLabel>
              <RadioGroup
                {...field}
                aria-labelledby="demo-radio-buttons-group-label"
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="Almoço"
                />
                <FormControlLabel value="1" control={<Radio />} label="Janta" />
              </RadioGroup>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="vegetariano"
          defaultValue="0" // Define o valor padrão aqui
          render={({ field: { ...field } }) => (
            <FormControl sx={{ marginBottom: 2 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                {...field}
                aria-labelledby="demo-radio-buttons-group-label"
              >
                <FormControlLabel value="0" control={<Radio />} label="Comum" />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Vegetariano"
                />
              </RadioGroup>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="data"
          render={({ field: { ...field } }) => (
            <FormControl  fullWidth={true} >
              <DatePicker  label="Data" {...field} />
            </FormControl>
          )}
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <Button type="submit" variant="contained" size="large">
          {id ? "Editar Cardápio" : "Criar Cardápio"}
        </Button>
        <Button onClick={() => navigate("/cardapio")}>Cancelar</Button>
      </Stack>
    </Box>
  );
}
