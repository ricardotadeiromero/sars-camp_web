import  { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  createCardapio,
  getCardapioId,
  updateCardapio,
} from "../../../services/api";
import { Cardapio } from "../../../model/Cardapio";
import { CardapioSchema } from "../schemas/CardapioSchemas";
import { DatePicker } from "@mui/x-date-pickers";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomError } from "../../../model/CustomError";

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
export default function Form() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Cardapio>({ resolver: yupResolver(CardapioSchema) as any });

  const [loading, setLoading] = useState(true);
  const [error,setError] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const fetchCardapio = async () => {
    setLoading(false);
    if (id) {
      try {
        const item = await getCardapioId(parseInt(id!));

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

      if (id) {
        // Verifique se 'id' é válido antes de adicionar ao objeto 'data'
        const parsedId = parseInt(id);
        if (!isNaN(parsedId)) {
          data.codigo = parsedId;
        }
        await updateCardapio(data);
        navigate('/cardapio');
      } else {
        try{
          await createCardapio(data);
          navigate('/cardapio');
        } catch(error){
          const errorText = error as CustomError
          setError(errorText.response.data.message);
          setOpen(true);
        } 
      }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Erro!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </Box>
      </Modal>
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
            <FormControl fullWidth={true}>
              <DatePicker label="Data" {...field} />
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
    </>
  );
}
