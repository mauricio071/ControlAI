import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { forwardRef, useEffect, useState } from "react";
import * as yup from "yup";
import dayjs from "dayjs";

import { CATEGORIAS_DESPESA } from "../../../../shared/constants/Categorias";
import { FormatarParaMoeda } from "../../../../shared/utils/FormatarMoeda";
import { CModal } from "../../../../shared/components";
import { CategoriaBadge } from "../CategoriaBadge";
import { NumericFormat } from "react-number-format";
import { TransactionType } from "../../../../services/interfaces/dashboardInterfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addDespesaAction,
  updateDespesaAction,
} from "../../../../services/actions/minhasFinancasActions";
import { enqueueSnackbar } from "notistack";
import { CInput } from "../../../../shared/components/cInput/CInput";

interface DespesaFormModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  data?: DespesaFormData;
  fetchData: () => Promise<TransactionType>;
}

export interface DespesaFormData {
  date: string | null;
  description: string;
  category: string;
  value: string;
}

export const DespesaFormModal = ({
  open,
  setOpen,
  data,
  fetchData,
}: DespesaFormModalProps) => {
  const schema = yup.object().shape({
    date: yup.string().required("Data é obrigatória"),
    description: yup.string().required("Descrição é obrigatória"),
    category: yup.string().required("Categoria é obrigatória"),
    value: yup.number().required("Valor é obrigatório"),
  });

  const { register, handleSubmit, reset, control, setValue } =
    useForm<DespesaFormData>({
      resolver: yupResolver(schema),
    });

  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (formData: DespesaFormData) => {
    if (data?.id) {
      try {
        setLoading(true);
        await updateDespesaAction(formData, data.id);
        enqueueSnackbar("Despesa atualizada com sucesso!", {
          variant: "success",
        });
        onClose();
        setLoading(false);
      } catch (error) {
        enqueueSnackbar("Erro ao atualizar despesa. Tente novamente.", {
          variant: "error",
        });
        console.error(error);
      }
    } else {
      try {
        setLoading(true);
        await addDespesaAction(formData);
        enqueueSnackbar("Despesa nova registrada com sucesso!", {
          variant: "success",
        });
        onClose();
        setLoading(false);
      } catch (error) {
        enqueueSnackbar("Erro ao registrar a nova despesa. Tente novamente.", {
          variant: "error",
        });
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setValue("date", data.date);
      setValue("description", data.description);
      setValue("category", data.category);
      setValue("value", data.value);
    }
  }, [data, setValue]);

  const onClose = async () => {
    await fetchData();
    setOpen(false);
    clearForm();
  };

  const clearForm = () => {
    reset({
      date: null,
      description: "",
      category: "",
      value: "0",
    });
  };

  const NumberFormatCustom = forwardRef((props, ref) => (
    <NumericFormat {...props} getInputRef={ref} />
  ));

  return (
    <CModal title="Adicionar despesa" open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          gap="2rem"
        >
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CInput error={error}>
                <DatePicker
                  value={value ? dayjs(value) : null}
                  onChange={(date) =>
                    onChange(date ? date.format("YYYY-MM-DD") : null)
                  }
                  label="Data de início do pagamento"
                />
              </CInput>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CInput error={error}>
                <TextField {...field} label="Descrição" variant="outlined" />
              </CInput>
            )}
          />
          <Controller
            name="category"
            defaultValue=""
            control={control}
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
                  {CATEGORIAS_DESPESA.map((option) => (
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
                      prefix: "R$ ",
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
            variant="contained"
            disableElevation
            disabled={loading}
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
  );
};
