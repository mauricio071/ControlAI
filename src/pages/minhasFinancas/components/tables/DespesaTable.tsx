import { Box, Button, Icon, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

import { DespesaFormData, DespesaFormModal } from "../modals/DespesaFormModal";
import { FormatarData } from "../../../../shared/utils/FormatarData";
import { GridCard } from "../../../../shared/components";
import { CategoriaBadge } from "../CategoriaBadge";
import { FormatarMoeda } from "../../../../shared/utils/FormatarMoeda";

export const DespesaTable = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DespesaFormData>({} as DespesaFormData);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Data",
      disableColumnMenu: true,
      flex: 1,
      renderCell: (params) => <>{FormatarData(params.row.date)}</>,
    },
    {
      field: "description",
      headerName: "Descrição",
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Categoria",
      disableColumnMenu: true,
      flex: 1,
      renderCell: (params) => (
        <CategoriaBadge categoria={params.row.category} />
      ),
    },
    {
      field: "value",
      headerName: "Valor",
      disableColumnMenu: true,
      flex: 1,
      renderCell: (params) => <>{FormatarMoeda(params.row.value)}</>,
    },
    {
      field: "actions",
      headerName: "Ações",
      disableColumnMenu: true,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <Icon>edit</Icon>
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <Icon>delete</Icon>
          </IconButton>
        </>
      ),
    },
  ];

  const handleEdit = (row: DespesaFormData) => {
    setData(row);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log("Deletando ID:", id);
  };

  const rows = [
    {
      id: 1,
      date: "2025-03-19T03:00:00.000Z",
      description: "Restaurante",
      category: "alimentacao",
      value: 80,
    },
    {
      id: 2,
      date: "2025-05-19T03:00:00.000Z",
      description: "Passagem de ônibus",
      category: "transporte",
      value: 4.5,
    },
    {
      id: 3,
      date: "2025-06-19T03:00:00.000Z",
      description: "Supermercado",
      category: "supermercado",
      value: 250,
    },
    {
      id: 4,
      date: "2025-02-19T03:00:00.000Z",
      description: "Consulta médica",
      category: "saude",
      value: 180,
    },
    {
      id: 5,
      date: "2025-02-19T03:00:00.000Z",
      description: "Aluguel",
      category: "casa",
      value: 1.5,
    },
    {
      id: 6,
      date: "2025-02-19T03:00:00.000Z",
      description: "Spotify",
      category: "assinatura",
      value: 21.0,
    },
    {
      id: 97,
      date: "2025-02-19T03:00:00.000Z",
      description: "Curso online",
      category: "educacao",
      value: 200,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <GridCard>
      <Typography variant="h4" fontWeight="bold">
        Despesa
      </Typography>

      <Box display="flex" justifyContent="end" marginBottom="1.5rem">
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          disableElevation
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Icon>add_circle</Icon>
          Adicionar despesa
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{
          border: 0,
          outline: "none",
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        }}
        disableRowSelectionOnClick
        localeText={{
          MuiTablePagination: {
            labelRowsPerPage: "Linhas por página",
            labelDisplayedRows: ({ from, to, count }) =>
              `${from}-${to} de ${count}`,
          },
        }}
      />
      <DespesaFormModal open={open} setOpen={setOpen} data={data} />
    </GridCard>
  );
};
