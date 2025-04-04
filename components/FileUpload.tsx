"use client";

import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

// upload images securely with ImageKit
const authendicator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imageKit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status: ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;
    console.log(data);

    return { token, expire, signature };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({
  onFileChange,
  type,
  accept,
  placeholder,
  folder,
  variant,
  value,
}: Props) => {
  // reference to the upload component
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });

  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300 "
        : "bg-light-600 border border-gray-100",
    placehoplder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  // handle error or success
  const onError = (error: any) => {
    console.log(error);
    toast.error(`${type} upload failed`, {
      description: `Your ${type} could not be uploaded. Please try again`,
      unstyled: true,
      classNames: {
        toast: "bg-dark-100 p-2 rounded-lg flex",
        title: "text-red-800 text-base font-semibold",
        description: "!text-red-400",
      },
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast.success(`${type} uploaded successfully`, {
      description: `${res.filePath} uploaded successfully`,
    });
  };

  // provide validation
  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.warning("File size too large", {
          description: "Please upload a file that is less than 20MB",
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.warning("File size too large", {
          description: "Please upload a file that is less than 50MB",
        });
        return false;
      }
    }
    return true; // Ensure a boolean is always returned
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authendicator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />
      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <div className="flex gap-2">
          <Image
            src="/icons/upload.svg"
            alt="upload-icon"
            width={22}
            height={22}
            className="object-contain"
          />
          <p className={cn("text-base", styles.placehoplder)}>{placeholder}</p>
          {file && (
            <p className={cn("upload-filename", styles.text)}>
              {file.filePath}
            </p>
          )}
        </div>
      </button>

      {/* progression  */}
      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file &&
        (type === "image" ? (
          <IKImage
            alt={file?.filePath ?? "uploaded image"}
            path={file.filePath ?? undefined}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath ?? undefined}
            controls={true}
            className="h-96 w-full rounded-2xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
