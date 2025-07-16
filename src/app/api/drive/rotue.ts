"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export const GET = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CLIENT_OAUTH2_REDIRECT_URI
  );

  const { userId } = await auth();

  if (!userId) {
    return { message: "User not found" };
  }

  const clerkResponse = await (
    await clerkClient()
  ).users.getUserOauthAccessToken(userId, "google");

  const access_token = clerkResponse.data[0].token;

  oauth2Client.setCredentials({
    access_token,
  });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  try {
    const response = await drive.files.list();

    if (response) {
      return NextResponse.json({ message: response.data }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No files foudn" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
