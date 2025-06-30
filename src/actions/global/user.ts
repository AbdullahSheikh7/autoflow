"use server";

import { User } from "@/generated/prisma";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const useUser = async (): Promise<User | null> => {
  const authUser = await currentUser();
  if (!authUser) return null;
  const user = await db.user.findUnique({ where: { clerkId: authUser.id } });
  return user;
};

export default useUser;
