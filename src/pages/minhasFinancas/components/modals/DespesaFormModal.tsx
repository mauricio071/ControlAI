import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { forwardRef, useEffect } from "react";
import dayjs from "dayjs";

import { CATEGORIAS_DESPESA } from "../../../../shared/constants/Categorias";
import { CModal } from "../../../../shared/components";
import { CategoriaBadge } from "../CategoriaBadge";
import { NumericFormat } from "react-number-format";
import { FormatarParaMoeda } from "../../../../shared/utils/FormatarMoeda";

interface DespesaFormModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  data?: DespesaFormData;
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
}: DespesaFormModalProps) => {
  const { register, handleSubmit, reset, control, setValue } =
    useForm<DespesaFormData>();

  const handleSubmitForm = (data: DespesaFormData) => {
    const dataFormatted = {
      ...data,
      value: FormatarParaMoeda(data.value),
    };
    console.log(dataFormatted);
    // clearForm();
  };

  useEffect(() => {
    if (data) {
      setValue("date", data.date);
      setValue("description", data.description);
      setValue("category", data.category);
      setValue("value", data.value);
    }
  }, [data, setValue]);

  const onClose = () => {
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
            render={({ field: { onChange, value } }) => (
              <DatePicker
                value={value ? dayjs(value) : null}
                onChange={(date) => onChange(date ? date.toISOString() : null)}
                label="Selecione a data"
              />
            )}
          />
          <TextField
            {...register("description")}
            label="Descrição"
            variant="outlined"
          />
          <Controller
            name="category"
            defaultValue=""
            control={control}
            render={({ field }) => (
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
            )}
          />
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Valor"
                variant="outlined"
                fullWidth
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
            )}
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
  );
};
