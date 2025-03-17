import { collection, onSnapshot, query, where } from "firebase/firestore";

import { auth, db } from "../../config/firebaseConfig";
import { DashboardType } from "../interfaces/dashboardInterfaces";

export const getDashboardAccess = async (
  callBack: React.Dispatch<React.SetStateAction<DashboardType>>
) => {
  const user = auth.currentUser;

  const dashboardCollectionRef = collection(db, "dashboard");

  try {
    const dashboardQuery = query(
      dashboardCollectionRef,
      where("uid", "==", user?.uid)
    );

    onSnapshot(dashboardQuery, (collection) => {
      const dashboardInfo = collection.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(dashboardInfo);
    });
  } catch (error) {
    console.error(error);
  }
};
