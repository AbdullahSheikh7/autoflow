"use client";

import ConnectionCard from "@/app/(main)/(pages)/connections/_components/connection-card";
import MultipleSelector from "@/components/ui/multiple-selector";
import { Connection } from "@/lib/types";
import { useConnection } from "@/providers/connection-provider";
import { EditorState } from "@/providers/editor-provider";
import { useAutoflowStore } from "@/store";

type Props = {
  connection: Connection;
  state: EditorState;
};

const RenderConnectionAccordion = ({ connection, state }: Props) => {
  const {
    connectionKey,
    description,
    image,
    title,
    accessTokenKey,
    alwaysTrue,
    slackSpecial,
  } = connection;

  const { nodeConnection } = useConnection();
  const { slackChannels, selectedSlackChannels, setSelectedSlackChannels } =
    useAutoflowStore();

  const connectionData = (nodeConnection as any)[connectionKey];
  const isConnected =
    alwaysTrue ||
    (nodeConnection[connectionKey] &&
      accessTokenKey &&
      connectionKey === "discordNode" &&
      accessTokenKey === "webhookUrl" &&
      connectionData[accessTokenKey]);

  return (
    <>
      {state.editor.selectedNode.data.title === title && (
        <>
          <ConnectionCard
            title={title}
            icon={image}
            description={description}
            type={title}
            connected={{ [title]: isConnected }}
          />
          {slackSpecial && isConnected && (
            <div className="p-6">
              {slackChannels.length ? (
                <>
                  <div className="mb-4 ml-1">
                    Select the slack channels to send notifications and
                    messages:
                  </div>
                  <MultipleSelector
                    value={selectedSlackChannels}
                    onChange={setSelectedSlackChannels}
                    defaultOptions={slackChannels}
                    placeholder="Select channels"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found
                      </p>
                    }
                  />
                </>
              ) : (
                "No slack channels found. Please add your Slack bot to your Slack channel"
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RenderConnectionAccordion;
