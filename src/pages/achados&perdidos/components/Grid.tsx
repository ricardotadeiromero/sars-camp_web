import { useEffect, useState } from "react";
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {  deleteItems, getItems } from "../../../services/api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { a_p } from "../../../model/Achados&Perdidos";
import DataTableItems from "../../../components/DataTableItems";

export default function Grid() {
  const [items, setItems] = useState<a_p[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("fon");
    async function fetchData() {
      try {
        const data = await getItems();
        console.log(data[0]);
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar o itens:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function onEdit(params: GridRenderCellParams) {
    if (!params.row.id) return;
    navigate("/" + params.row.id);
  }

  async function onDelete(params: GridRenderCellParams) {
    if (!params.row.id) return;
    await deleteItems(params.row.id);
    setItems(items.filter((item) => item.id !== params.row.id));
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "material", headerName: "Material", width: 200 },
    { field: "local", headerName: "Local" },
    { field: "campus", headerName: "Campus", width: 140 },
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

  return <DataTableItems columns={columns} rows={items} />;
}
