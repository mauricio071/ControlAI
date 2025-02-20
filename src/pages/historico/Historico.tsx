import { Icon, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { CategoriaBadge } from "../minhasFinancas/components/CategoriaBadge";
import { FormatarMoeda } from "../../shared/utils/FormatarMoeda";
import { FormatarData } from "../../shared/utils/FormatarData";
import { GridCard } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { BarChart } from "@mui/x-charts";

export const Historico = () => {
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
      renderCell: (params) => (
        <>
          <Typography
            fontWeight="bold"
            marginRight="0.25rem"
            color={params.row.type === "adicionar" ? "success" : "error"}
          >
            {params.row.type === "adicionar" ? "+" : "-"}
          </Typography>
          {FormatarMoeda(params.row.value)}
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Ação",
      disableColumnMenu: true,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <Icon>delete</Icon>
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    console.log("Deletando ID:", id);
  };

  const rows = [
    {
      id: 1,
      type: "adicionar",
      date: "2025-03-19T03:00:00.000Z",
      description: "Restaurante",
      category: "alimentacao",
      value: 80,
    },
    {
      id: 2,
      type: "adicionar",
      date: "2025-05-19T03:00:00.000Z",
      description: "Passagem de ônibus",
      category: "transporte",
      value: 4.5,
    },
    {
      id: 3,
      type: "descontar",
      date: "2025-06-19T03:00:00.000Z",
      description: "Supermercado",
      category: "supermercado",
      value: 250,
    },
    {
      id: 4,
      type: "descontar",
      date: "2025-02-19T03:00:00.000Z",
      description: "Consulta médica",
      category: "saude",
      value: 180,
    },
    {
      id: 5,
      type: "adicionar",
      date: "2025-02-19T03:00:00.000Z",
      description: "Aluguel",
      category: "casa",
      value: 1.5,
    },
    {
      id: 6,
      type: "descontar",
      date: "2025-02-19T03:00:00.000Z",
      description: "Spotify",
      category: "assinatura",
      value: 21.0,
    },
    {
      id: 7,
      type: "descontar",
      date: "2025-02-19T03:00:00.000Z",
      description: "Curso online",
      category: "educacao",
      value: 200,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const pData = [
    2400, 1398, 9800, 3908, 4800, 3800, 4300, 1398, 9800, 3908, 4800, 3800,
  ];
  const xLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <LayoutBase titulo="Histórico">
      <GridCard>
        <BarChart
          slotProps={{ legend: { hidden: true } }}
          height={400}
          borderRadius={6}
          series={[{ data: pData, label: "pv", id: "pvId" }]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
        />
      </GridCard>
      <GridCard>
        <Typography variant="h4" fontWeight="bold" marginBottom="1.5rem">
          Histórico de transações
        </Typography>
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
      </GridCard>
    </LayoutBase>
  );
};
