import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { forwardRef, useState } from "react";

import { CModal } from "../../../../shared/components";
import { NumericFormat } from "react-number-format";
import { FormatarParaMoeda } from "../../../../shared/utils/FormatarMoeda";

interface SaldoModalProps {
  addSaldoModal: boolean;
  setAddSaldoModal: (value: boolean) => void;
}

type EditSaldoType = "adicionar" | "descontar";

export const SaldoModal = ({
  addSaldoModal,
  setAddSaldoModal,
}: SaldoModalProps) => {
  const [EditSaldo, setEditSaldo] = useState<EditSaldoType>("adicionar");

  interface SaldoFormData {
    type: string;
    value: string;
  }

  const { handleSubmit, reset, control } = useForm<SaldoFormData>();

  const handleSubmitForm = (data: SaldoFormData) => {
    const dataFormatted = {
      ...data,
      value: FormatarParaMoeda(data.value),
    };
    console.log(dataFormatted);
    // clearForm();
  };

  const NumberFormatCustom = forwardRef((props, ref) => (
    <NumericFormat {...props} getInputRef={ref} />
  ));

  const onClose = () => {
    setAddSaldoModal(false);
    clearForm();
  };

  const clearForm = () => {
    reset({
      type: "",
      value: "0",
    });
  };

  return (
    <CModal title="Editar o saldo" open={addSaldoModal} onClose={onClose}>
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
            rules={{ required: "Este campo é obrigatório" }}
            render={({ field, fieldState: { error } }) => (
              <Box display="flex" flexDirection="column" gap="0.25rem">
                <ToggleButtonGroup
                  color="primary"
                  value={field.value}
                  exclusive
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                    setEditSaldo(newValue);
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
                {error && (
                  <Typography color="error" variant="caption">
                    {error.message}
                  </Typography>
                )}
              </Box>
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
                    prefix: `${EditSaldo === "adicionar" ? "+" : "-"} R$ `,
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
