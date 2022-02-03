import {
  createContext,
  useContext,
  PropsWithChildren,
  ComponentType,
  useState,
} from "react";

const ErrorContext = createContext<((error: Error) => any) | null>(null);

export const useThrow = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error("ErrorContext not set!");
  return context;
};

export const ErrorProvider = ({ children }: PropsWithChildren<{}>) => {
  const [error, setError] = useState<Error | null>(null);
  if (error) {
    throw error;
  }

  return (
    <ErrorContext.Provider value={setError}>{children}</ErrorContext.Provider>
  );
};
