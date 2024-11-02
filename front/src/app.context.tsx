import {
  useState,
  createContext,
  useMemo,
  ReactElement,
  Dispatch,
  SetStateAction,
} from "react";
import { IUserAuth } from "./interfaces/auth.interfaces";

interface IAppContext {
  authorization: IUserAuth;
  setAuthorization: Dispatch<SetStateAction<IUserAuth>>;
  validateActionAccess: (indicator: string) => boolean;
}

interface IProps {
  children: ReactElement | ReactElement[];
}

export const AppContext = createContext<IAppContext>({
  authorization: {} as IUserAuth,
  setAuthorization: () => {},
  validateActionAccess: () => false,
});

export function AppContextProvider({ children }: Readonly<IProps>) {
  // States
  const [authorization, setAuthorization] = useState<IUserAuth>({
    token: "",
  } as IUserAuth);

  function validateActionAccess(_indicator: string): boolean {
    return true;
  }

  const values = useMemo<IAppContext>(() => {
    return {
      authorization,
      setAuthorization,
      validateActionAccess,
    };
  }, [authorization]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
