"use client";

import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

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

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  // reference to the upload component
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  // handle error or success
  const onError = (error: any) => {
    console.log(error);
    toast.error("Image upload failed", {
      description: "Your image could not be uploaded. Please try again",
      unstyled: true,
      classNames: {
        toast: 'bg-dark-100 p-2 rounded-lg flex',
        title: 'text-red-800 text-base font-semibold',
        description: '!text-red-400',
      },
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast.success("Image uploaded successfully", {
      description: `${res.filePath} uploaded successfully`
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authendicator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />
      <button
        className="upload-btn"
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
          <p className="text-base text-light-100">Upload a file</p>
          {/* trigger the upload component */}
          {file && <p className="upload-filename">{file.filePath}</p>}
        </div>
        </button>

        {file && (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
