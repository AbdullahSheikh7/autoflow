import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { id, email_addresses, image_url, first_name } = body?.data;
    const email = email_addresses[0]?.email_address;

    await db.user.upsert({
      where: { clerkId: id },
      update: {
        email,
        name: first_name,
        profileImage: image_url,
      },
      create: {
        clerkId: id,
        email,
        name: first_name || "",
        profileImage: image_url || "",
      },
    });

    return new NextResponse("User updated in the database successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating database: ", error);
    return new NextResponse("Error updating user in the database", {
      status: 500,
    });
  }
};
