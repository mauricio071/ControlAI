import {
  Box,
  Button,
  MenuItem,
  TextField,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { DatePicker } from "@mui/x-date-pickers";
import { forwardRef, useState } from "react";
import dayjs from "dayjs";

import { CategoriaBadge } from "../minhasFinancas/components/CategoriaBadge";
import {
  CATEGORIAS_DESPESA,
  CATEGORIAS_RENDA,
} from "../../shared/constants/Categorias";
import { FormatarParaMoeda } from "../../shared/utils/FormatarMoeda";
import { GridCard, TitleContainer } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { TransactionType } from "../../services/interfaces/dashboardInterfaces";
import { addTransacaoAction } from "../../services/actions/addTransacaoAction";
import { yupResolver } from "@hookform/resolvers/yup";
import { enqueueSnackbar } from "notistack";
import * as yup from "yup";
import { CInput } from "../../shared/components/cInput/CInput";

export const AdicionarTransacao = () => {
  const [tipoTransacao, setTipoTransacao] = useState<"adicionar" | "descontar">(
    "adicionar"
  );

  const schema = yup.object().shape({
    type: yup
      .string()
      .oneOf(
        ["adicionar", "descontar"],
        'Tipo deve ser "adicionar" ou "descontar"'
      )
      .required("Tipo é obrigatório"),
    date: yup.string().required("Data é obrigatória"),
    description: yup.string().required("Descrição é obrigatória"),
    category: yup.string().required("Categoria é obrigatória"),
    value: yup.number().required("Valor é obrigatório"),
  });

  const { handleSubmit, reset, control } = useForm<TransactionType>({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (data: TransactionType) => {
    try {
      setLoading(true);
      await addTransacaoAction(data);
      enqueueSnackbar("Transação registrada com sucesso!", {
        variant: "success",
      });
      clearForm();
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Erro ao registrar a transação. Tente novamente.", {
        variant: "error",
      });
      console.error(error);
    }
  };

  const clearForm = () => {
    reset({
      date: "",
      description: "",
      category: "",
      value: "0",
    });
  };

  const NumberFormatCustom = forwardRef((props, ref) => (
    <NumericFormat {...props} getInputRef={ref} />
  ));

  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return (
    <LayoutBase titulo="Adicionar Transação">
      <Box maxWidth="50rem" width="100%" margin={lgDown ? "auto" : "none"}>
        <GridCard titleContainer>
          <TitleContainer title="Nova transação" />
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
                defaultValue={undefined}
                rules={{ required: "Este campo é obrigatório" }}
                render={({ field, fieldState: { error } }) => (
                  <CInput error={error}>
                    <ToggleButtonGroup
                      color="primary"
                      value={field.value}
                      exclusive
                      onChange={(_, newValue) => {
                        field.onChange(newValue);
                        setTipoTransacao(newValue);
                      }}
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
                  </CInput>
                )}
              />
              <Controller
                name="date"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <CInput error={error}>
                    <DatePicker
                      value={value ? dayjs(value) : null}
                      onChange={(date) =>
                        onChange(date ? date.format("YYYY-MM-DD") : null)
                      }
                      label="Selecione a data"
                    />
                  </CInput>
                )}
              />
              <Controller
                name="description"
                defaultValue=""
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CInput error={error}>
                    <TextField
                      {...field}
                      label="Descrição"
                      variant="outlined"
                    />
                  </CInput>
                )}
              />
              <Controller
                name="category"
                defaultValue=""
                control={control}
                disabled={!tipoTransacao}
                render={({ field, fieldState: { error } }) => (
                  <CInput error={error}>
                    <TextField
                      {...field}
                      select
                      label="Categoria"
                      sx={{
                        "& .MuiSelect-select": {
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                        },
                      }}
                    >
                      {tipoTransacao === "adicionar" &&
                        CATEGORIAS_RENDA.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            sx={{ display: "flex", gap: "0.75rem" }}
                          >
                            <CategoriaBadge categoria={option.value} />
                          </MenuItem>
                        ))}
                      {tipoTransacao === "descontar" &&
                        CATEGORIAS_DESPESA.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            sx={{ display: "flex", gap: "0.75rem" }}
                          >
                            <CategoriaBadge categoria={option.value} />
                          </MenuItem>
                        ))}
                    </TextField>
                  </CInput>
                )}
              />
              <Controller
                name="value"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CInput error={error}>
                    <TextField
                      {...field}
                      label="Valor"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        const rawValue = FormatarParaMoeda(e.target.value);
                        field.onChange(rawValue);
                      }}
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                        inputProps: {
                          thousandSeparator: ".",
                          decimalSeparator: ",",
                          prefix: `${
                            tipoTransacao === "adicionar" ? "+" : "-"
                          } R$`,
                          decimalScale: 2,
                          fixedDecimalScale: true,
                          allowNegative: false,
                        },
                      }}
                    />
                  </CInput>
                )}
              />
              <Button
                type="submit"
                size="large"
                disabled={loading}
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
        </GridCard>
      </Box>
    </LayoutBase>
  );
};
