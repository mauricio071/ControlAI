import {
  Box,
  Button,
  Grid2 as Grid,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { LayoutBase } from "../../shared/layouts";
import { CModal, GridCard } from "../../shared/components";
import { useState } from "react";
import { CategoriaBadge } from "./components/CategoriaBadge";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Controller, useForm } from "react-hook-form";

export const MinhasFinancas = () => {
  // function createData(
  //   name: string,
  //   calories: number,
  //   fat: number,
  //   carbs: number,
  //   protein: number
  // ) {
  //   return { name, calories, fat, carbs, protein };
  // }

  // const rows = [
  //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  //   createData("Eclair", 262, 16.0, 24, 6.0),
  //   createData("Cupcake", 305, 3.7, 67, 4.3),
  //   createData("Gingerbread", 356, 16.0, 49, 3.9),
  // ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const columns: GridColDef[] = [
    {
      field: "data",
      headerName: "Data",
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "descricao",
      headerName: "Descrição",
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "categoria",
      headerName: "Categoria",
      disableColumnMenu: true,
      flex: 1,
      renderCell: (params) => (
        <CategoriaBadge categoria={params.row.categoria} />
      ),
    },
    {
      field: "valor",
      headerName: "Valor",
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "acoes",
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

  const handleEdit = (row) => {
    console.log("Editando:", row);
  };

  const handleDelete = (id) => {
    console.log("Deletando ID:", id);
  };

  const rows = [
    {
      id: 1,
      data: "20/02/2025",
      descricao: "Netflix",
      categoria: "Lazer",
      valor: "R$ 35",
    },
    {
      id: 2,
      data: "20/02/2025",
      descricao: "Netflix",
      categoria: "Fixo",
      valor: "R$ 42",
    },
    {
      id: 3,
      data: "20/02/2025",
      descricao: "Netflix",
      categoria: "Netflix",
      valor: "R$ 45",
    },
    {
      id: 4,
      data: "20/02/2025",
      descricao: "Netflix",
      categoria: "Netflix",
      valor: "R$ 16",
    },
    {
      id: 5,
      data: "20/02/2025",
      descricao: "Netflix",
      categoria: "Netflix",
      valor: "R$ 20",
    },
    {
      id: 6,
      data: "20/02/2025",
      descricao: "Netflix",
      categoria: "Netflix",
      valor: "R$ 150",
    },
    {
      id: 7,
      data: "20/02/2025",
      descricao: "Netflix",
      categoria: "Netflix",
      valor: "R$ 44",
    },
    {
      id: 8,
      data: "20/02/2025",
      descricao: "Netflix",
      categoria: "Netflix",
      valor: "R$ 36",
    },
    {
      id: 9,
      data: "20/02/2025",
      descricao: "Netflix",
      categoria: "Netflix",
      valor: "R$ 65",
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const [addBalanceModal, setAddBalanceModal] = useState(false);
  const openAddBalanceModal = () => {
    setAddBalanceModal(true);
  };

  type EditBalanceType = "adicionar" | "descontar";

  const [EditBalance, setEditBalance] = useState<EditBalanceType>("adicionar");

  interface BalanceFormData {
    type: string;
    value: number;
  }

  const { register, handleSubmit, setValue, reset, control } =
    useForm<BalanceFormData>();

  const handleSubmitForm = (data) => {
    console.log(data);
  };

  return (
    <LayoutBase titulo="Minhas finanças">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <GridCard>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                gap="0.75rem"
              >
                <Typography textAlign="start" color="gray">
                  Saldo atual
                </Typography>
                <Box display="flex" gap="0.5rem">
                  <Typography variant="h4" fontWeight="600">
                    R$ 300
                  </Typography>
                </Box>
              </Box>
              <Box>
                <IconButton onClick={openAddBalanceModal}>
                  <Icon color="secondary" sx={{ fontSize: "2.5rem" }}>
                    edit
                  </Icon>
                </IconButton>
              </Box>
            </Box>
          </GridCard>
          <CModal
            title="Editar o saldo"
            open={addBalanceModal}
            onClose={() => setAddBalanceModal(false)}
          >
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
                gap="2rem"
              >
                <Controller
                  name="type"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <ToggleButtonGroup
                      color="primary"
                      value={field.value}
                      exclusive
                      onChange={(_, newValue) => field.onChange(newValue)}
                      sx={{ gap: "1rem" }}
                    >
                      <ToggleButton
                        value="adicionar"
                        sx={{
                          border: "2px solid #ccc ",
                          borderRadius: "8px !important",
                          "&.Mui-selected": {
                            backgroundColor: "#4caf50",
                            borderColor: "#4caf50",
                            color: "white",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#4caf50",
                          },
                        }}
                      >
                        Adicionar
                      </ToggleButton>
                      <ToggleButton
                        value="descontar"
                        sx={{
                          border: "2px solid #ccc !important",
                          borderRadius: "8px !important",
                          "&.Mui-selected": {
                            backgroundColor: "#f44336",
                            borderColor: "#f44336 !important",
                            color: "white",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#f44336",
                          },
                        }}
                      >
                        Descontar
                      </ToggleButton>
                    </ToggleButtonGroup>
                  )}
                />
                <Input
                  {...register("value")}
                  sx={{ fontSize: "2rem" }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Typography fontSize="2rem">
                        {EditBalance === "adicionar" ? "+" : "-"} R$
                      </Typography>
                    </InputAdornment>
                  }
                />
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  disableElevation
                  sx={{
                    borderRadius: "1rem",
                    maxWidth: "12rem",
                    width: "100%",
                    alignSelf: "center",
                  }}
                >
                  Salvar
                </Button>
              </Box>
            </form>
          </CModal>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <GridCard>
            <Box display="flex" justifyContent="space-between">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                gap="0.75rem"
              >
                <Typography textAlign="start" color="gray">
                  Renda total
                </Typography>
                <Box display="flex" gap="0.5rem">
                  <Typography variant="h4" fontWeight="600" color="success">
                    R$ 300
                  </Typography>
                </Box>
              </Box>
            </Box>
          </GridCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <GridCard>
            <Box display="flex" justifyContent="space-between">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                gap="0.75rem"
              >
                <Typography textAlign="start" color="gray">
                  Despesa total
                </Typography>
                <Box display="flex" gap="0.5rem">
                  <Typography variant="h4" fontWeight="600" color="error">
                    R$ 300
                  </Typography>
                </Box>
              </Box>
            </Box>
          </GridCard>
        </Grid>
      </Grid>

      {/* <GridCard>
        <Typography variant="h4" fontWeight="bold">
          Renda
        </Typography>

        <Box
          display="flex"
          justifyContent="end"
          alignItems="center"
          marginBottom="1.5rem"
        >
          <Button
            onClick={handleOpen}
            variant="contained"
            disableElevation
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Icon>add_circle</Icon>
            Adicionar renda
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
            },
          }}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </GridCard> */}

      <GridCard>
        <Typography variant="h4" fontWeight="bold">
          Despesa
        </Typography>

        <Box display="flex" justifyContent="end">
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            disableElevation
            sx={{
              marginBottom: "1.5rem",
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
            },
          }}
        />
        <CModal
          title="Adicionar despesa"
          open={open}
          onClose={() => setOpen(false)}
        >
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              gap="2rem"
            >
              <TextField
                {...register("descricao")}
                label="Descrição"
                variant="outlined"
              />
              <TextField
                {...register("descricao")}
                label="Descrição"
                variant="outlined"
              />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={open}
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <Input
                {...register("valor")}
                sx={{ fontSize: "2rem" }}
                startAdornment={
                  <InputAdornment position="start">
                    <Typography fontSize="2rem">R$</Typography>
                  </InputAdornment>
                }
              />
              <Button
                type="submit"
                size="large"
                variant="contained"
                disableElevation
                sx={{
                  borderRadius: "1rem",
                  maxWidth: "12rem",
                  width: "100%",
                  alignSelf: "center",
                }}
              >
                Salvar
              </Button>
            </Box>
          </form>
        </CModal>
      </GridCard>
    </LayoutBase>
  );
};
