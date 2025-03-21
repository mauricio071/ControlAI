import { Box, Button, Icon, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

import {
  deleteTransactionAction,
  getAllTransactionsAction,
} from "../../../services/actions/historicoAction";
import { TransactionType } from "../../../services/interfaces/dashboardInterfaces";
import { CategoriaBadge } from "../../minhasFinancas/components/CategoriaBadge";
import { CModal, GridCard, TitleContainer } from "../../../shared/components";
import { FormatarMoeda } from "../../../shared/utils/FormatarMoeda";
import { FormatarData } from "../../../shared/utils/FormatarData";

interface TransactionsHistoriesProps {
  refreshData: () => void;
}

export const TransactionsHistories = ({
  refreshData,
}: TransactionsHistoriesProps) => {
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

  const [selectedId, setSelectedId] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);

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
      getTransactionsHistories();
      refreshData();
      setDeleteModal(false);
    } catch (error) {
      enqueueSnackbar("Erro ao deletar a renda. Tente novamente.", {
        variant: "error",
      });
      console.error(error);
    }
  };

  const [rows, setRows] = useState<TransactionType[]>([]);

  const paginationModel = { page: 0, pageSize: 5 };

  const [loading, setLoading] = useState(true);

  const getTransactionsHistories = async () => {
    const transactions = await getAllTransactionsAction();
    setRows(transactions);
    setLoading(false);
  };

  useEffect(() => {
    getTransactionsHistories();
  }, []);

  return (
    <>
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
    </>
  );
};
