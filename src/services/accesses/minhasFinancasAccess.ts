import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import dayjs from "dayjs";

import { RendaFormData } from "../../pages/minhasFinancas/components/modals/RendaFormModal";
import { DespesaFormData } from "../../pages/minhasFinancas/components/modals/DespesaFormModal";

export const updateBalance = async () => {};

export const addRendaAccess = async (body: RendaFormData) => {
  const user = auth.currentUser;

  const addRendasCollectionRef = collection(db, "rendas");

  try {
    const data = {
      uid: user?.uid,
      timestamp: dayjs().toDate(),
      updateAt: dayjs().toDate(),
      type: "adicionar",
      ...body,
    };
    const response = await addDoc(addRendasCollectionRef, data);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateRendaAccess = async (body: RendaFormData, id: string) => {
  try {
    const renda = doc(db, "rendas", id);
    const newBody = {
      ...body,
      updateAt: dayjs().toDate(),
    };
    const response = await updateDoc(renda, newBody);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRendaAccess = async (id: string) => {
  try {
    const renda = doc(db, "rendas", id);
    const response = await deleteDoc(renda);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addDespesaAccess = async (body: DespesaFormData) => {
  const user = auth.currentUser;

  const addDespesasCollectionRef = collection(db, "despesas");

  try {
    const data = {
      uid: user?.uid,
      timestamp: dayjs().toDate(),
      updateAt: dayjs().toDate(),
      type: "descontar",
      ...body,
    };
    const response = await addDoc(addDespesasCollectionRef, data);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateDespesaAccess = async (
  body: DespesaFormData,
  id: string
) => {
  try {
    const despesa = doc(db, "despesas", id);
    const newBody = {
      ...body,
      updateAt: dayjs().toDate(),
    };
    const response = await updateDoc(despesa, newBody);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDespesaAccess = async (id: string) => {
  try {
    const despesa = doc(db, "despesas", id);
    const response = await deleteDoc(despesa);
    return response;
  } catch (error) {
    console.error(error);
  }
};
