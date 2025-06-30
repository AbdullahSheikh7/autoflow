"use client";

import {
  FileUploaderRegular,
  OutputFileEntry,
  UploadCtxProvider,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "@uploadcare/react-uploader/core.css";
import { useTheme } from "next-themes";
import { User } from "@/generated/prisma";

type Props = { onUpload: (cdnUrl: string) => Promise<void> };

const UploadCareButton = ({ onUpload }: Props) => {
  const { theme } = useTheme();
  const router = useRouter();
  const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null);

  useEffect(() => {
    const handleUpload = async (
      e: CustomEvent<OutputFileEntry>
    ): Promise<void> => {
      if (onUpload) {
        await onUpload(e.detail.cdnUrl || "");
      }
    };

    ctxProviderRef.current?.addEventListener(
      "file-upload-success",
      handleUpload
    );

    () => {
      ctxProviderRef.current?.removeEventListener(
        "file-upload-success",
        handleUpload
      );
    };
  }, []);

  return (
    <div>
      <FileUploaderRegular
        multiple={false}
        imgOnly={true}
        sourceList="local"
        maxLocalFileSizeBytes={10000000}
        filesViewMode="list"
        imageShrink="200x200"
        apiRef={ctxProviderRef}
        ctxName="profileImage"
        classNameUploader={theme === "dark" ? "uc-dark" : "uc-light"}
        pubkey={process.env.NEXT_PUBLIC_UPLOAD_PUBLISHABLE_KEY || ""}
      />
    </div>
  );
};

export default UploadCareButton;
