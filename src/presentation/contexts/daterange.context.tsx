"use client";

import React, { createContext, useContext, useState } from "react";


interface DateRangeContextType {
  range: string;
  setRange: (range: string) => void;
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(
  undefined
);

export const DateRangeProvider = ({ children }: { children: React.ReactNode }) => {
  const [range, setRange] = useState<string>("month");

  return (
    <DateRangeContext.Provider value={{ range, setRange }}>
      {children}
    </DateRangeContext.Provider>
  );
};

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used inside DateRangeProvider");
  }
  return context;
};
