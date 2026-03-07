"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { Client } from "@notionhq/client";

export const onNotionConnect = async (
  access_token: string,
  workspace_id: string,
  workspace_icon: string,
  workspace_name: string,
  database_id: string,
  id: string
) => {
  if (access_token) {
    const notion_connected = await db.notion.findFirst({
      where: {
        accessToken: access_token,
      },
      include: {
        connections: {
          select: {
            type: true,
          },
        },
      },
    });

    if (!notion_connected) {
      await db.notion.create({
        data: {
          userId: id,
          accessToken: access_token,
          databaseId: database_id,
          workspaceId: workspace_id!,
          workspaceIcon: workspace_icon!,
          workspaceName: workspace_name!,
          connections: {
            create: {
              userId: id,
              type: "Notion",
            },
          },
        },
      });
    }
  }
};

export const getNotionConnection = async () => {
  const user = await currentUser();

  if (user) {
    const connection = await db.notion.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (connection) {
      return connection;
    }
  }
};

export const getNotionDatabase = async (
  databaseId: string,
  accessToken: string
) => {
  const notion = new Client({
    auth: accessToken,
  });
  const response = await notion.databases.retrieve({ database_id: databaseId });
  return response;
};

export const onCreateNewPageInDatabase = async (
  databaseId: string,
  accessToken: string,
  content: string
) => {
  const notion = new Client({
    auth: accessToken,
  });
  const response = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: databaseId,
    },
    properties: {
      name: [
        {
          text: {
            content,
          },
        },
      ],
      // WIP: Add these fieldss
      // type: [
      //   {
      //     text: {
      //       content: content.type,
      //     },
      //   },
      // ],
      // kind: [
      //   {
      //     text: {
      //       content: content.kind,
      //     },
      //   },
      // ],
    },
  });

  if (response) {
    return response;
  }
};
