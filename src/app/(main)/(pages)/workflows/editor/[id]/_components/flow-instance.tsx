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
  id: string;
  edges: Editor["edges"];
  nodes: Editor["elements"];
  children: React.ReactNode;
};

const FlowInstance = ({ id, children, edges, nodes }: Props) => {
  const [isFlow, setIsFlow] = useState([]);
  const { nodeConnection } = useConnection();

  const onFlowAutomation = useCallback(async () => {
    console.log(edges, nodes);
    const flow = await onCreateNodesEdges(
      id,
      JSON.stringify(nodes),
      JSON.stringify(edges),
      JSON.stringify(isFlow)
    );

    if (flow) toast.message(flow.message);
  }, [nodeConnection]);

  const onPublishWorkflow = useCallback(async () => {
    const response = await onFlowPublish(id, true);
    if (response) toast.message(response);
  }, []);

  const onAutomateFlow = async () => {
    const flows: any = [];
    const connectedEdges = edges.map((edge) => edge.target);
    console.log(edges, nodes);
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
