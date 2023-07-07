import React, { useContext } from "react";
import useAnnounce from "../hooks/useAnnounce";

const AnnounceContext = React.createContext();

export function useAnnounceContext() {
  return useContext(AnnounceContext);
}

export const AnnounceProvider = ({ children }) => {
  const { data: announces, isLoading, mutate } = useAnnounce();

  return (
    <AnnounceContext.Provider value={{ announces, isLoading, mutate }}>
      {children}
    </AnnounceContext.Provider>
  );
};
