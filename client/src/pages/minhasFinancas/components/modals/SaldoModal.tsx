import {
  Box,
  Button,
  InputBaseComponentProps,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { forwardRef, useState } from "react";
import { enqueueSnackbar } from "notistack";
import * as yup from "yup";

import { updateBalanceAction } from "../../../../services/actions/minhasFinancasActions";
import { useChatbotContext } from "../../../../shared/contexts/ChatbotContext";
import { BalanceType } from "../../../../services/interfaces/minhasFinancas";
import { FormatarParaMoeda } from "../../../../shared/utils/FormatarMoeda";
import { CInput } from "../../../../shared/components/cInput/CInput";
import { CModal } from "../../../../shared/components";

interface SaldoModalProps {
  balance: BalanceType;
  addSaldoModal: boolean;
  setAddSaldoModal: (value: boolean) => void;
}

type EditSaldoType = "adicionar" | "descontar";

export interface SaldoFormData {
  type: EditSaldoType;
  value: number;
}

export const SaldoModal = ({
  balance,
  addSaldoModal,
  setAddSaldoModal,
}: SaldoModalProps) => {
  const schema = yup.object().shape({
    type: yup
      .string()
      .oneOf(
        ["adicionar", "descontar"],
        'Tipo deve ser "adicionar" ou "descontar"'
      )
      .required("Tipo é obrigatório"),
    value: yup.number().required("Valor é obrigatório"),
  });

  const { handleSubmit, reset, control } = useForm<SaldoFormData>({
    resolver: yupResolver(schema),
  });

  const [EditSaldo, setEditSaldo] = useState<EditSaldoType>("adicionar");

  const [loading, setLoading] = useState(false);

  const { setChatHistory } = useChatbotContext();

  const handleSubmitForm = async (data: SaldoFormData) => {
    try {
      setLoading(true);

      const newBalance = balance;

      if (data.type === "adicionar") {
        newBalance.balance += data.value;
      } else if (
        data.type === "descontar" &&
        newBalance.balance - data.value >= 0
      ) {
        newBalance.balance -= data.value;
      } else {
        enqueueSnackbar("Saldo insuficiente", {
          variant: "error",
        });
        return;
      }
      const response = await updateBalanceAction(newBalance);
      setChatHistory((prev) => [
        ...prev,
        {
          hideInChat: true,
          role: "user",
          text: `Saldo atualizado (priorizar!): ${response.balance}`,
        },
      ]);
      enqueueSnackbar("Saldo atualizado com sucesso!", {
        variant: "success",
      });
      onClose();
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Erro ao atualizar o saldo. Tente novamente.", {
        variant: "error",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const NumberFormatCustom = forwardRef<HTMLInputElement, NumericFormatProps>(
    (props, ref) => <NumericFormat {...props} getInputRef={ref} />
  );

  const onClose = () => {
    setAddSaldoModal(false);
    clearForm();
  };

  const clearForm = () => {
    reset({
      type: "adicionar",
      value: 0,
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
            defaultValue="adicionar"
            rules={{ required: "Este campo é obrigatório" }}
            render={({ field, fieldState: { error } }) => (
              <CInput error={error}>
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
                      prefix: `${EditSaldo === "adicionar" ? "+" : "-"} R$ `,
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
            disabled={loading}
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
