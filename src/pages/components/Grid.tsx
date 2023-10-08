import React, { useEffect, useState } from 'react';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Cardapio } from '../../model/Cardapio';
import { getCardapio } from '../../services/api';
import DataTable from '../../components/DataTable';

export default function Grid() {
  const [cardapios, setCardapios] = useState<Cardapio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCardapio();
        setCardapios(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar o cardápio:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Código', width: 70 },
    { field: 'principal', headerName: 'Principal', width: 100 },
    { field: 'guarnicao', headerName: 'Guarnição', width: 100 },
    { field: 'salada', headerName: 'Salada', width: 100 },
    { field: 'sobremesa', headerName: 'Sobremesa', width: 100 },
    { field: 'suco', headerName: 'Suco', width: 100 },
    {
      field: 'periodo',
      headerName: 'Período',
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.periodo === 1 ? 'Almoço' : 'Janta',
    },
    {
      field: 'vegetariano',
      headerName: 'Tipo',
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.vegetariano === 1 ? 'Vegetariano' : 'Comum',
    },
    { field: 'data', headerName: 'Data', width: 100 },
  ];

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <DataTable columns={columns} rows={cardapios} />
  );
}
