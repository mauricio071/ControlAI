import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { Sidebar } from "./shared/components/Sidebar";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Sidebar>
          <AppRoutes />
        </Sidebar>
      </BrowserRouter>
    </>
  );
};
