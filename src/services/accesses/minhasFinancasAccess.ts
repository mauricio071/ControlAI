import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import dayjs from "dayjs";

import { RendaFormData } from "../../pages/minhasFinancas/components/modals/RendaFormModal";
import { DespesaFormData } from "../../pages/minhasFinancas/components/modals/DespesaFormModal";
import { BalanceType } from "../interfaces/minhasFinancas";

export const updateBalanceAccess = async (newBalance: BalanceType) => {
  try {
    const balanceDoc = doc(db, "saldos", newBalance.id);
    const newBody = {
      balance: newBalance.balance,
      updateAt: dayjs().toDate(),
    };
    const response = await updateDoc(balanceDoc, newBody);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getRendasAccess = async () => {
  const user = auth.currentUser;

  try {
    const incomesRef = collection(db, "rendas");
    const incomesQuery = query(
      incomesRef,
      where("uid", "==", user?.uid),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(incomesQuery);
    const incomes = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return incomes;
  } catch (error) {
    console.error(error);
  }
};

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

export const getDespesasAccess = async () => {
  const user = auth.currentUser;

  try {
    const expensesRef = collection(db, "despesas");
    const expensesQuery = query(
      expensesRef,
      where("uid", "==", user?.uid),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(expensesQuery);
    const expenses = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return expenses;
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
