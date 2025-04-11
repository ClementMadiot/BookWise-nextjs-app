"use client";

import config from "@/lib/config";
import { IKImage, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";

interface Props {
  fullName: string;
  email: string;
  status: string;
  role: string;
  universityId: number;
  universityCard: string;
}

const BookProfile = ({
  fullName,
  email,
  universityId,
  universityCard,
  status,
  role,
}: Props) => {
  return (
    <div className="gradient-blue flex flex-col gap-6 px-4 rounded-xl">
      <div className="flex justify-center items-center">
        <Image
          src="/icons/profile-info.svg"
          alt="Profile"
          width={59}
          height={88}
          className="object-contain"
        />
      </div>
      <article className=" flex flex-col gap-4 pt-1 rounded-lg">
        <div className="flex justify-start gap-3 items-center ">
          <div className="bg-dark-600/20 rounded-full p-2">
            <Image
              src="/icons/user-fill.svg"
              alt="Profile"
              width={70}
              height={70}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-light-100 text-xs">
              status : <span className="italic text-white">{status}</span>
            </p>
            <p className="text-white text-xl font-semibold">{fullName}</p>
            <p className="text-light-100 text-sm">{email}</p>
          </div>
        </div>

        <div>
          <p className="text-light-100 text-md">Role</p>
          <p className="text-white text-lg font-semibold">{role}</p>
        </div>

        <div>
          <p className="text-light-100 text-md">Studen ID</p>
          <p className="text-white text-lg font-semibold">{universityId}</p>
        </div>
      </article>
      <div className="flex justify-center items-center pb-4">
        <ImageKitProvider
          publicKey={config.env.imagekit.publicKey}
          urlEndpoint={config.env.imagekit.urlEndpoint}
        >
          <IKImage
            path={universityCard}
            alt={"University Card"}
            className="rounded-lg object-contain"
            width={400}
            height={245}
          />
        </ImageKitProvider>
      </div>
    </div>
  );
};

export default BookProfile;
