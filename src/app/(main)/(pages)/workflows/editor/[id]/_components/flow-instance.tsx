import { Button } from "@/components/ui/button";
import { Editor } from "@/providers/editor-provider";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  onCreateNodesEdges,
  onFlowPublish,
} from "../_actions/workflow-connections";
import { useConnection } from "@/providers/connection-provider";

type Props = {
  children: React.ReactNode;
  edges: Editor["edges"];
  nodes: Editor["elements"];
};

const FlowInstance = ({ children, edges, nodes }: Props) => {
  const path = usePathname();
  const [isFlow, setIsFlow] = useState([]);
  const { nodeConnection } = useConnection();

  const onFlowAutomation = useCallback(async () => {
    const flow = await onCreateNodesEdges(
      path.split("/").pop()!,
      JSON.stringify(nodes),
      JSON.stringify(edges),
      JSON.stringify(isFlow)
    );

    if (flow) toast.message(flow.message);
  }, [nodeConnection]);

  const onPublishWorkflow = useCallback(async () => {
    const response = await onFlowPublish(path.split("/").pop()!, true);
    if (response) toast.message(response);
  }, []);

  const onAutomateFlow = async () => {
    const flows: any = [];
    const connectedEdges = edges.map((edge) => edge.target);
    connectedEdges.map((target) => {
      nodes.forEach((node) => {
        if (node.id === target) {
          flows.push(node.type);
        }
      });
    });
    setIsFlow(flows);
  };

  useEffect(() => {
    onAutomateFlow();
  }, [edges]);

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex gap-3 p-4">
        <Button onClick={onFlowAutomation} disabled={isFlow.length < 1}>
          Save
        </Button>
        <Button onClick={onPublishWorkflow} disabled={isFlow.length < 1}>
          Publish
        </Button>
      </div>
      {children}
    </div>
  );
};

export default FlowInstance;
