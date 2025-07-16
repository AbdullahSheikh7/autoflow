import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");
  const encoded = Buffer.from(
    `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_API_SECRET}`
  ).toString("base64");

  if (code) {
    const response = await axios.post(
      "https://api.notion.com/v1/oauth/token",
      JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NOTION_REDIRECT_URI!,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encoded}`,
          "Notion-Version": "2022-06-28",
        },
      }
    );

    if (response.data) {
      const notion = new Client({
        auth: response.data.access_token,
      });

      const databasePages = await notion.search({
        filter: {
          value: "database",
          property: "object",
        },
        sort: {
          direction: "ascending",
          timestamp: "last_edited_time",
        },
      });

      const databaseId = databasePages?.results?.length
        ? databasePages.results[0].id
        : "";

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/connections?access_token=${response.data.access_token}&workspace_name=${response.data.workspace_name}&workspace_icon=${response.data.workspace_icon}&workspace_id=${response.data.workspace_id}&database_id=${databaseId}`
      );
    }
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/connections`);
};
