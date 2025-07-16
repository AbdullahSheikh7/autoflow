"use client";

import ProfileForm from "@/components/forms/profile-form";
import ProfilePicture from "./_components/profile-picture";
import removeImage from "./_actions/remove-image";
import uploadImage from "./_actions/upload-image";
import { useEffect, useState } from "react";
import { User } from "@/generated/prisma";
import { Loader2 } from "lucide-react";
import updateUserInfo from "./_actions/update-info";
import userFromDB from "./_actions/user";

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const dbUser = await userFromDB();
      setUser(dbUser);
      setIsLoading(false);
      setImageUrl(dbUser?.profileImage!);
    })();
  }, []);

  const [imageUrl, setImageUrl] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const removeProfileImage = async () => {
    setIsDisabled(true);
    const res = await removeImage();
    if (res) setImageUrl(res.profileImage || "");
    setIsDisabled(false);
  };

  const uploadProfileImage = async (url: string) => {
    setIsLoading(true);
    const res = await uploadImage(url);
    if (res) setImageUrl(res.profileImage || "");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Settings</span>
      </h1>
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>
          <p className="text-base text-white/50">
            Add or update your information
          </p>
        </div>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          <ProfilePicture
            isDisabled={isDisabled}
            onDelete={removeProfileImage}
            userImage={imageUrl}
            onUpload={uploadProfileImage}
          />
        )}
        <ProfileForm user={user} onUpdate={updateUserInfo} />
      </div>
    </div>
  );
};

export default Settings;
