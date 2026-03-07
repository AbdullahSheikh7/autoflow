"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const updateUserInfo = async (name: string) => {
  const authUser = await currentUser();
  if (!authUser) return null;
  const res = await db.user.update({
    where: {
      clerkId: authUser.id,
    },
    data: {
      name,
    },
  });
  return res;
};

export default updateUserInfo;
