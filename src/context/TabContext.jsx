import { createContext, useState, useContext } from "react";

const TabContext = createContext();

const TabProvider = ({ children }) => {
  const [tab, setTab] = useState(null);

  const values = {
    tab,
    setTab,
  };
  return <TabContext.Provider value={values}>{children}</TabContext.Provider>;
};

const useTab = () => useContext(TabContext);

export { useTab, TabProvider };
