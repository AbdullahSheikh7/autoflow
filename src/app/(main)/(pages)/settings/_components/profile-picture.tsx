"use client";

import UploadCareButton from "./uploadcare-button";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import clsx from "clsx";

type Props = {
  isDisabled: boolean;
  onUpload: (url: string) => Promise<void>;
  userImage: string;
  onDelete: () => Promise<void>;
};

const ProfilePicture = ({
  isDisabled,
  onUpload,
  userImage,
  onDelete,
}: Props) => {
  return (
    <div className="flex flex-col">
      <p className="text-lg text-white">Profile Picture</p>
      <div className="flex flex-col items-center my-4 w-[200px] justify-center">
        {userImage ? (
          <>
            <div className="relative h-full rounded-full overflow-hidden">
              {isDisabled && (
                <>
                  <div className="absolute w-[200px] h-[200px] bg-black/70" />
                  <Loader2 className="absolute mr-2 h-8 w-8 animate-spin z-10 top-1/2 left-1/2 -translate-1/2" />
                </>
              )}
              <Image
                priority={true}
                src={`${userImage}-/resize/200x200/`}
                alt="User image"
                height={200}
                width={200}
              />
            </div>
            <Button
              disabled={isDisabled}
              onClick={onDelete}
              className={clsx(
                "bg-transparent hover:bg-transparent hover:text-white",
                isDisabled ? "text-white/30" : "text-white/70"
              )}
            >
              <X />
              Remove
            </Button>
          </>
        ) : (
          <div className="w-[200px] h-[200px] border-2 border-dashed border-white rounded-full flex justify-center items-center">
            <UploadCareButton onUpload={onUpload} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
