import React, { useEffect, useState } from "react";
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Cardapio } from "../../../model/Cardapio";
import { deleteCardapio, getCardapio } from "../../../services/api";
import DataTable from "../../../components/DataTableCardapio";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { IconButton, Skeleton, Stack } from "@mui/material";

export default function Grid() {
  const [cardapios, setCardapios] = useState<Cardapio[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCardapio();
        console.log(data[0]);
        setCardapios(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar o cardápio:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function onEdit(params: GridRenderCellParams) {
    if (!params.row.codigo) return;
    navigate("/" + params.row.codigo);
  }

  async function onDelete(params: GridRenderCellParams) {
    if (!params.row.codigo) return;
    await deleteCardapio(params.row);
    setCardapios(cardapios.filter((item) => item.codigo !== params.row.codigo));
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "Código", width: 70 },
    { field: "principal", headerName: "Principal", width: 200 },
    { field: "guarnicao", headerName: "Guarnição", width: 100 },
    { field: "salada", headerName: "Salada", width: 140 },
    { field: "sobremesa", headerName: "Sobremesa", width: 120 },
    { field: "suco", headerName: "Suco", width: 100 },
    {
      field: "periodo",
      headerName: "Período",
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.periodo === 1 ? "Janta" : "Almoço",
    },
    {
      field: "vegetariano",
      headerName: "Tipo",
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.vegetariano === 1 ? "Vegetariano" : "Comum",
    },
    {
      field: "data",
      headerName: "Data",
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        format(new Date(params.row.data), "dd/MM/yyyy"),
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => onEdit(params)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(params)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  if (loading) {
    return <Skeleton variant="rectangular" />;
  }

  return <DataTable columns={columns} rows={cardapios} />;
}
