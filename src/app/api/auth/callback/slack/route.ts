import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return new NextResponse("Code not provided", { status: 400 });
  }

  try {
    const response = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      new URLSearchParams({
        code,
        client_id: process.env.SLACK_CLIENT_ID!,
        client_secret: process.env.SLACK_CLIENT_SECRET!,
        redirect_uri: process.env.SLACK_REDIRECT_URI!,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.data) {
      const appId = response.data?.app_id;
      const userId = response.data?.authed_user?.id;
      const userToken = response.data?.authed_user?.access_token;
      const accessToken = response.data?.access_token;
      const botUserId = response.data?.bot_user_id;
      const teamId = response.data?.team?.id;
      const teamName = response.data?.team?.name;

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/connections?app_id=${appId}&authed_user_id=${userId}&authed_user_token=${userToken}&slack_access_token=${accessToken}&bot_user_id=${botUserId}&team_id=${teamId}&team_name=${teamName}`
      );
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
