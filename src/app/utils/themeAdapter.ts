import { useAppContext } from "@/context/AppContext";

// Em src/utils/themeAdapter.ts ou equivalente
export const useTheme = () => {
  const context = useAppContext();
  return { 
    theme: context.theme, 
    toggleTheme: context.toggleTheme, 
    setTheme: context.setTheme, 
    isDashboard: false 
  };
};