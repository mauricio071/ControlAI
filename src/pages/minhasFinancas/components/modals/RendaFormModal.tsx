import {
  Box,
  Button,
  InputBaseComponentProps,
  MenuItem,
  TextField,
} from "@mui/material";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { forwardRef, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { enqueueSnackbar } from "notistack";
import * as yup from "yup";
import dayjs from "dayjs";

import {
  addRendaAction,
  updateRendaAction,
} from "../../../../services/actions/minhasFinancasActions";
import { CATEGORIAS_RENDA } from "../../../../shared/constants/Categorias";
import { FormatarParaMoeda } from "../../../../shared/utils/FormatarMoeda";
import { CInput } from "../../../../shared/components/cInput/CInput";
import { CModal } from "../../../../shared/components";
import { CategoriaBadge } from "../CategoriaBadge";
interface RendaFormModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  data?: RendaFormData;
  fetchData: () => Promise<void>;
}

export interface RendaFormData {
  id?: string;
  date: string;
  description: string;
  category: string;
  value: number;
}

export const RendaFormModal = ({
  open,
  setOpen,
  data,
  fetchData,
}: RendaFormModalProps) => {
  const schema = yup.object().shape({
    date: yup.string().required("Data é obrigatória"),
    description: yup.string().required("Descrição é obrigatória"),
    category: yup.string().required("Categoria é obrigatória"),
    value: yup.number().required("Valor é obrigatório"),
  });

  const { handleSubmit, reset, control, setValue } = useForm<RendaFormData>({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (formData: RendaFormData) => {
    if (data?.id) {
      try {
        setLoading(true);
        await updateRendaAction(formData, data.id);
        enqueueSnackbar("Renda atualizada com sucesso!", {
          variant: "success",
        });
        onClose();
        setLoading(false);
      } catch (error) {
        enqueueSnackbar("Erro ao atualizar renda. Tente novamente.", {
          variant: "error",
        });
        console.error(error);
      }
    } else {
      try {
        setLoading(true);
        await addRendaAction(formData);
        enqueueSnackbar("Renda nova registrada com sucesso!", {
          variant: "success",
        });
        onClose();
        setLoading(false);
      } catch (error) {
        enqueueSnackbar("Erro ao registrar a nova renda. Tente novamente.", {
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
      date: "",
      description: "",
      category: "",
      value: 0,
    });
  };

  const NumberFormatCustom = forwardRef<HTMLInputElement, NumericFormatProps>(
    (props, ref) => <NumericFormat {...props} getInputRef={ref} />
  );

  return (
    <CModal title="Adicionar renda" open={open} onClose={onClose}>
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
                  label="Data de início do recebimento"
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
                  {CATEGORIAS_RENDA.map((option) => (
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
                    inputComponent:
                      NumberFormatCustom as React.ComponentType<InputBaseComponentProps>,
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
