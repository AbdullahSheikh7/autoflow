import { useEditor } from "@/providers/editor-provider";
import { Handle, HandleProps, useStore } from "@xyflow/react";
import React, { CSSProperties } from "react";

const debugSelector = (s: any) => {
  console.log("Full state:", s);
  return s;
};

type Props = HandleProps & { style?: CSSProperties };

const CustomHandle = (props: Props) => {
  const { state } = useEditor();

  // WIP: WTF is this?
  // const fullState = useStore(debugSelector);
  // console.log(fullState);

  return (
    <Handle
      {...props}
      isValidConnection={(e) => {
        const sourcesFromHandleInState = state.editor.edges.filter(
          (edge) => edge.source === e.source
        ).length;
        const sourceNode = state.editor.elements.find(
          (node) => node.id === e.source
        );
        const targetFromHandleInState = state.editor.edges.filter(
          (edge) => edge.target === e.target
        ).length;

        if (targetFromHandleInState === 1) return false;

        if (sourceNode?.type === "Condition") return true;

        if (sourcesFromHandleInState === 0) return true;

        return false;
      }}
      className="!h-4 !w-4 dark:bg-neutral-800"
    />
  );
};

export default CustomHandle;
