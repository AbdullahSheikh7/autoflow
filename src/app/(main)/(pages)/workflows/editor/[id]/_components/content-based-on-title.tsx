"use client";

import { AccordionContent } from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { onContentChange } from "@/lib/editor-utils";
import { nodeMapper } from "@/lib/types";
import { ConnectionProviderProps } from "@/providers/connection-provider";
import { EditorState } from "@/providers/editor-provider";
import { Option } from "@/store";
import React, { useEffect } from "react";
import GoogleFileDetails from "./google-file-details";
import GoogleDriveFiles from "./google-drive-files";
import ActionButton from "./action-button";
import axios from "axios";
import { toast } from "sonner";

type Props = {
  nodeConnection: ConnectionProviderProps;
  newState: EditorState;
  file: any;
  setFile: (file: any) => void;
  selectedSlackChannels: Option[];
  setSelectedSlackChannels: (selectedSlackChannels: Option[]) => void;
};

const ContentBasedOnTitle = ({
  nodeConnection,
  file,
  newState,
  selectedSlackChannels,
  setFile,
  setSelectedSlackChannels,
}: Props) => {
  const { selectedNode } = newState.editor;
  const title = selectedNode.data.title;

  useEffect(() => {
    const reqGoogle = async () => {
      const response: { data: { message: { files: any } } } = await axios.get(
        "/api/drive"
      );

      if (response) {
        toast.message(JSON.stringify(response.data.message.files[0]));
        setFile(response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    };

    reqGoogle();
  }, []);

  const nodeConnectionType: any =
    nodeConnection[nodeMapper[title] as keyof ConnectionProviderProps];

  if (!nodeConnectionType) return <p>Not connected</p>;

  const isConnected =
    title === "Google Drive"
      ? !nodeConnection.isLoading
      : !!nodeConnectionType[
          `${
            title === "Slack"
              ? "slackAccessToken"
              : title === "Discord"
              ? "webhookUrl"
              : title === "Notion"
              ? "accessToken"
              : ""
          }`
        ];

  return (
    <AccordionContent>
      <Card className="flex-row">
        {title === "Discord" && (
          <CardHeader className="w-full">
            <CardTitle>{nodeConnectionType.webhookName}</CardTitle>
            <CardDescription>{nodeConnectionType.guildName}</CardDescription>
          </CardHeader>
        )}
        <div className="flex flex-col gap-3 px-6 py-3 pb-20">
          <p>{"Message"}</p>
          <Input
            type="text"
            value={nodeConnectionType.content}
            onChange={(event) => {
              onContentChange(nodeConnection, title, event);
            }}
          />
          {JSON.stringify(file) !== "{}" && title !== "Google Drive" && (
            <Card className="flex-row w-full">
              <CardContent className="px-2 py-3">
                <div className="flex flex-col gap-4">
                  <CardDescription>Drive File</CardDescription>
                  <div className="flex flex-wrap gap-2">
                    <GoogleFileDetails
                      nodeConnection={nodeConnection}
                      title={title}
                      gFile={file}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {title === "Google Drive" && <GoogleDriveFiles />}
          <ActionButton
            currentService={title}
            nodeConnection={nodeConnection}
            channels={selectedSlackChannels}
            setChannels={setSelectedSlackChannels}
          />
        </div>
      </Card>
    </AccordionContent>
  );
};

export default ContentBasedOnTitle;
