import { ConnectionProviderProps } from "@/providers/connection-provider";
import { Option } from "@/store";
import React from "react";

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
  return <div>ActionButton</div>;
};

export default ActionButton;
