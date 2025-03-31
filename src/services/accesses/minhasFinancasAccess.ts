import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import dayjs from "dayjs";

import { RendaFormData } from "../../pages/minhasFinancas/components/modals/RendaFormModal";
import { DespesaFormData } from "../../pages/minhasFinancas/components/modals/DespesaFormModal";
import { TransactionType } from "../interfaces/dashboardInterfaces";
import { BalanceType } from "../interfaces/minhasFinancas";
import { auth, db } from "../../config/firebaseConfig";

export const updateBalanceAccess = async (
  newBalance: BalanceType
): Promise<BalanceType> => {
  try {
    const balanceDoc = doc(db, "saldos", newBalance.id);
    const newBody = {
      ...newBalance,
      balance: newBalance.balance,
      updated_at: dayjs().toDate(),
    };
    await updateDoc(balanceDoc, newBody);
    const snapData = await getDoc(balanceDoc);

    return snapData.data() as BalanceType;
  } catch (error) {
    console.error(error);
    return {} as BalanceType;
  }
};

export const getRendasAccess = async (): Promise<TransactionType[]> => {
  const user = auth.currentUser;

  try {
    const incomesRef = collection(db, "rendas");
    const incomesQuery = query(
      incomesRef,
      where("uid", "==", user?.uid),
      orderBy("updated_at", "desc")
    );
    const querySnapshot = await getDocs(incomesQuery);
    const incomes = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return incomes as TransactionType[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addRendaAccess = async (body: RendaFormData) => {
  const user = auth.currentUser;

  const addRendasCollectionRef = collection(db, "rendas");

  try {
    const data = {
      uid: user?.uid,
      created_at: dayjs().toDate(),
      updated_at: dayjs().toDate(),
      type: "adicionar",
      ...body,
    };
    const response = await addDoc(addRendasCollectionRef, data);
    const snapData = await getDoc(response);

    return snapData.data();
  } catch (error) {
    console.error(error);
  }
};

export const updateRendaAccess = async (body: RendaFormData, id: string) => {
  try {
    const renda = doc(db, "rendas", id);
    const newBody = {
      ...body,
      updated_at: dayjs().toDate(),
    };
    await updateDoc(renda, newBody);
    const snapData = await getDoc(renda);

    return snapData.data();
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

export const getDespesasAccess = async (): Promise<TransactionType[]> => {
  const user = auth.currentUser;

  try {
    const expensesRef = collection(db, "despesas");
    const expensesQuery = query(
      expensesRef,
      where("uid", "==", user?.uid),
      orderBy("updated_at", "desc")
    );
    const querySnapshot = await getDocs(expensesQuery);
    const expenses = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return expenses as TransactionType[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addDespesaAccess = async (body: DespesaFormData) => {
  const user = auth.currentUser;

  const addDespesasCollectionRef = collection(db, "despesas");

  try {
    const data = {
      uid: user?.uid,
      created_at: dayjs().toDate(),
      updated_at: dayjs().toDate(),
      type: "descontar",
      ...body,
    };
    const response = await addDoc(addDespesasCollectionRef, data);
    const snapData = await getDoc(response);

    return snapData.data();
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
      updated_at: dayjs().toDate(),
    };
    await updateDoc(despesa, newBody);
    const snapData = await getDoc(despesa);

    return snapData.data();
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
