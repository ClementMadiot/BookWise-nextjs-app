"use client";

import config from "@/lib/config";
import { IKImage, ImageKitProvider } from "imagekitio-next";

interface Props {
  fullName: string;
  email: string;
  status: string;
  role: string
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
  const universityCardUrl = `${config.env.imagekit.urlEndpoint}`;
  console.log(universityCardUrl);
  return (
    <div className="gradient-blue flex flex-col gap-10 px-4">
      <article className=" flex flex-col gap-6 py-4 rounded-lg">
        <div className="flex justify-start gap-6">
          {/* <Avatar>
            <AvatarFallback className="bg-amber-100">
              {getInitials(session?.user?.name || "")}
            </AvatarFallback>
          </Avatar> */}
          <div className="flex flex-col gap-2">
            <p className="text-white text-xl font-semibold">{fullName}</p>
            <p className="text-light-100 text-xs">{email}</p>
            <p className="text-light-100">
              status: <span className="italic text-white">{status}</span>
            </p>
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
      <div className="flex justify-center items-center">
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
