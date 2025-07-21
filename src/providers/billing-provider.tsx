"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type BillingProviderProps = {
  credits: string;
  tier: string;
  setCredits: Dispatch<SetStateAction<string>>;
  setTier: Dispatch<SetStateAction<string>>;
};

const initialValues: BillingProviderProps = {
  credits: "",
  setCredits: () => undefined,
  tier: "",
  setTier: () => undefined,
};

type WithChildProps = {
  children: ReactNode;
};

const context = createContext(initialValues);
const { Provider } = context;

export const BillingProvider = ({ children }: WithChildProps) => {
  const [credits, setCredits] = useState(initialValues.credits);
  const [tier, setTier] = useState(initialValues.tier);

  const values = {
    credits,
    setCredits,
    tier,
    setTier,
  };

  return <Provider value={values}>{children}</Provider>;
};

export const useBilling = () => {
  const state = useContext(context);
  return state;
};
