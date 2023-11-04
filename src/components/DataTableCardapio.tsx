import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { Cardapio } from "../model/Cardapio";

interface DataTableProps {
  columns: GridColDef[];
  rows: GridValidRowModel[];
}
export default function DataTable({ columns, rows }: DataTableProps) {
  const getRowId = (row: Cardapio) => row.codigo;
  const gridRows = rows.map((row) => ({
    ...row,
    id: row.codigo.toString(), // Defina um ID para cada linha
  }));

  return (
    <div style={{ maxHeight: "100%", width: "100%" }}>
      <DataGrid
        rows={gridRows}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15, 25, 50, 100]}
        disableRowSelectionOnClick
      />
    </div>
  );
}
