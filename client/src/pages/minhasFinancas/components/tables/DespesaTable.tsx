import { Box, Button, Icon, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

import {
  CModal,
  GridCard,
  TitleContainer,
} from "../../../../shared/components";
import {
  deleteDespesaAction,
  getDespesasAction,
} from "../../../../services/actions/minhasFinancasActions";
import { TransactionType } from "../../../../services/interfaces/dashboardInterfaces";
import { DespesaFormData, DespesaFormModal } from "../modals/DespesaFormModal";
import { useChatbotContext } from "../../../../shared/contexts/ChatbotContext";
import { FormatarMoeda } from "../../../../shared/utils/FormatarMoeda";
import { FormatarData } from "../../../../shared/utils/FormatarData";
import { CategoriaBadge } from "../CategoriaBadge";

interface DespesaTableProps {
  setTotalExpense: (totalExpense: number) => void;
}

export const DespesaTable = ({ setTotalExpense }: DespesaTableProps) => {
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState<DespesaFormData>({} as DespesaFormData);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Início do Pagamento",
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
          <Typography fontWeight="bold" marginRight="0.25rem" color="error">
            -
          </Typography>
          {FormatarMoeda(params.row.value)}
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Ações",
      disableColumnMenu: true,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row)}
            color="primary"
            aria-label="Editar gasto"
          >
            <Icon>edit</Icon>
          </IconButton>
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

  const handleEdit = (row: DespesaFormData) => {
    setData(row);
    setOpen(true);
  };

  const [rows, setRows] = useState<TransactionType[]>([]);

  const paginationModel = { page: 0, pageSize: 5 };

  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getDespesasAction();
      setRows(data);
      const totalExpense = data?.reduce((total, obj) => total + obj.value, 0);
      setTotalExpense(totalExpense);
    } catch (error) {
      enqueueSnackbar("Erro ao listar os gastos. Tente novamente.", {
        variant: "error",
      });
      console.error(error);
    } finally {
      setData({} as DespesaFormData);
      setLoading(false);
    }
  };

  const openDeleteModal = (id: string) => {
    setDeleteModal(true);
    setSelectedId(id);
  };

  const { setChatHistory } = useChatbotContext();

  const handleDelete = async () => {
    try {
      await deleteDespesaAction(selectedId);
      setChatHistory((prev) => [
        ...prev,
        {
          hideInChat: true,
          role: "user",
          text: `Esse gasto fixo foi deletado!: ${selectedId}`,
        },
      ]);
      enqueueSnackbar("Deletado com sucesso!", {
        variant: "success",
      });
      fetchData();
      setDeleteModal(false);
    } catch (error) {
      enqueueSnackbar("Erro ao deletar o gasto. Tente novamente.", {
        variant: "error",
      });
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GridCard titleContainer>
      <TitleContainer title="Gasto fixo mensal" />

      <Box display="flex" justifyContent="end" marginBottom="1.5rem">
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          disableElevation
          color="secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Icon>add_circle</Icon>
          Adicionar gasto
        </Button>
      </Box>
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
          noRowsLabel: "Nenhum gasto cadastrado",
          MuiTablePagination: {
            labelRowsPerPage: "Linhas por página",
            labelDisplayedRows: ({ from, to, count }) =>
              `${from}-${to} de ${count}`,
          },
        }}
      />
      <DespesaFormModal
        open={open}
        setOpen={setOpen}
        data={data}
        fetchData={fetchData}
      />
      <CModal
        title="Apagar o gasto"
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
      >
        <Typography>Tem certeza que deseja apagar este gasto?</Typography>
        <Box display="flex" gap="1rem">
          <Button onClick={handleDelete} variant="contained" disableElevation>
            Sim
          </Button>
          <Button onClick={() => setDeleteModal(false)} variant="outlined">
            Voltar
          </Button>
        </Box>
      </CModal>
    </GridCard>
  );
};
