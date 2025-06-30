"use client";

import { useContext, createContext, useState } from "react";

type DiscordNodeType = {
  webhookURL: string;
  content: string;
  webhookName: string;
  guildName: string;
};

type NotionNodeType = {
  accessToken: string;
  databaseId: string;
  workspaceName: string;
  content: {
    name: string;
    kind: string;
    type: string;
  };
};

type SlackNodeType = {
  appId: string;
  authedUserId: string;
  authedUserToken: string;
  slackAccessToken: string;
  botUserId: string;
  teamId: string;
  teamName: string;
  content: string;
};

type WorkflowTemplateType = {
  discord?: string;
  notion?: {
    name: string;
    kind: string;
    type: string;
  };
  slack?: string;
};

export type ConnectionProviderProps = {
  discordNode: DiscordNodeType;
  setDiscordNode: React.Dispatch<React.SetStateAction<DiscordNodeType>>;
  googleNode: {}[];
  setGoogleNode: React.Dispatch<React.SetStateAction<any>>;
  notionNode: NotionNodeType;
  setNotionNode: React.Dispatch<React.SetStateAction<NotionNodeType>>;
  slackNode: SlackNodeType;
  setSlackNode: React.Dispatch<React.SetStateAction<SlackNodeType>>;
  workflowTemplate: WorkflowTemplateType;
  setWorkflowTemplate: React.Dispatch<
    React.SetStateAction<WorkflowTemplateType>
  >;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const initialValues: ConnectionProviderProps = {
  discordNode: {
    webhookURL: "",
    content: "",
    webhookName: "",
    guildName: "",
  },
  setDiscordNode: () => undefined,
  googleNode: [],
  setGoogleNode: () => undefined,
  notionNode: {
    accessToken: "",
    databaseId: "",
    workspaceName: "",
    content: {
      name: "",
      kind: "",
      type: "",
    },
  },
  setNotionNode: () => undefined,
  slackNode: {
    appId: "",
    authedUserId: "",
    authedUserToken: "",
    slackAccessToken: "",
    botUserId: "",
    teamId: "",
    teamName: "",
    content: "",
  },
  setSlackNode: () => undefined,
  workflowTemplate: {},
  setWorkflowTemplate: () => undefined,
  isLoading: false,
  setIsLoading: () => undefined,
};

type ConnectionWithChildProps = {
  children: React.ReactNode;
};

const ConnectionContext = createContext<ConnectionProviderProps>(initialValues);

const ConnectionProvider = ({ children }: ConnectionWithChildProps) => {
  const [discordNode, setDiscordNode] = useState(initialValues.discordNode);
  const [googleNode, setGoogleNode] = useState(initialValues.googleNode);
  const [notionNode, setNotionNode] = useState(initialValues.notionNode);
  const [slackNode, setSlackNode] = useState(initialValues.slackNode);
  const [isLoading, setIsLoading] = useState(initialValues.isLoading);
  const [workflowTemplate, setWorkflowTemplate] = useState(
    initialValues.workflowTemplate
  );

  const values = {
    discordNode,
    googleNode,
    notionNode,
    slackNode,
    isLoading,
    workflowTemplate,
    setDiscordNode,
    setGoogleNode,
    setNotionNode,
    setSlackNode,
    setIsLoading,
    setWorkflowTemplate,
  };

  return (
    <ConnectionContext.Provider value={values}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const nodeConnection = useContext(ConnectionContext);
  return { nodeConnection };
};

export default ConnectionProvider;
