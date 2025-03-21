import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface DrawerOption {
  icon: string;
  label: string;
  path: string;
}

interface DrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: DrawerOption[];
  setDrawerOptions: (newDrawerOptions: DrawerOption[]) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const DrawerContext = createContext({} as DrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider = ({ children }: AppProviderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<DrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback(
    (newDrawerOptions: DrawerOption[]) => setDrawerOptions(newDrawerOptions),
    []
  );

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawerOpen,
        drawerOptions,
        setDrawerOptions: handleSetDrawerOptions,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
