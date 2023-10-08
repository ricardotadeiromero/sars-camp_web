import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getCardapioId } from "../../services/api"; // Importe a função que busca dados da API
import { Cardapio } from "../../model/Cardapio"; // Importe o modelo Cardapio

export default function Form() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Cardapio>();

  const [cardapio, setCardapio] = useState<Cardapio | null>(null); // Estado para armazenar os dados do cardápio

  useEffect(() => {
    // Função para buscar dados do cardápio da API
    const fetchCardapio = async () => {
      try {
        const response = await getCardapioId(parseInt(id!)); // Substitua 'id' pelo valor apropriado
        setCardapio(response);
        return response; // Supondo que a resposta contém os dados do cardápio
      } catch (error) {
        console.error("Erro ao buscar o cardápio:", error);
        // Trate o erro conforme necessário
      }
    };

    if (id) {
      fetchCardapio().then((cardapio) => {
        if (cardapio) {
          setValue("principal", cardapio.principal);
          // Defina outros campos aqui conforme necessário
        }
      });
    }
  }, [id]);

  const onSubmit = (data: Cardapio) => {
    // Implemente a lógica de envio/edição dos dados do cardápio aqui
    // Você pode usar 'data' para acessar os campos do formulário preenchidos
    // Por exemplo: enviar dados para a API ou atualizar o estado local

    // Após o envio/edição, redirecione o usuário para a página apropriada
    navigate("/pagina-de-destino");
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 2 }}
    >
      {/* Renderize os campos do formulário conforme necessário */}
      <TextField
        label="Principal"
        fullWidth={true}
        error={!!errors.principal}
        helperText={errors.principal?.message}
        {...register("principal")}
        value={cardapio?.principal || ""}
        onChange={(e) => setValue("principal", e.target.value)}
      />

      {/* Mais campos do formulário... */}

      <Stack direction="row" spacing={2}>
        <Button type="submit" variant="contained" size="large">
          {id ? "Editar Cardápio" : "Criar Cardápio"}
        </Button>
        <Button onClick={() => navigate("/pagina-de-destino")}>Cancelar</Button>
      </Stack>
    </Box>
  );
}
