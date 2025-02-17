import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { CModal } from "../../../../shared/components";

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
    value: number;
  }

  const { register, handleSubmit, setValue, reset, control } =
    useForm<SaldoFormData>();

  const handleSubmitForm = (data) => {
    console.log(data);
  };

  return (
    <CModal
      title="Editar o saldo"
      open={addSaldoModal}
      onClose={() => setAddSaldoModal(false)}
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
                  {EditSaldo === "adicionar" ? "+" : "-"} R$
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
  );
};
