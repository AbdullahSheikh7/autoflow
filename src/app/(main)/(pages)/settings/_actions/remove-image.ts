"use server";

import { User } from "@/generated/prisma";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const removeImage = async (): Promise<User | null> => {
  const authUser = await currentUser();

  if (!authUser) return null;

  const res = await db.user.update({
    where: {
      clerkId: authUser.id,
    },
    data: {
      profileImage: "",
    },
  });

  return res;
};

export default removeImage;
