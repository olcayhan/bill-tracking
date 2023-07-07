import React, { useContext } from "react";
import useBills from "../hooks/useBills";

const BillContext = React.createContext();

export function useBillsContext() {
  return useContext(BillContext);
}

export const BillProvider = ({ children }) => {
  const { data: bills, isLoading, mutate } = useBills();

  return (
    <BillContext.Provider value={{ bills, isLoading, mutate }}>
      {children}
    </BillContext.Provider>
  );
};
