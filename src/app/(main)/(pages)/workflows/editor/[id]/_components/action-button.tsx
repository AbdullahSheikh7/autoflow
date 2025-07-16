import { postContentToWebhook } from "@/app/(main)/(pages)/connections/_actions/discord-connetion";
import { Button } from "@/components/ui/button";
import { ConnectionProviderProps } from "@/providers/connection-provider";
import { Option } from "@/store";
import { usePathname } from "next/navigation";
import React, { useCallback } from "react";
import { toast } from "sonner";
import { onCreateNodeTemplate } from "../../../_actions/workflow-connections";
import { onCreateNewPageInDatabase } from "@/app/(main)/(pages)/connections/_actions/notion-connetion";
import { postMessageToSlack } from "@/app/(main)/(pages)/connections/_actions/slack-connetion";

type Props = {
  currentService: string;
  nodeConnection: ConnectionProviderProps;
  channels: Option[];
  setChannels: (channels: Option[]) => void;
};

const ActionButton = ({
  channels,
  currentService,
  nodeConnection,
  setChannels,
}: Props) => {
  const path = usePathname();

  const onSendDiscordMessage = useCallback(async () => {
    const response = await postContentToWebhook(
      nodeConnection.discordNode.content,
      nodeConnection.discordNode.webhookURL
    );

    if (response.message === "success") {
      nodeConnection.setDiscordNode((prev: any) => ({ ...prev, content: "" }));
    }
  }, [nodeConnection.discordNode]);

  const onCreateLocalNodeTemplate = useCallback(async () => {
    if (currentService === "Discord") {
      const response = await onCreateNodeTemplate(
        nodeConnection.discordNode.content,
        currentService,
        path.split("/").pop()!
      );

      if (response) {
        toast.message(response);
      }
    }

    if (currentService === "Slack") {
      const response = await onCreateNodeTemplate(
        nodeConnection.slackNode.content,
        currentService,
        path.split("/").pop()!,
        channels,
        nodeConnection.slackNode.slackAccessToken
      );

      if (response) {
        toast.message(response);
      }
    }

    if (currentService === "Notion") {
      const response = await onCreateNodeTemplate(
        JSON.stringify(nodeConnection.notionNode.content),
        currentService,
        path.split("/").pop()!,
        channels,
        undefined,
        nodeConnection.notionNode.databaseId
      );

      if (response) {
        toast.message(response);
      }
    }
  }, [nodeConnection, channels]);

  const onStoreNotionContent = useCallback(async () => {
    const response = await onCreateNewPageInDatabase(
      nodeConnection.notionNode.databaseId,
      nodeConnection.notionNode.accessToken,
      nodeConnection.notionNode.content
    );

    if (response) {
      nodeConnection.setNotionNode((prev: any) => ({
        ...prev,
        content: "",
      }));
    }
  }, [nodeConnection.notionNode]);

  const onStoreSlackContent = useCallback(async () => {
    const response = await postMessageToSlack(
      nodeConnection.slackNode.slackAccessToken,
      channels,
      nodeConnection.slackNode.content
    );

    if (response.message === "success") {
      toast.success("Message sent successfully");
      nodeConnection.setSlackNode((prev: any) => ({
        ...prev,
        content: "",
      }));
      setChannels!([]);
    } else {
      toast.error(response.message);
    }
  }, [nodeConnection.slackNode, channels]);

  const renderActionButton = () => {
    switch (currentService) {
      case "Discord":
        return (
          <>
            <Button variant="outline" onClick={onSendDiscordMessage}>
              Test message
            </Button>
            <Button variant="outline" onClick={onCreateLocalNodeTemplate}>
              Save Template
            </Button>
          </>
        );
      case "Notion":
        return (
          <>
            <Button variant="outline" onClick={onStoreNotionContent}>
              Test
            </Button>
            <Button variant="outline" onClick={onCreateLocalNodeTemplate}>
              Save Template
            </Button>
          </>
        );
      case "Slack":
        return (
          <>
            <Button variant="outline" onClick={onStoreSlackContent}>
              Send message
            </Button>
            <Button variant="outline" onClick={onCreateLocalNodeTemplate}>
              Save Template
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return renderActionButton();
};

export default ActionButton;
