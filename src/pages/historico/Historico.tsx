import { Box, Button, Icon, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { CategoriaBadge } from "../minhasFinancas/components/CategoriaBadge";
import { FormatarMoeda } from "../../shared/utils/FormatarMoeda";
import { FormatarData } from "../../shared/utils/FormatarData";
import { CModal, GridCard, TitleContainer } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { BarChart } from "@mui/x-charts";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  deleteTransactionAction,
  getAllExpensesAction,
  getAllTransactionsAction,
} from "../../services/actions/historicoAction";
import { enqueueSnackbar } from "notistack";
import { Loading } from "../../shared/components/loading/Loading";

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
          <IconButton
            color="error"
            onClick={() => openDeleteModal(params.row.id)}
          >
            <Icon>delete</Icon>
          </IconButton>
        </>
      ),
    },
  ];

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedId, setSelectedId] = useState("");

  const openDeleteModal = (id: string) => {
    setDeleteModal(true);
    setSelectedId(id);
  };

  const handleDelete = async () => {
    try {
      await deleteTransactionAction(selectedId);
      enqueueSnackbar("Deletado com sucesso!", {
        variant: "success",
      });
      getHistoryTransaction();
      setDeleteModal(false);
    } catch (error) {
      enqueueSnackbar("Erro ao deletar a renda. Tente novamente.", {
        variant: "error",
      });
      console.error(error);
    }
  };

  const [rows, setRows] = useState([]);

  const paginationModel = { page: 0, pageSize: 5 };

  const [pData, setPdata] = useState<number[]>([]);

  const xLabels = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const [year, setYear] = useState<Dayjs>(dayjs());

  const [loading, setLoading] = useState(true);

  const [graphLoading, setGraphLoading] = useState(true);

  const getHistoryTransaction = async () => {
    const transactions = await getAllTransactionsAction();
    setRows(transactions);
    setLoading(false);
  };

  const getHistoryExpense = async () => {
    const data: number[] = await getAllExpensesAction(year.year());
    setPdata(data);
    setGraphLoading(false);
  };

  useEffect(() => {
    getHistoryTransaction();
  }, []);

  useEffect(() => {
    getHistoryExpense();
  }, [year]);

  return (
    <LayoutBase titulo="Histórico">
      <GridCard titleContainer>
        <TitleContainer title="Histórico de transações" />
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={rows.length}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          loading={loading}
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
            noRowsLabel: "Nenhuma transação registrada",
            MuiTablePagination: {
              labelRowsPerPage: "Linhas por página",
              labelDisplayedRows: ({ from, to, count }) =>
                `${from}-${to} de ${count}`,
            },
          }}
        />
      </GridCard>
      <CModal
        title="Apagar a transação"
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
      >
        <Typography>Tem certeza que deseja apagar esta transação?</Typography>
        <Box display="flex" gap="1rem">
          <Button onClick={handleDelete} variant="contained" disableElevation>
            Sim
          </Button>
          <Button onClick={() => setDeleteModal(false)} variant="outlined">
            Voltar
          </Button>
        </Box>
      </CModal>
      <GridCard titleContainer>
        <TitleContainer title="Histórico de gastos" />
        <Box display="flex" justifyContent="center" marginBottom="4rem">
          <DatePicker
            views={["year"]}
            label="Ano"
            value={year}
            onChange={(newYear) => setYear(newYear)}
            minDate={dayjs("2000-01-01")}
            maxDate={dayjs()}
          />
        </Box>

        {graphLoading ? (
          <Loading width="285px" height="285px" />
        ) : (
          <BarChart
            slotProps={{ legend: { hidden: true } }}
            height={400}
            borderRadius={6}
            margin={{ left: 100, right: 20, top: 20, bottom: 30 }}
            series={[
              {
                data: pData,
                label: "Gastou",
                id: "id",
                valueFormatter: (value) => `${FormatarMoeda(Number(value))}`,
              },
            ]}
            xAxis={[{ data: xLabels, scaleType: "band" }]}
            yAxis={[
              {
                valueFormatter: (value) => `${FormatarMoeda(Number(value))}`,
              },
            ]}
          />
        )}
      </GridCard>
    </LayoutBase>
  );
};
