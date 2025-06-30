"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import React, { Dispatch, createContext, useContext, useReducer } from "react";

type PositionType = "top" | "right" | "bottom" | "left";

// [Top, Right, Bottom, Left]
const position: Record<
  PositionType,
  [number, number, number, number, number, string, string, string]
> = {
  top: [-48, 16, 48, 16, 20, "-translate-x-1/2", "-bottom-px", "left-1/2"],
  right: [16, -48, -16, 48, -20, "-translate-y-1/2", "-left-px", "top-1/2"],
  bottom: [48, -16, -48, 16, -20, "-translate-x-1/2", "-top-px", "left-1/2"],
  left: [-16, 48, 16, -112, 20, "translate-y-1/2", "-right-px", "top-1/2"],
};

export type TooltipType = {
  enabled: boolean;
  name: string;
  left: number;
  top: number;
  position: PositionType;
};

const axis: Record<PositionType, "x" | "y"> = {
  top: "y",
  left: "x",
  bottom: "y",
  right: "x",
};

type TooltipActionType =
  | { type: "SET"; payload: TooltipType[] }
  | { type: "UPDATE"; payload: TooltipType[] };

const tooltipReducer = (
  state: TooltipType[],
  action: TooltipActionType
): TooltipType[] => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "UPDATE":
      return action.payload;
  }
};

const initialState: TooltipType[] = [];

const TooltipContext = createContext<{
  state: TooltipType[];
  dispatch: Dispatch<TooltipActionType>;
}>({ state: initialState, dispatch: () => undefined });

export const TooltipProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(tooltipReducer, initialState);

  return (
    <TooltipContext.Provider value={{ state, dispatch }}>
      {state.map((item, i) => {
        return (
          <AnimatePresence key={i} mode="popLayout">
            {item.enabled && (
              <motion.div
                initial={{
                  opacity: 0,
                  [axis[item.position]]: position[item.position][4],
                  scale: 0.6,
                }}
                animate={{
                  opacity: 1,
                  [axis[item.position]]: 0,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 750,
                  damping: 15,
                }}
                exit={{
                  opacity: 0,
                  [axis[item.position]]: position[item.position][4],
                  scale: 0.6,
                }}
                className={clsx(
                  "fixed z-50 flex flex-col items-center justify-center rounded-md bg-gray-800/50 backdrop-blur-xl px-4 py-2 text-xs shadow-xl",
                  position[item.position][5]
                )}
                style={{
                  left: item.left + position[item.position][3],
                  top: item.top + position[item.position][0],
                }}
              >
                <div
                  className={clsx(
                    "absolute z-30 from-transparent via-emerald-500 to-transparent",
                    axis[item.position] === "x" ? " inset-x-10" : "inset-y-10",
                    axis[item.position] === "x"
                      ? "bg-gradient-to-t"
                      : "bg-gradient-to-l",
                    position[item.position][6],
                    axis[item.position] === "x"
                      ? "w-px h-[20%]"
                      : "h-px w-[20%] "
                  )}
                />
                <div
                  className={clsx(
                    "absolute z-30 from-transparent via-sky-500 to-transparent",
                    axis[item.position] === "x"
                      ? "bg-gradient-to-t"
                      : "bg-gradient-to-l",
                    position[item.position][6],
                    axis[item.position] === "x"
                      ? "w-px h-[40%]"
                      : "h-px w-[40%] "
                  )}
                />
                <div className="relative z-30 text-xs font-bold text-white text-center">
                  {item.name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => {
  const context = useContext(TooltipContext);

  if (!context)
    throw new Error("useEditor hook must be used within the tooltip provider");

  return context;
};

export default TooltipProvider;
