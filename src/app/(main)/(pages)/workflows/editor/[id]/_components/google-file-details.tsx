import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { onAddTemplate } from "@/lib/editor-utils";
import { ConnectionProviderProps } from "@/providers/connection-provider";
import React from "react";

type Props = {
  nodeConnection: ConnectionProviderProps;
  title: string;
  gFile: any;
};

const googleFileIsNotEmpty = (file: any): boolean => {
  return Object.keys(file).length > 0 && file.kind !== "";
};

const GoogleFileDetails = ({ nodeConnection, title, gFile }: Props) => {
  if (!googleFileIsNotEmpty(gFile)) return null;

  const details = ["kind", "name", "mimeType"];

  if (title === "Google Drive") {
    details.push("id");
  }
  return (
    <div className="flex flex-wrap gap-2">
      <Card className="flex-row">
        <CardContent className="flex w-full flex-wrap gap-2 p-4">
          {details.map((details) => (
            <div
              key={details}
              onClick={() =>
                onAddTemplate(nodeConnection, title, gFile[details])
              }
              className="flex cursor-pointer gap-2 rounded-full bg-white px-3 py-1 text-gray-500"
            >
              {details}:{" "}
              <CardDescription className="text-black">
                {gFile[details]}
              </CardDescription>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleFileDetails;
