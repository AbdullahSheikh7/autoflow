"use client";

import { EditorCanvasTypes, EditorNodeType } from "@/lib/types";
import { useEditor } from "@/providers/editor-provider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CONNECTIONS, EditorCanvasDefaultCardTypes } from "@/lib/constant";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { onConnections, onDragStart } from "@/lib/editor-utils";
import EditorCanvasIconHelper from "./editor-canvas-icon-helper";
import { Separator } from "@/components/ui/separator";
import { useConnection } from "@/providers/connection-provider";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import RenderConnectionAccordion from "./render-connection-accordion";
import RenderOutputAccordion from "./render-output-accordion";
import { useAutoflowStore } from "@/store";
import { useEffect } from "react";

type Props = {
  nodes: EditorNodeType[];
};

const EditorCanvasSidebar = ({ nodes }: Props) => {
  const { state } = useEditor();
  const { nodeConnection } = useConnection();
  const { googleFile, setSlackChannels } = useAutoflowStore();

  useEffect(() => {
    if (state) {
      onConnections(nodeConnection, state, googleFile);
    }
  }, [state]);

  return (
    <aside className="flex-1 overflow-hidden">
      <Tabs defaultValue="actions" className="h-full">
        <TabsList className="bg-transparent">
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent
          value="actions"
          className="flex flex-col gap-4 p-4 overflow-scroll"
        >
          {Object.entries(EditorCanvasDefaultCardTypes)
            .filter(
              ([_, cardType]) =>
                (!nodes.length && cardType.type === "Trigger") ||
                (nodes.length && cardType.type === "Action")
            )
            .map(([cardKey, cardValue]) => (
              <Card
                key={cardKey}
                draggable
                className="w-full cursor-grab flex-row border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                onDragStart={(event) =>
                  onDragStart(event, cardKey as EditorCanvasTypes)
                }
              >
                <CardHeader className="flex flex-row w-full items-center gap-4 p-4">
                  <EditorCanvasIconHelper type={cardKey as EditorCanvasTypes} />
                  <CardTitle className="text-md">
                    {cardKey}
                    <CardDescription>{cardValue.description}</CardDescription>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="settings">
          <div className="py-2 px-2 text-xl text-center font-bold">
            {state.editor.selectedNode.data.title}
          </div>

          <Accordion type="multiple">
            <AccordionItem value="Options" className="border-y-[1px] px-2">
              <AccordionTrigger className="!no-underline">
                Account
              </AccordionTrigger>
              <AccordionContent>
                {CONNECTIONS.map((connection) => (
                  <RenderConnectionAccordion
                    key={connection.title}
                    state={state}
                    connection={connection}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Expected Output" className="px-2">
              <AccordionTrigger className="!no-underline">
                Action
              </AccordionTrigger>
              <RenderOutputAccordion
                state={state}
                nodeConnection={nodeConnection}
              />
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default EditorCanvasSidebar;
