import { DespesaFormData } from "../../pages/minhasFinancas/components/modals/DespesaFormModal";
import { RendaFormData } from "../../pages/minhasFinancas/components/modals/RendaFormModal";
import {
  addDespesaAccess,
  addRendaAccess,
  deleteDespesaAccess,
  deleteRendaAccess,
  updateDespesaAccess,
  updateRendaAccess,
} from "../accesses/minhasFinancasAccess";

export const addRendaAction = async (body: RendaFormData) => {
  const data = await addRendaAccess(body);
  return data;
};

export const updateRendaAction = async (body: RendaFormData, id: string) => {
  const data = await updateRendaAccess(body, id);
  return data;
};

export const deleteRendaAction = async (id: string) => {
  const data = await deleteRendaAccess(id);
  return data;
};

export const addDespesaAction = async (body: DespesaFormData) => {
  const data = await addDespesaAccess(body);
  return data;
};

export const updateDespesaAction = async (
  body: DespesaFormData,
  id: string
) => {
  const data = await updateDespesaAccess(body, id);
  return data;
};

export const deleteDespesaAction = async (id: string) => {
  const data = await deleteDespesaAccess(id);
  return data;
};
